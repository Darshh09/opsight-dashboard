"use client";

import React from "react";
import { motion } from "framer-motion";

interface EyeIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
  variant?: "gradient" | "solid" | "outline";
  color?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({
  className = "",
  size = 24,
  animated = true,
  variant = "gradient",
  color = "currentColor",
}) => {
  const eyeVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -10 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring" as const, stiffness: 300, damping: 15 }
    }
  };

  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.8, ease: "easeInOut" as const }
  };

  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring" as const, stiffness: 200, damping: 10, delay: 0.5 }
  };

  const EyeComponent = animated ? motion.svg : "svg";
  const PathComponent = animated ? motion.path : "path";
  const CircleComponent = animated ? motion.circle : "circle";

  const commonProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    style: {
      display: "block",
      minWidth: size,
      minHeight: size,
      maxWidth: "100%",
      maxHeight: "100%",
      flexShrink: 0,
    },
    "aria-label": "Eye icon",
    role: "img",
  };

  const motionProps = animated ? {
    initial: eyeVariants.initial,
    animate: eyeVariants.animate,
    whileHover: eyeVariants.hover,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 12,
      duration: 0.8,
    },
  } : {};

  const pathMotionProps = animated ? {
    initial: pathVariants.initial,
    animate: pathVariants.animate,
    transition: pathVariants.transition,
  } : {};

  const circleMotionProps = animated ? {
    initial: circleVariants.initial,
    animate: circleVariants.animate,
    transition: circleVariants.transition,
  } : {};

  const getStrokeColor = () => {
    switch (variant) {
      case "gradient":
        return "url(#eye-gradient)";
      case "solid":
        return color;
      case "outline":
        return "currentColor";
      default:
        return "url(#eye-gradient)";
    }
  };

  const getFillColor = () => {
    switch (variant) {
      case "gradient":
        return "url(#eye-gradient-fill)";
      case "solid":
        return color;
      case "outline":
        return "none";
      default:
        return "url(#eye-gradient-fill)";
    }
  };

  return (
    <EyeComponent {...commonProps} {...motionProps}>
      <defs>
        <linearGradient id="eye-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec4899" />
          <stop offset="0.5" stopColor="#a21caf" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
        <radialGradient id="eye-gradient-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a21caf" />
        </radialGradient>
      </defs>

      <PathComponent
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke={getStrokeColor()}
        {...pathMotionProps}
      />

      <CircleComponent
        cx="12"
        cy="12"
        r="3"
        stroke={getStrokeColor()}
        fill={variant === "outline" ? "none" : getFillColor()}
        {...circleMotionProps}
      />
    </EyeComponent>
  );
};

export default EyeIcon;
