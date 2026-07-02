import { motion } from 'framer-motion';

export default function StatsCard({ label, value, icon, suffix = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-4 text-center glass rounded-2xl"
    >
      {icon && <div className="mb-1 text-2xl text-gray-700 dark:text-gray-300">{icon}</div>}
      <p className="text-3xl font-bold text-gray-900 dark:text-white">
        {value}{suffix}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </motion.div>
  );
}