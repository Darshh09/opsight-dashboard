'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  href,
  target,
  rel,
  type = 'button'
}: AnimatedButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    xl: 'px-12 py-5 text-xl rounded-3xl'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-xl hover:shadow-2xl border border-blue-500/20',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-lg hover:shadow-xl border border-gray-600',
    outline: 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white focus:ring-blue-500 shadow-lg hover:shadow-xl',
    ghost: 'text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-500',
    gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-red-700 focus:ring-purple-500 shadow-2xl hover:shadow-3xl border border-purple-500/20'
  };

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const buttonContent = (
    <motion.div
      className="relative z-10 flex items-center space-x-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );

  // Ripple effect
  const rippleEffect = (
    <motion.div
      className="absolute inset-0 bg-white/20 rounded-inherit"
      initial={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );

  // Shimmer effect for gradient buttons
  const shimmerEffect = variant === 'gradient' && (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {rippleEffect}
        {shimmerEffect}
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {rippleEffect}
      {shimmerEffect}
      {buttonContent}
    </motion.button>
  );
}
