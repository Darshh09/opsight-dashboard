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
      title: "Discovery Call",
      description: "We understand your goals, pain points, and what success looks like for you.",
      icon: IconPhone,
      color: "from-blue-500 to-cyan-500",
      position: { x: 75, y: 45 },
      delay: 1.2,
      svg: { x: 552, y: 62 }
    },
    {
      id: "pilot",
      title: "Pilot Build (Free)",
      description: "Get a quick, no-risk dashboard built to prove the value in days, not weeks.",
      icon: IconRocket,
      color: "from-purple-500 to-pink-500",
      position: { x: 55, y: 55 },
      delay: 1.5,
      svg: { x: 799, y: 62 }
    },
    {
      id: "integration",
      title: "Data Integration",
      description: "We securely connect your tools (Stripe, CRMs, Analytics, etc.) — zero tech headache.",
      icon: IconDatabase,
      color: "from-green-500 to-emerald-500",
      position: { x: 75, y: 15 },
      delay: 0.9,
      svg: { x: 799, y: 237 }
    },
    {
      id: "dashboard",
      title: "Custom Dashboard Design",
      description: "Tailored dashboards with real-time insights that match your business needs.",
      icon: IconChartBar,
      color: "from-orange-500 to-red-500",
      position: { x: 55, y: 25 },
      delay: 0.6,
      svg: { x: 552, y: 237 }
    },
    {
      id: "refinement",
      title: "Feedback & Refinement",
      description: "You review, we fine-tune. Simple, fast iterations until it’s perfect.",
      icon: IconPencil,
      color: "from-indigo-500 to-purple-500",
      position: { x: 35, y: 15 },
      delay: 0.3,
      svg: { x: 291, y: 237 }
    },
    {
      id: "launch",
      title: "Launch & Ongoing Support",
      description: "Go live with confidence + 24/7 support as your business grows.",
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

  // Helper: get next step index (loop)
  const getNextStep = (i: number) => (i + 1) % workflowSteps.length;
  // Helper: get the connection index for a given step (step 5->0, 4->1, 3->2, 2->3, 1->4)
  const getConnectionIdx = (stepIdx: number) => (5 - stepIdx) % 5;

  // Framer motion controls for the rect
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    let timeoutDone: NodeJS.Timeout;

    setMovingRectState("processing");
    setMovingIconStep(activeStep);

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
              // Loop: when last step is done, restart everything
              if (activeStep === workflowSteps.length - 1) {
                setTimeout(() => {
                  setActiveStep(0);
                   setMovingRectState("processing");
                   setMovingIconStep(0);
                   setConnectionProgressArr(Array(CONNECTION_COUNT).fill(0));
                }, 1000);
              } else {
                setActiveStep(getNextStep(activeStep));
              }
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
      if (greenPathTimeout.current) cancelAnimationFrame(greenPathTimeout.current);
    };
    // eslint-disable-next-line
  }, [activeStep]);

  // The blinking light position (top right corner of each rect)
  const lightRadius = 4;
  const rectSize = 32;
  const rectHalf = rectSize / 2;

  // For blinking animation classes
  const blinkClass =
    blink === "yellow"
      ? "animate-[blink-yellow_1s_infinite]"
      : blink === "green"
      ? "animate-[blink-green_0.5s_infinite]"
      : "";

  // For which step is currently blinking (the one we're moving to)
  const blinkingStep = getNextStep(activeStep);

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
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 893 320"
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
                  height={180}
                  style={{ pointerEvents: "none" }}
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
                      letterSpacing: 0.01
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
          style={{ willChange: "transform" }}
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
