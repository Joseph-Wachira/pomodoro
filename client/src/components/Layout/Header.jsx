import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiBarChart2, FiSettings, FiClock } from 'react-icons/fi';
import { usePomodoro } from '../../context/PomodoroContext';
import { motion } from 'framer-motion';

export default function Header() {
  const { settings, toggleTheme } = usePomodoro();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 glass backdrop-blur-xl dark:border-white/5">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <FiClock className="text-indigo-500 dark:text-indigo-400" />
          Pomodoro
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className={`p-2 rounded-lg transition ${
              location.pathname === '/dashboard'
                ? 'bg-gray-200 dark:bg-white/10'
                : 'hover:bg-gray-200 dark:hover:bg-white/5'
            } text-gray-700 dark:text-gray-300`}
          >
            <FiBarChart2 size={18} />
          </Link>
          <Link
            to="/settings"
            className={`p-2 rounded-lg transition ${
              location.pathname === '/settings'
                ? 'bg-gray-200 dark:bg-white/10'
                : 'hover:bg-gray-200 dark:hover:bg-white/5'
            } text-gray-700 dark:text-gray-300`}
          >
            <FiSettings size={18} />
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 text-gray-700 transition rounded-lg hover:bg-gray-200 dark:hover:bg-white/5 dark:text-gray-300"
            aria-label="Toggle theme"
          >
            {settings.theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>
        </nav>
      </div>
    </header>
  );
}