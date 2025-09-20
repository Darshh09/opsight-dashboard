import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  IconTrendingDown,
  IconUsers,
  IconX,
  IconBrain,
  IconClock,
  IconAlertTriangle,
  IconCheck
} from '@tabler/icons-react';
import Link from "next/link";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: React.ComponentType<{ className?: string }>;
    color?: string;
    features?: string[];
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={`${item?.link}-${idx}`}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex items-center space-x-4 mb-4">
              {item.icon && (
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color || 'from-gray-600 to-gray-700'} shadow-lg`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </motion.div>
              )}
              <div className="flex-1">
                <CardTitle>{item.title}</CardTitle>
              </div>
            </div>
            <CardDescription>{item.description}</CardDescription>
            {item.features && item.features.length > 0 && (
              <div className="mt-4 space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <IconCheck className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, #06b6d4 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
