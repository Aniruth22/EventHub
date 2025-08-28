import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
      className={`bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-200 ${className}`}
    >
      {children}
    </motion.div>
  );
}