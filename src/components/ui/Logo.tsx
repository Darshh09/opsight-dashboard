'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 32,
  className = "",
  showText = true,
  animated = true
}) => {
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -10 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 180,
        damping: 15,
        duration: 0.8,
      }
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: { type: "spring" as const, stiffness: 300, damping: 15 }
    }
  };

  const textVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.2, duration: 0.5 }
    }
  };

  const LogoIcon = () => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      variants={animated ? logoVariants : undefined}
      initial={animated ? "initial" : undefined}
      animate={animated ? "animate" : undefined}
      whileHover={animated ? "hover" : undefined}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="logo-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* Main chart/analytics icon */}
      <motion.path
        d="M3 3v18h18"
        stroke="url(#logo-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={animated ? { duration: 0.8, ease: "easeInOut" } : undefined}
      />

      {/* Data points */}
      <motion.circle
        cx="6"
        cy="16"
        r="1.5"
        fill="url(#logo-accent)"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={animated ? { delay: 0.3, duration: 0.3 } : undefined}
      />
      <motion.circle
        cx="10"
        cy="12"
        r="1.5"
        fill="url(#logo-accent)"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={animated ? { delay: 0.4, duration: 0.3 } : undefined}
      />
      <motion.circle
        cx="14"
        cy="8"
        r="1.5"
        fill="url(#logo-accent)"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={animated ? { delay: 0.5, duration: 0.3 } : undefined}
      />
      <motion.circle
        cx="18"
        cy="4"
        r="1.5"
        fill="url(#logo-accent)"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={animated ? { delay: 0.6, duration: 0.3 } : undefined}
      />

      {/* AI/Insight sparkle */}
      <motion.path
        d="M16 2l2 2-2 2-2-2 2-2z"
        fill="url(#logo-gradient)"
        initial={animated ? { scale: 0, rotate: -45 } : undefined}
        animate={animated ? { scale: 1, rotate: 0 } : undefined}
        transition={animated ? { delay: 0.7, duration: 0.4 } : undefined}
      />
    </motion.svg>
  );

  if (!showText) {
    return <LogoIcon />;
  }

  return (
    <motion.div
      className={`flex items-center space-x-3 ${className}`}
      variants={animated ? textVariants : undefined}
      initial={animated ? "initial" : undefined}
      animate={animated ? "animate" : undefined}
    >
      <LogoIcon />
      <motion.span
        className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        whileHover={animated ? { scale: 1.02 } : undefined}
      >
        Opsight
      </motion.span>
    </motion.div>
  );
};

export default Logo;
