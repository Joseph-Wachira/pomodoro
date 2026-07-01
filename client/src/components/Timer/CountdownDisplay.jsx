import { motion, AnimatePresence } from 'framer-motion';
import { formatTime } from '../../utils/time';

export default function CountdownDisplay({ timeLeft, sessionType }) {
  const colorMap = {
    work: 'text-blue-400',
    shortBreak: 'text-emerald-400',
    longBreak: 'text-purple-400',
  };
  return (
    <div className="text-center mt-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={timeLeft}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`text-7xl md:text-8xl font-bold tracking-tight ${colorMap[sessionType] || 'text-blue-400'}`}
        >
          {formatTime(timeLeft)}
        </motion.div>
      </AnimatePresence>
      <p className="text-sm uppercase tracking-widest mt-2 text-gray-400">
        {sessionType === 'work' ? 'Focus' : sessionType === 'shortBreak' ? 'Short Break' : 'Long Break'}
      </p>
    </div>
  );
}