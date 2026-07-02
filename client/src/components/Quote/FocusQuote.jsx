import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const quotes = [
  "Deep work is the superpower of the 21st century.",
  "Focus on being productive instead of busy.",
  "The way to get started is to quit talking and begin doing.",
  "It’s not that I’m so smart, it’s that I stay with problems longer.",
  "Concentrate all your thoughts upon the work at hand.",
  "Your future is created by what you do today, not tomorrow.",
];

export default function FocusQuote() {
  const [quote, setQuote] = useState(quotes[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.p
      key={quote}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-4 text-sm italic text-center text-gray-500 dark:text-gray-400"
    >
      “{quote}”
    </motion.p>
  );
}