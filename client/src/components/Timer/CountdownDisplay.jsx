import { motion, AnimatePresence } from 'framer-motion';

export default function CountdownDisplay({ timeLeft, sessionType }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  const colorMap = {
    work: 'text-blue-600 dark:text-blue-400',
    shortBreak: 'text-emerald-600 dark:text-emerald-400',
    longBreak: 'text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="mt-8 text-center">
      <div
        className={`text-7xl md:text-8xl font-bold tracking-tight ${
          colorMap[sessionType] || 'text-blue-600 dark:text-blue-400'
        }`}
        aria-live="polite"
        aria-label={`${formattedMinutes} minutes and ${formattedSeconds} seconds remaining`}
      >
        <span>{formattedMinutes}</span>
        <span className="mx-1">:</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={seconds}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            {formattedSeconds}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="mt-2 text-sm tracking-widest text-gray-500 uppercase dark:text-gray-400">
        {sessionType === 'work'
          ? 'Focus'
          : sessionType === 'shortBreak'
          ? 'Short Break'
          : 'Long Break'}
      </p>
    </div>
  );
}