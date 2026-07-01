import { motion } from 'framer-motion';

const badges = [
  { count: 1, label: 'First Pomodoro', icon: '🍅' },
  { count: 10, label: '10 Pomodoros', icon: '⭐' },
  { count: 25, label: '25 Pomodoros', icon: '🔥' },
  { count: 50, label: '50 Pomodoros', icon: '🏆' },
  { count: 100, label: 'Century', icon: '💯' },
];

export default function AchievementBadge({ completedCount }) {
  const earned = badges.filter(b => completedCount >= b.count);
  if (!earned.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 mt-4 justify-center"
    >
      {earned.map((badge) => (
        <div key={badge.count} className="flex items-center gap-1 px-2 py-1 rounded-full glass text-xs">
          <span>{badge.icon}</span> {badge.label}
        </div>
      ))}
    </motion.div>
  );
}