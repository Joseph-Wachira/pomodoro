import { motion } from 'framer-motion';

export default function StatsCard({ label, value, icon, suffix = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center"
    >
      {icon && <div className="text-2xl mb-1">{icon}</div>}
      <p className="text-3xl font-bold text-white">
        {value}{suffix}
      </p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </motion.div>
  );
}