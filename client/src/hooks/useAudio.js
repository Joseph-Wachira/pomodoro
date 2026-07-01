import { useCallback, useRef } from 'react';

export default function useAudio({ enabled = true, volume = 0.5, theme = 'bell' } = {}) {
  const audioContextRef = useRef(null);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((freq, duration, type = 'sine') => {
    if (!enabled) return;
    const ctx = getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
    gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [enabled, volume, getContext]);

  const playNotificationSound = useCallback(() => {
    if (!enabled) return;
    const now = getContext().currentTime;
    playTone(880, 0.15, 'sine');
    setTimeout(() => playTone(1100, 0.2, 'sine'), 150);
  }, [enabled, playTone, getContext]);

  return { playNotificationSound };
}