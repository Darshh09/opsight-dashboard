"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  IconPhone,
  IconRocket,
  IconDatabase,
  IconChartBar,
  IconPencil,
  IconShieldCheck,
  IconLoader2,
  IconCheck
} from '@tabler/icons-react';
// Removed MultiStepLoader import

// Opsight Eye Logo Component (from navbar)
const OpsightEyeLogo: React.FC<{ className?: string; size?: number }> = ({
  className,
  size = 30,
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#opsight-workflow-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        display: "block",
        minWidth: size,
        minHeight: size,
        maxWidth: "100%",
        maxHeight: "100%",
        flexShrink: 0,
      }}
      aria-label="Opsight Eye logo"
      role="img"
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 12,
        duration: 0.8,
      }}
    >
      <defs>
        <linearGradient id="opsight-workflow-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec4899" />
          <stop offset="0.5" stopColor="#a21caf" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
        <radialGradient id="opsight-workflow-gradient-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a21caf" />
        </radialGradient>
      </defs>
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.path
        d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
        stroke="url(#opsight-workflow-gradient)"
      />
      <motion.path
        d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        stroke="url(#opsight-workflow-gradient)"
      />
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        fill="url(#opsight-workflow-gradient-fill)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 1.1 }}
      />
    </motion.svg>
  );
};

// Tailwind keyframes for blinking and spinning
const blinkKeyframes = `
@keyframes blink-yellow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.2; }
}
@keyframes blink-green {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.2; }
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}
@keyframes pop-in {
  0% { transform: scale(0.7); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
`;

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  position: { x: number; y: number };
  delay: number;
  svg: { x: number; y: number }; // SVG coordinates for the box center
}

// Map each connection line to its corresponding path segment index
const connectionLines = [
  { x1: 585, y1: 71.5, x2: 766, y2: 71.5, pathIdx: 4 },    // discovery -> pilot
  { x1: 258, y1: 246.5, x2: 72, y2: 246.5, pathIdx: 0 },   // launch -> refinement
  { x1: 519, y1: 246.5, x2: 324, y2: 246.5, pathIdx: 1 },  // refinement -> dashboard
  { x1: 766, y1: 246.5, x2: 585, y2: 246.5, pathIdx: 2 },  // dashboard -> integration
  { x1: 808, y1: 95, x2: 808, y2: 204, pathIdx: 3 },       // integration -> discovery
];

type MovingRectState = "moving" | "processing" | "done";

export const AnimatedWorkflow = () => {
  const containerRef = useRef(null);
  useInView(containerRef, { once: true, margin: "-100px" });

  const workflowSteps: WorkflowStep[] = [
    {
      id: "discovery",
      title: "Strategic Discovery & Analysis",
      description: "Deep dive into your business objectives, current analytics gaps, and success metrics to architect the perfect solution.",
      icon: IconPhone,
      color: "from-blue-500 to-cyan-500",
      position: { x: 75, y: 45 },
      delay: 1.2,
      svg: { x: 552, y: 62 }
    },
    {
      id: "pilot",
      title: "Free Pilot Dashboard",
      description: "Risk-free proof of concept delivered in 48 hours, showcasing immediate ROI and business impact.",
      icon: IconRocket,
      color: "from-purple-500 to-pink-500",
      position: { x: 55, y: 55 },
      delay: 1.5,
      svg: { x: 799, y: 62 }
    },
    {
      id: "integration",
      title: "Enterprise Data Integration",
      description: "Seamless connection of all your business tools with enterprise-grade security and real-time synchronization.",
      icon: IconDatabase,
      color: "from-green-500 to-emerald-500",
      position: { x: 75, y: 15 },
      delay: 0.9,
      svg: { x: 799, y: 237 }
    },
    {
      id: "dashboard",
      title: "Custom Analytics Platform",
      description: "Bespoke dashboards with advanced visualizations, predictive analytics, and actionable business intelligence.",
      icon: IconChartBar,
      color: "from-orange-500 to-red-500",
      position: { x: 55, y: 25 },
      delay: 0.6,
      svg: { x: 552, y: 237 }
    },
    {
      id: "refinement",
      title: "Iterative Optimization",
      description: "Continuous refinement based on stakeholder feedback to ensure maximum value and perfect alignment.",
      icon: IconPencil,
      color: "from-indigo-500 to-purple-500",
      position: { x: 35, y: 15 },
      delay: 0.3,
      svg: { x: 291, y: 237 }
    },
    {
      id: "launch",
      title: "Production Launch & Support",
      description: "Full deployment with 24/7 monitoring, ongoing optimization, and dedicated support for sustained success.",
      icon: IconShieldCheck,
      color: "from-pink-500 to-rose-500",
      position: { x: 15, y: 25 },
      delay: 0,
      svg: { x: 41, y: 237 }
    }
  ];

  // Animation state: which step is the moving rect at?
  // We'll start at the first step (Discovery)
  const [activeStep, setActiveStep] = useState(0);

  // Current step text for display - Professional and solution-oriented descriptions
  const currentStepTexts = [
    "Analyzing your business requirements and data sources to identify key metrics and KPIs that drive your success...",
    "Building a free pilot dashboard that demonstrates immediate value and ROI within 48 hours...",
    "Securely connecting your existing tools (Stripe, HubSpot, Google Analytics) with enterprise-grade data pipelines...",
    "Creating custom visualizations and real-time dashboards tailored to your specific business needs...",
    "Refining and optimizing based on your feedback to ensure perfect alignment with your goals...",
    "Deploying your production-ready analytics solution with 24/7 monitoring and ongoing optimization..."
  ];
  // Blinking state: "none" | "yellow" | "green"
  const [blink, setBlink] = useState<"none" | "yellow" | "green">("none");

  // For moving rect state: "moving" | "processing" | "done"
  const [movingRectState, setMovingRectState] = useState<MovingRectState>("processing");
  // For which icon to show in the moving rect (changes only when moving)
  const [movingIconStep, setMovingIconStep] = useState(0);

  // For controlling the green path animation
  const CONNECTION_COUNT = connectionLines.length;
  const [connectionProgressArr, setConnectionProgressArr] = useState<number[]>(Array(CONNECTION_COUNT).fill(0));
  const greenPathTimeout = useRef<number | null>(null);

  // For controlling the fade out of the moving rect at the end
  const [movingRectOpacity, setMovingRectOpacity] = useState(1);

  // For the final step Opsight eye animation
  const [showOpsightEye, setShowOpsightEye] = useState(false);
  const [isFinalStep, setIsFinalStep] = useState(false);

  // Helper: get next step index (no loop, just up to last step)
  const getNextStep = (i: number) => (i + 1 < workflowSteps.length ? i + 1 : i);
  // Helper: get the connection index for a given step (step 5->0, 4->1, 3->2, 2->3, 1->4)
  const getConnectionIdx = (stepIdx: number) => (5 - stepIdx) % 5;

  // Framer motion controls for the rect
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    let timeoutDone: NodeJS.Timeout;
    let timeoutFade: NodeJS.Timeout;
    let timeoutRestart: NodeJS.Timeout;

    setMovingRectState("processing");
    setMovingIconStep(activeStep);

    // Reset opacity to 1 when starting a new step
    setMovingRectOpacity(1);

    // Step processing started

    // If we're at the last step, don't try to move to a next step, just do the fade/restart
    if (activeStep === workflowSteps.length - 1) {
      setIsFinalStep(true);
      // Show processing, then done, then blink, then fade out, then restart
      const timeoutProcessing = setTimeout(() => {
        if (!isMounted) return;
        setMovingRectState("done");
        timeoutDone = setTimeout(() => {
          if (!isMounted) return;
          setMovingRectState("moving");
          setMovingIconStep(activeStep);
          setShowOpsightEye(true);
          setBlink("yellow");
          setTimeout(() => {
            setBlink("green");
            setTimeout(() => {
              setBlink("none");
              // Show Opsight eye animation during the 2s pause
              // Wait 2s with green, then fade out over 0.5s, then restart
              timeoutFade = setTimeout(() => {
                setIsFinalStep(false);
                setMovingRectOpacity(0);
                timeoutRestart = setTimeout(() => {
                  setActiveStep(0);
                  setMovingRectState("processing");
                  setMovingIconStep(0);
                  setShowOpsightEye(false);
                  setConnectionProgressArr(Array(CONNECTION_COUNT).fill(0));
                  setMovingRectOpacity(1);
                  // Instantly move the moving rect back to the first step (no animation from last to first)
                  controls.set({
                    x: workflowSteps[0].svg.x - 16,
                    y: workflowSteps[0].svg.y - 16,
                  });
                }, 500); // fade out duration
              }, 2000);
            }, 500);
          }, 3000);
        }, 700);
      }, 900);

      return () => {
        isMounted = false;
        clearTimeout(timeoutProcessing);
        clearTimeout(timeoutDone);
        clearTimeout(timeoutFade);
        clearTimeout(timeoutRestart);
        if (greenPathTimeout.current) cancelAnimationFrame(greenPathTimeout.current);
      };
    }

    // Normal step (not last)
    const to = workflowSteps[getNextStep(activeStep)].svg;
    const connectionIdx = getConnectionIdx(activeStep);

    const timeoutProcessing = setTimeout(() => {
      if (!isMounted) return;
      setMovingRectState("done");
      timeoutDone = setTimeout(() => {
        if (!isMounted) return;
        setMovingRectState("moving");
        setMovingIconStep(getNextStep(activeStep));

        // Animate the green path progress for this connection from 0 to 1 over 2.5s
        let start: number | null = null;
        let req: number;
        function animateGreenPath(ts: number) {
          if (!start) start = ts;
          const elapsed = ts - start;
          const duration = 2500;
          const progress = Math.min(elapsed / duration, 1);
          setConnectionProgressArr(prev => {
            const arr = [...prev];
            arr[connectionIdx] = progress;
            return arr;
          });
          if (progress < 1) {
            req = requestAnimationFrame(animateGreenPath);
            greenPathTimeout.current = req;
          }
        }
        req = requestAnimationFrame(animateGreenPath);
        greenPathTimeout.current = req;

        controls.start({
          x: to.x - 16,
          y: to.y - 16,
          transition: {
            duration: 2.5,
            ease: "linear"
          }
        }).then(() => {
          if (!isMounted) return;
          setBlink("yellow");
            setTimeout(() => {
              setBlink("green");
              setTimeout(() => {
                setBlink("none");
                setActiveStep(getNextStep(activeStep));
              }, 500);
            }, 3000);
        });

        return () => {
          if (req) cancelAnimationFrame(req);
        };
      }, 700);
    }, 900);

    return () => {
      isMounted = false;
      clearTimeout(timeoutProcessing);
      clearTimeout(timeoutDone);
      clearTimeout(timeoutFade);
      clearTimeout(timeoutRestart);
      if (greenPathTimeout.current) cancelAnimationFrame(greenPathTimeout.current);
    };
    // eslint-disable-next-line
  }, [activeStep]);

  // The blinking light position (top right corner of each rect)
  const lightRadius = 4;
  // Dynamic rect size - larger at final step
  const rectSize = (showOpsightEye && isFinalStep) ? 32 : 32;
  const rectHalf = rectSize / 2;

  // For blinking animation classes
  const blinkClass =
    blink === "yellow"
      ? "animate-[blink-yellow_1s_infinite]"
      : blink === "green"
      ? "animate-[blink-green_0.5s_infinite]"
      : "";

  // For which step is currently blinking (the one we're moving to)
  const blinkingStep = activeStep === workflowSteps.length - 1 ? activeStep : getNextStep(activeStep);

  // For rendering blinking circle on top right of the current box
  const renderBlinkingCircle = (stepIdx: number) => {
    if (stepIdx !== blinkingStep || blink === "none") return null;
    const { x, y } = workflowSteps[stepIdx].svg;
    return (
      <circle
        key={`blink-${stepIdx}`}
        cx={x + rectHalf - lightRadius + 33}
        cy={y - rectHalf + lightRadius + 3}
        r={lightRadius}
        fill={blink === "yellow" ? "#FFD600" : "#22C55E"}
        className={blinkClass}
        style={{
          filter: `drop-shadow(0 0 8px ${blink === "yellow" ? "#FFD600" : "#22C55E"})`,
          opacity: blink === "yellow" ? 0.8 : 0.7,
          pointerEvents: "none",
          alignSelf: "row-reverse",
          justifyContent: "row-reverse"
        }}
      />
    );
  };

  // Render the icon inside the moving rect, depending on state
  const renderMovingRectIcon = () => {
    if (movingRectState === "processing") {
      return (
        <IconLoader2
          className="size-5 text-yellow-400"
          style={{
            animation: "spin 1s linear infinite"
          }}
        />
      );
    }
    if (movingRectState === "done") {
      return (
        <IconCheck className="size-5 text-green-400" />
      );
    }
    // Show Opsight eye logo at final step
    if (showOpsightEye && isFinalStep) {
      return (
        <OpsightEyeLogo
          size={rectSize * 0.6}
          className="text-white"
        />
      );
    }
    const Icon = workflowSteps[movingIconStep].icon;
    return <Icon className="size-5 text-white" />;
  };

  // Render all green connections that have progress > 0
  const renderAnimatedGreenPaths = () => {
    return connectionLines.map((line, idx) => {
      const progress = connectionProgressArr[idx];
      if (progress === 0) return null;
      const x = line.x1 + (line.x2 - line.x1) * progress;
      const y = line.y1 + (line.y2 - line.y1) * progress;
      return (
        <line
          key={`green-path-${idx}`}
          x1={line.x1}
          y1={line.y1}
          x2={x}
          y2={y}
          stroke="#22C55E88"
          strokeWidth={4}
          strokeDasharray="4 4"
          style={{
            filter: "drop-shadow(0 0 8px #22C55E88)",
            color: "#22C55E88",
          }}
        />
      );
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "300px" }} ref={containerRef}>
      <style>{blinkKeyframes}</style>

      {/* Current Step Text Display */}
      <div className="absolute top-10 left-40 z-20">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="bg-black/80 w-100 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700/50 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {movingRectState === "processing" ? (
                <IconLoader2 className="w-5 h-5 text-blue-400 animate-spin" />
              ) : movingRectState === "done" ? (
                <IconCheck className="w-5 h-5 text-green-400" />
              ) : (
                (() => {
                  const IconComponent = workflowSteps[activeStep]?.icon;
                  return IconComponent ? (
                    <IconComponent className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <IconRocket className="w-5 h-5 text-yellow-400" />
                  );
                })()
              )}
            </div>
            <span className="text-white text-sm font-medium">
              {currentStepTexts[activeStep]}
            </span>
          </div>
        </motion.div>
      </div>

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 898 334"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-labelledby="animated-workflow-title"
        style={{ display: "block" }}
      >
        <title id="animated-workflow-title">Opsight Workflow Diagram</title>
        <defs>
          <radialGradient id="box-fill-gradient-animated" cx="0.5" cy="0.5" r="0.7" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#1A1B1C" />
            <stop offset="1" stopColor="#151515" />
          </radialGradient>
          <linearGradient id="box-stroke-gradient-animated" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#636363" />
            <stop offset="0.3" stopColor="#2D2E2F" />
          </linearGradient>
          <linearGradient id="connection-green-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>
        </defs>
        {/* Connections */}
        <g>
          {connectionLines.map((line, idx) => {
            const isActive = connectionProgressArr[idx] > 0;
            return (
              !isActive && (
                <motion.line
                  key={`conn-line-${idx}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#2D2E2F"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                />
              )
            );
          })}
          {renderAnimatedGreenPaths()}
        </g>
        {/* Rects for each step (all the same style) */}
        <g>
          {workflowSteps.map((step, idx) => {
            const { x, y } = step.svg;
            return (
              <g key={`rect-group-${idx}`}>
                <rect
                  x={x - rectHalf}
                  y={y - rectHalf}
                  width={70}
                  height={70}
                  rx={8}
                  fill="url(#box-fill-gradient-animated)"
                  stroke="url(#box-stroke-gradient-animated)"
                  strokeWidth={2}
                />
                {/* Icon in the center */}
                <g>
                  <foreignObject
                    x={x - 12}
                    y={y - 12}
                    width={24}
                    height={24}
                  >
                    <div style={{
                      width: 14,
                      height: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {step.icon && <step.icon className="size-5 text-white" />}
                    </div>
                  </foreignObject>
                </g>
                {/* Professional title below each box */}
                <foreignObject
                  x={x - 60}
                  y={y + 28}
                  width={150}
                  height={140}

                >
                  <div
                    style={{
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 400,
                      textAlign: "center",
                      textShadow: "0 1px 4px #000a",
                      lineHeight: 1.2,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "140px",
                      marginTop: "40px",
                      opacity: 0.95,
                      letterSpacing: 0.01,
                    }}
                  >
                    {step.title}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </g>
        {/* Blinking circle on top right of the current box */}
        <g>
          {workflowSteps.map((_, idx) => renderBlinkingCircle(idx))}
        </g>
        {/* Animated moving rect */}
        <motion.g
          animate={controls}
          initial={{
            x: workflowSteps[0].svg.x - rectHalf,
            y: workflowSteps[0].svg.y - rectHalf,
            scale: 1.05,
            opacity: 1
          }}
          style={{
            willChange: "transform",
            opacity: movingRectOpacity,
            transition: "opacity 0.5s"
          }}
        >
          <rect
            x={20}
            y={22}
            width={rectSize}
            height={rectSize}
            rx={8}
            fill="#23272A"
            stroke={blink === "green" ? "none" : "#FFD600"}
            strokeWidth={blink === "yellow" ? 3 : blink === "green" ? 0 : 2}
            style={{
              filter: blink === "yellow"
                ? "drop-shadow(0 0 8px #FFD600)"
                : blink === "green"
                ? "drop-shadow(0 0 8px #22C55E)"
                : "drop-shadow(0 0 4px #23272A)",
            }}
          />
          <foreignObject
            x={rectSize/1.4}
            y={rectSize/1.3}
            width={24}
            height={24}
          >
            <div style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {renderMovingRectIcon()}
            </div>
          </foreignObject>
        </motion.g>
      </svg>
    </div>
  );
}
