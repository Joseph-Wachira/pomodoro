import { motion } from 'framer-motion';
import { getProgress } from '../../utils/time';
import { usePomodoro } from '../../context/PomodoroContext';

export default function ProgressRing() {
  const { timeLeft, currentSession, settings } = usePomodoro();
  const getDuration = () => {
    if (currentSession === 'work') return settings.workDuration;
    if (currentSession === 'shortBreak') return settings.shortBreakDuration;
    return settings.longBreakDuration;
  };
  const duration = getDuration();
  const progress = getProgress(timeLeft, duration);
  const circumference = 2 * Math.PI * 120;
  const offset = circumference - (progress / 100) * circumference;

  const strokeColor = {
    work: '#3b82f6',
    shortBreak: '#10b981',
    longBreak: '#8b5cf6',
  }[currentSession] || '#3b82f6';

  const trackColor = settings.theme === 'dark'
    ? 'rgba(255,255,255,0.1)'
    : 'rgba(0,0,0,0.15)';

  return (
    <div className="relative mx-auto w-72 h-72">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 260 260">
        <circle
          cx="130" cy="130" r="120"
          fill="none"
          stroke={trackColor}
          strokeWidth="12"
        />
        <motion.circle
          cx="130" cy="130" r="120"
          fill="none"
          stroke={strokeColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={false}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}