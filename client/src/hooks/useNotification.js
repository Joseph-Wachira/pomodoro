import { useCallback } from 'react';

export default function useNotification(enabled = true) {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return 'denied';
    if (Notification.permission === 'granted') return 'granted';
    return await Notification.requestPermission();
  }, []);

  const showNotification = useCallback((message) => {
    if (!enabled || Notification.permission !== 'granted') return;
    new Notification('Pomodoro Focus', {
      body: message,
      icon: '/favicon.svg',
      silent: true,
    });
  }, [enabled]);

  if (enabled && Notification.permission === 'default') {
    requestPermission();
  }

  return { showNotification, requestPermission };
}