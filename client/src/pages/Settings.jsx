import { usePomodoro } from '../context/PomodoroContext';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { settings, updateSettings } = usePomodoro();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateSettings({ [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg py-8 mx-auto">
      
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <div className="p-6 space-y-6 glass rounded-2xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Work (min)</label>
            <input
              type="number"
              name="workDuration"
              value={settings.workDuration / 60}
              onChange={(e) => updateSettings({ workDuration: e.target.value * 60 })}
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 border border-gray-300 dark:bg-white/5 dark:border-white/10 rounded-xl dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Short Break (min)</label>
            <input
              type="number"
              name="shortBreakDuration"
              value={settings.shortBreakDuration / 60}
              onChange={(e) => updateSettings({ shortBreakDuration: e.target.value * 60 })}
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 border border-gray-300 dark:bg-white/5 dark:border-white/10 rounded-xl dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Long Break (min)</label>
            <input
              type="number"
              name="longBreakDuration"
              value={settings.longBreakDuration / 60}
              onChange={(e) => updateSettings({ longBreakDuration: e.target.value * 60 })}
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 border border-gray-300 dark:bg-white/5 dark:border-white/10 rounded-xl dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Daily Goal (pomodoros)</label>
            <input
              type="number"
              name="dailyGoal"
              value={settings.dailyGoal}
              onChange={(e) => updateSettings({ dailyGoal: Number(e.target.value) })}
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 border border-gray-300 dark:bg-white/5 dark:border-white/10 rounded-xl dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Auto-start Breaks', name: 'autoStartBreak' },
            { label: 'Auto-start Work', name: 'autoStartWork' },
            { label: 'Sound', name: 'soundEnabled' },
            { label: 'Notifications', name: 'notificationsEnabled' },
          ].map((item) => (
            <label key={item.name} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
              <input
                type="checkbox"
                name={item.name}
                checked={settings[item.name]}
                onChange={handleChange}
                className="w-5 h-5 rounded accent-indigo-500"
              />
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
}