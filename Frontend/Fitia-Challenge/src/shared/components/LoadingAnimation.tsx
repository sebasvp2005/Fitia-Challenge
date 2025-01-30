import { motion } from "framer-motion";
import { useState, useEffect, ReactElement } from "react";

const messages = [
    "Cooking recipes...",
    "Chopping veggies...",
    "Boiling water...",
];

export const LoadingAnimation = ():ReactElement => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        key={index}
        className="mt-4 text-lg font-semibold text-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {messages[index]}
      </motion.p>
    </div>
  );
}
