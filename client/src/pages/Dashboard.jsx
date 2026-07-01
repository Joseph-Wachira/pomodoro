import { usePomodoro } from '../context/PomodoroContext';
import StatsCard from '../components/Stats/StatsCard';
import { FiClock, FiTarget, FiTrendingUp, FiActivity, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { stats, sessionHistory } = usePomodoro();

  const exportJSON = () => {
    const data = JSON.stringify({ sessions: sessionHistory, stats }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pomodoro-stats-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Focus Analytics</h1>
        <button onClick={exportJSON} className="glass px-3 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-white/10 transition">
          <FiDownload /> Export
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard icon={<FiClock />} label="Today Focus" value={Math.floor(stats.todayFocus / 60)} suffix=" min" />
        <StatsCard icon={<FiTarget />} label="Today Pomodoros" value={stats.todayPomodoros} />
        <StatsCard icon={<FiActivity />} label="Weekly" value={stats.weeklyPomodoros} />
        <StatsCard icon={<FiTrendingUp />} label="Monthly" value={stats.monthlyPomodoros} />
        <StatsCard label="Current Streak" value={stats.currentStreak} suffix=" days" />
        <StatsCard label="Longest Streak" value={stats.longestStreak} suffix=" days" />
        <StatsCard label="Avg Daily Focus" value={Math.floor(stats.averageDaily / 60)} suffix=" min" />
        <StatsCard label="Productivity Score" value={stats.productivityScore} suffix="%" />
      </div>
    </motion.div>
  );
}