import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className = "", delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
      let iteration = 0;
      
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = window.setInterval(() => {
        setDisplayText(prev => 
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        iteration += 1 / 3; // Speed of decoding
      }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  return (
    <motion.span 
      className={`inline-block font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayText || text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")}
    </motion.span>
  );
};

export default ScrambleText;