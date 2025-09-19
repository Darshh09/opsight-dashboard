'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface PerformanceCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  delay?: number;
  duration?: number;
}

export function PerformanceCard({
  children,
  className = '',
  hover = true,
  clickable = false,
  onClick,
  delay = 0,
  duration = 0.3
}: PerformanceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hover) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (event.clientX - centerX) / (rect.width / 2);
    const distanceY = (event.clientY - centerY) / (rect.height / 2);

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200';
  const hoverClasses = hover ? 'hover:shadow-lg hover:shadow-blue-500/10' : '';
  const clickableClasses = clickable ? 'cursor-pointer active:scale-95' : '';

  return (
    <motion.div
      ref={ref}
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX: hover ? rotateX : 0,
        rotateY: hover ? rotateY : 0,
        transformStyle: 'preserve-3d'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
      whileHover={hover ? {
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={clickable ? {
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
    >
      <motion.div
        className="relative z-10"
        animate={{
          scale: isHovered && hover ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-lg opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

// Specialized card components
export function FeatureCard({
  icon,
  title,
  description,
  delay = 0
}: {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <PerformanceCard
      className="p-6 text-center"
      delay={delay}
      hover={true}
    >
      <motion.div
        className="w-12 h-12 mx-auto mb-4 text-blue-600"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.5, type: 'spring' }}
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </PerformanceCard>
  );
}

export function StatCard({
  title,
  value,
  change,
  trend,
  delay = 0
}: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  delay?: number;
}) {
  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <PerformanceCard
      className="p-6"
      delay={delay}
      hover={true}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <span className={`text-xs font-medium ${trendColor[trend]}`}>
          {change}
        </span>
      </div>
      <motion.div
        className="text-2xl font-bold text-gray-900 dark:text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
      >
        {value}
      </motion.div>
    </PerformanceCard>
  );
}
