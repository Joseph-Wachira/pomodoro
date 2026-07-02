import { motion } from 'framer-motion';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <motion.div
        className="absolute rounded-full -top-40 -left-40 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-500/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full -bottom-40 -right-40 w-96 h-96 bg-purple-300/30 dark:bg-purple-500/20 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}