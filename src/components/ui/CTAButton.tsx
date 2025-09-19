'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { IconArrowRight, IconRocket } from '@tabler/icons-react';

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  showIcon?: boolean;
  icon?: ReactNode;
}

export default function CTAButton({
  children,
  onClick,
  variant = 'primary',
  size = 'lg',
  className = '',
  disabled = false,
  href,
  target,
  rel,
  showIcon = true,
  icon
}: CTAButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center font-bold transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group';

  const sizeClasses = {
    sm: 'px-6 py-3 text-sm rounded-xl',
    md: 'px-8 py-4 text-base rounded-2xl',
    lg: 'px-12 py-5 text-lg rounded-3xl',
    xl: 'px-16 py-6 text-xl rounded-3xl'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 focus:ring-blue-500 shadow-2xl hover:shadow-3xl border border-blue-500/20',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-xl hover:shadow-2xl border border-gray-600',
    outline: 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white focus:ring-blue-500 shadow-xl hover:shadow-2xl'
  };

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const buttonContent = (
    <motion.div
      className="relative z-10 flex items-center space-x-3"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon || (showIcon && <IconRocket className="h-5 w-5 group-hover:animate-bounce" />)}
      <span>{children}</span>
      <motion.div
        className="group-hover:translate-x-1 transition-transform duration-300"
        whileHover={{ x: 4 }}
      >
        <IconArrowRight className="h-5 w-5" />
      </motion.div>
    </motion.div>
  );

  // Animated background gradient
  const gradientBackground = (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
    />
  );

  // Shimmer effect
  const shimmerEffect = (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
  );

  // Pulse effect for primary buttons
  const pulseEffect = variant === 'primary' && (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-inherit"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.7, 0.9, 0.7]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ y: -2, scale: 0.98 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {gradientBackground}
        {shimmerEffect}
        {pulseEffect}
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ y: -2, scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {gradientBackground}
      {shimmerEffect}
      {pulseEffect}
      {buttonContent}
    </motion.button>
  );
}
