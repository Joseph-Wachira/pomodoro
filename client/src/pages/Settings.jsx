import { usePomodoro } from '../context/PomodoroContext';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { settings, updateSettings } = usePomodoro();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateSettings({ [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Work (min)</label>
            <input
              type="number"
              name="workDuration"
              value={settings.workDuration / 60}
              onChange={(e) => updateSettings({ workDuration: e.target.value * 60 })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Short Break (min)</label>
            <input
              type="number"
              name="shortBreakDuration"
              value={settings.shortBreakDuration / 60}
              onChange={(e) => updateSettings({ shortBreakDuration: e.target.value * 60 })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Long Break (min)</label>
            <input
              type="number"
              name="longBreakDuration"
              value={settings.longBreakDuration / 60}
              onChange={(e) => updateSettings({ longBreakDuration: e.target.value * 60 })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Daily Goal (pomodoros)</label>
            <input
              type="number"
              name="dailyGoal"
              value={settings.dailyGoal}
              onChange={(e) => updateSettings({ dailyGoal: Number(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
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
              <span className="text-sm text-gray-300">{item.label}</span>
              <input
                type="checkbox"
                name={item.name}
                checked={settings[item.name]}
                onChange={handleChange}
                className="h-5 w-5 rounded accent-indigo-500"
              />
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
}