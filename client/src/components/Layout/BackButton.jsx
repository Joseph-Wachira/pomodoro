import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function BackButton({ to = '/', label = 'Back' }) {
  const navigate = useNavigate();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(to)}
      className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-700 transition glass rounded-xl dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      aria-label={`Go back to ${to === '/' ? 'home' : to}`}
    >
      <FiArrowLeft size={16} />
      {label}
    </motion.button>
  );
}