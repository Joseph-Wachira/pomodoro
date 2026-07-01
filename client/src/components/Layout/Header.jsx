import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiBarChart2, FiSettings, FiClock } from 'react-icons/fi';
import { usePomodoro } from '../../context/PomodoroContext';
import { motion } from 'framer-motion';

export default function Header() {
  const { settings, toggleTheme } = usePomodoro();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-20 glass backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold text-lg">
          <FiClock className="text-indigo-400" />
          Pomodoro
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/dashboard" className={`p-2 rounded-lg ${location.pathname === '/dashboard' ? 'bg-white/10' : 'hover:bg-white/5'} transition`}>
            <FiBarChart2 size={18} />
          </Link>
          <Link to="/settings" className={`p-2 rounded-lg ${location.pathname === '/settings' ? 'bg-white/10' : 'hover:bg-white/5'} transition`}>
            <FiSettings size={18} />
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/5 transition"
            aria-label="Toggle theme"
          >
            {settings.theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>
        </nav>
      </div>
    </header>
  );
}