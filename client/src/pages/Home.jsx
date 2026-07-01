import { usePomodoro } from '../context/PomodoroContext';
import ProgressRing from '../components/ProgressRing/ProgressRing';
import CountdownDisplay from '../components/Timer/CountdownDisplay';
import TimerControls from '../components/Controls/TimerControls';
import FocusQuote from '../components/Quote/FocusQuote';
import ConfettiExplosion from '../components/Confetti/ConfettiExplosion';
import AchievementBadge from '../components/Badges/AchievementBadge';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const {
    timeLeft, isRunning, start, pause, reset, skip,
    currentSession, workSessionCount, completedPomodoros, settings,
    updateSettings,
  } = usePomodoro();

  const [showConfetti, setShowConfetti] = useState(false);
  const prevCompletedRef = useRef(completedPomodoros);

  useEffect(() => {
    if (completedPomodoros > prevCompletedRef.current && completedPomodoros % 4 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    prevCompletedRef.current = completedPomodoros;
  }, [completedPomodoros]);

  useKeyboardShortcuts({
    'Space': () => isRunning ? pause() : start(),
    'KeyR': reset,
    'KeyS': skip,
    'KeyM': () => updateSettings({ soundEnabled: !settings.soundEnabled }),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <ConfettiExplosion trigger={showConfetti} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <ProgressRing />
        <CountdownDisplay timeLeft={timeLeft} sessionType={currentSession} />
        <TimerControls />
        <div className="text-center mt-4 text-sm text-gray-400">
          Session {workSessionCount} · Completed {completedPomodoros}
        </div>
        <FocusQuote />
        <AchievementBadge completedCount={completedPomodoros} />
      </motion.div>
    </div>
  );
}