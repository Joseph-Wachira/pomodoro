export const calculateStats = (sessions, dailyGoal = 8) => {
  if (!sessions.length) {
    return {
      todayFocus: 0,
      todayPomodoros: 0,
      weeklyPomodoros: 0,
      monthlyPomodoros: 0,
      longestStreak: 0,
      currentStreak: 0,
      averageDaily: 0,
      productivityScore: 0,
      focusHours: 0,
    };
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).setHours(0,0,0,0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  const workSessions = sessions.filter(s => s.type === 'work' && s.completed);
  const todaySessions = workSessions.filter(s => s.timestamp >= startOfToday);
  const todayFocusSeconds = todaySessions.reduce((sum, s) => sum + s.duration, 0);

  const weeklyPomodoros = workSessions.filter(s => s.timestamp >= startOfWeek).length;
  const monthlyPomodoros = workSessions.filter(s => s.timestamp >= startOfMonth).length;

  const dailyPomodorosMap = workSessions.reduce((acc, s) => {
    const day = new Date(s.timestamp).toDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  const dates = Object.keys(dailyPomodorosMap).sort().reverse();
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  for (let i = 0; i < dates.length; i++) {
    const count = dailyPomodorosMap[dates[i]];
    if (count >= dailyGoal) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }
  currentStreak = tempStreak;

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentSessions = workSessions.filter(s => s.timestamp >= thirtyDaysAgo);
  const uniqueDays = new Set(recentSessions.map(s => new Date(s.timestamp).toDateString())).size || 1;
  const totalRecentSeconds = recentSessions.reduce((sum, s) => sum + s.duration, 0);
  const averageDaily = totalRecentSeconds / uniqueDays;

  const completedWork = workSessions.length;
  const skippedBreaks = sessions.filter(s => s.type !== 'work' && !s.completed).length;
  const interrupted = sessions.filter(s => s.type === 'work' && !s.completed).length;
  const rawScore = completedWork / (completedWork + skippedBreaks + interrupted + 1) * 100;
  const productivityScore = Math.min(100, Math.round(rawScore + (currentStreak * 2)));

  return {
    todayFocus: todayFocusSeconds,
    todayPomodoros: todaySessions.length,
    weeklyPomodoros,
    monthlyPomodoros,
    longestStreak,
    currentStreak,
    averageDaily,
    productivityScore,
    focusHours: totalRecentSeconds / 3600,
  };
};