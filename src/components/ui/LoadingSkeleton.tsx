'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  animate?: boolean;
}

export function Skeleton({
  className = '',
  width = '100%',
  height = '20px',
  rounded = true,
  animate = true
}: SkeletonProps) {
  return (
    <motion.div
      className={`bg-gray-200 dark:bg-gray-700 ${rounded ? 'rounded' : ''} ${className}`}
      style={{ width, height }}
      animate={animate ? {
        opacity: [0.5, 1, 0.5],
      } : {}}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <Skeleton height="24px" width="60%" />
        <Skeleton height="16px" width="100%" />
        <Skeleton height="16px" width="80%" />
        <Skeleton height="16px" width="90%" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <Skeleton height="24px" width="40%" />
        <div className="h-64 flex items-end space-x-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              height={`${Math.random() * 100 + 50}px`}
              width="40px"
              className="rounded-t"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function KPISkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-3">
        <Skeleton height="16px" width="50%" />
        <Skeleton height="32px" width="80%" />
        <Skeleton height="14px" width="30%" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <Skeleton height="24px" width="30%" className="mb-4" />
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton height="16px" width="25%" />
              <Skeleton height="16px" width="20%" />
              <Skeleton height="16px" width="15%" />
              <Skeleton height="16px" width="20%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Default export for LoadingSkeleton
export default function LoadingSkeleton() {
  return <Skeleton />;
}
