"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModernButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export default function ModernButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  href,
  target,
  rel,
  type = 'button',
  icon,
  iconPosition = 'left',
  loading = false
}: ModernButtonProps) {
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
    gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-red-700 focus:ring-purple-500 shadow-2xl hover:shadow-3xl border border-purple-500/20',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 focus:ring-green-500 shadow-xl hover:shadow-2xl border border-green-500/20',
    warning: 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 focus:ring-orange-500 shadow-xl hover:shadow-2xl border border-orange-500/20'
  };

  const buttonClasses = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const buttonContent = (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: variant === 'gradient'
            ? 'linear-gradient(45deg, #8b5cf6, #ec4899, #ef4444, #8b5cf6)'
            : variant === 'primary'
            ? 'linear-gradient(45deg, #3b82f6, #8b5cf6, #3b82f6)'
            : 'transparent',
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit"
        whileTap={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.3, 0]
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center space-x-2">
        {icon && iconPosition === 'left' && (
          <motion.div
            className="flex items-center"
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {icon}
          </motion.div>
        )}

        <span className="font-semibold">
          {loading ? 'Loading...' : children}
        </span>

        {icon && iconPosition === 'right' && (
          <motion.div
            className="flex items-center"
            whileHover={{ rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {icon}
          </motion.div>
        )}
      </div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut'
        }}
        style={{
          transform: 'skewX(-20deg)'
        }}
      />
    </motion.div>
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
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {buttonContent}
    </motion.button>
  );
}
