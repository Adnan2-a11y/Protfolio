import React from 'react';
import { motion } from 'framer-motion';

interface StoryTextProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const StoryText: React.FC<StoryTextProps> = ({ children, className = "", align = 'center' }) => {
  const alignClass = 
    align === 'left' ? 'items-start text-left md:pl-20' : 
    align === 'right' ? 'items-end text-right md:pr-20' : 
    'items-center text-center';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className={`h-screen w-full flex flex-col justify-center px-6 pointer-events-none z-20 ${alignClass} ${className}`}
    >
      <div className="max-w-xl backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/5 shadow-2xl">
        {children}
      </div>
    </motion.div>
  );
};

export default StoryText;