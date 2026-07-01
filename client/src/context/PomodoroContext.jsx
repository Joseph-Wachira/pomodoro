import { createContext, useContext, useReducer, useEffect, useCallback, useMemo, useRef } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useTimer from '../hooks/useTimer';
import useAudio from '../hooks/useAudio';
import useNotification from '../hooks/useNotification';
import { calculateStats } from '../utils/statistics';

const PomodoroContext = createContext();

const defaultSettings = {
  workDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  autoStartBreak: false,
  autoStartWork: false,
  soundEnabled: true,
  soundVolume: 0.5,
  soundTheme: 'bell',
  notificationsEnabled: true,
  theme: 'dark',
  dailyGoal: 8,
};

const sessionTypes = {
  WORK: 'work',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

function sessionReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_SESSION':
      return { ...state, currentSession: action.payload };
    case 'COMPLETE_SESSION':
      return {
        ...state,
        completedSessions: [...state.completedSessions, action.payload],
      };
    case 'SET_WORK_COUNT':
      return { ...state, workSessionCount: action.payload };
    case 'RESET_DAILY':
      return { ...state, todayPomodoros: 0, dailyFocusSeconds: 0 };
    default:
      return state;
  }
}

export function PomodoroProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('pomodoro-settings', defaultSettings);
  const [sessionState, dispatchSession] = useReducer(sessionReducer, {
    currentSession: sessionTypes.WORK,
    completedSessions: [],
    workSessionCount: 1,
    todayPomodoros: 0,
    dailyFocusSeconds: 0,
  });

  const getDuration = useCallback((session) => {
    switch (session) {
      case sessionTypes.WORK: return settings.workDuration;
      case sessionTypes.SHORT_BREAK: return settings.shortBreakDuration;
      case sessionTypes.LONG_BREAK: return settings.longBreakDuration;
      default: return settings.workDuration;
    }
  }, [settings]);

  const handleSessionComplete = useCallback(() => {
    if (settings.soundEnabled) playNotificationSound();
    const nextSession = getNextSession(sessionState.currentSession, sessionState.workSessionCount);
    const sessionRecord = {
      type: sessionState.currentSession,
      timestamp: Date.now(),
      duration: getDuration(sessionState.currentSession),
      completed: true,
    };
    dispatchSession({ type: 'COMPLETE_SESSION', payload: sessionRecord });

    if (sessionState.currentSession === sessionTypes.WORK) {
      const newWorkCount = sessionState.workSessionCount + 1;
      dispatchSession({ type: 'SET_WORK_COUNT', payload: newWorkCount });
    }
    dispatchSession({ type: 'SET_CURRENT_SESSION', payload: nextSession });

    if ((nextSession === sessionTypes.WORK && settings.autoStartWork) ||
        ((nextSession === sessionTypes.SHORT_BREAK || nextSession === sessionTypes.LONG_BREAK) && settings.autoStartBreak)) {
      reset(getDuration(nextSession));
      start();
    } else {
      reset(getDuration(nextSession));
    }
    showNotification(`Time for ${nextSession === sessionTypes.WORK ? 'work' : 'a break'}!`);
  }, [sessionState, settings, getDuration]);

  const getNextSession = (current, workCount) => {
    if (current === sessionTypes.WORK) {
      return workCount % 4 === 0 ? sessionTypes.LONG_BREAK : sessionTypes.SHORT_BREAK;
    }
    return sessionTypes.WORK;
  };

  const { timeLeft, isRunning, start, pause, reset, skip } = useTimer(getDuration(sessionState.currentSession), {
    onComplete: handleSessionComplete,
  });

  const { playNotificationSound } = useAudio({
    enabled: settings.soundEnabled,
    volume: settings.soundVolume,
    theme: settings.soundTheme,
  });

  const { showNotification } = useNotification(settings.notificationsEnabled);

  useEffect(() => {
    if (!isRunning) {
      reset(getDuration(sessionState.currentSession));
    }
  }, [settings.workDuration, settings.shortBreakDuration, settings.longBreakDuration]);

  const toggleTheme = () => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  const updateSettings = (newSettings) => setSettings(prev => ({ ...prev, ...newSettings }));

  const stats = useMemo(() => calculateStats(sessionState.completedSessions, settings.dailyGoal), [sessionState.completedSessions, settings.dailyGoal]);

  const value = {
    settings,
    updateSettings,
    toggleTheme,
    currentSession: sessionState.currentSession,
    timeLeft,
    isRunning,
    start,
    pause,
    reset: () => reset(getDuration(sessionState.currentSession)),
    skip: () => skip(getNextSession(sessionState.currentSession, sessionState.workSessionCount)),
    workSessionCount: sessionState.workSessionCount,
    completedPomodoros: sessionState.completedSessions.filter(s => s.type === sessionTypes.WORK).length,
    stats,
    sessionHistory: sessionState.completedSessions,
  };

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>;
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (!context) throw new Error('usePomodoro must be used within PomodoroProvider');
  return context;
}