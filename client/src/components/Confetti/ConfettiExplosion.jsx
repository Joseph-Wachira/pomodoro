import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiExplosion({ trigger, particleCount = 100 }) {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#a78bfa'],
      });
    }
  }, [trigger, particleCount]);
  return null;
}