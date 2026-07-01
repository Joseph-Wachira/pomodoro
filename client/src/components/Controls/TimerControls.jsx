import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiRotateCcw, FiSkipForward } from 'react-icons/fi';
import { usePomodoro } from '../../context/PomodoroContext';

export default function TimerControls() {
  const { isRunning, start, pause, reset, skip } = usePomodoro();

  return (
    <div className="flex justify-center gap-4 mt-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={reset}
        aria-label="Reset timer"
        className="p-3 rounded-full glass text-gray-300 hover:text-white transition"
      >
        <FiRotateCcw size={22} />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={isRunning ? pause : start}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        className="p-5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition"
      >
        {isRunning ? <FiPause size={28} /> : <FiPlay size={28} className="ml-1" />}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={skip}
        aria-label="Skip to next session"
        className="p-3 rounded-full glass text-gray-300 hover:text-white transition"
      >
        <FiSkipForward size={22} />
      </motion.button>
    </div>
  );
}