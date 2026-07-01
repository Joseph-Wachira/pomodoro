import { useState, useRef, useCallback, useEffect } from 'react';

export default function useTimer(initialSeconds, { onComplete } = {}) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (timeLeft <= 0) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          setIsRunning(false);
          setTimeout(() => onCompleteRef.current?.(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timeLeft, clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  const reset = useCallback((newDuration) => {
    clearTimer();
    setIsRunning(false);
    setTimeLeft(newDuration ?? initialSeconds);
  }, [initialSeconds, clearTimer]);

  const skip = useCallback((nextSessionDuration) => {
    clearTimer();
    setIsRunning(false);
    setTimeLeft(nextSessionDuration);
  }, [clearTimer]);

  useEffect(() => {
    if (timeLeft <= 0 && isRunning) {
      clearTimer();
      setIsRunning(false);
    }
  }, [timeLeft, isRunning, clearTimer]);

  return { timeLeft, isRunning, start, pause, reset, skip };
}