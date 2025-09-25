"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useRef, useState } from "react";
import { useSpring, useMotionValueEvent } from "motion/react";

const chartData = [
  { month: "January", revenue: 12500 },
  { month: "February", revenue: 15800 },
  { month: "March", revenue: 14200 },
  { month: "April", revenue: 18900 },
  { month: "May", revenue: 22100 },
  { month: "June", revenue: 25600 },
  { month: "July", revenue: 23400 },
  { month: "August", revenue: 27800 },
  { month: "September", revenue: 24500 },
  { month: "October", revenue: 26700 },
  { month: "November", revenue: 28900 },
  { month: "December", revenue: 31200 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface ClippedAreaChartProps {
  data?: Array<{ month: string; revenue: number }>;
  className?: string;
}

export default function ClippedAreaChart({ data = chartData, className = "" }: ClippedAreaChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [axis, setAxis] = useState(0);

  // motion values
  const springX = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });
  const springY = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });

  useMotionValueEvent(springX, "change", (latest) => {
    setAxis(latest);
  });

  // Calculate trend
  const currentRevenue = data[data.length - 1]?.revenue || 0;
  const previousRevenue = data[data.length - 2]?.revenue || 0;
  const trend = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
  const isPositive = trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full max-w-full h-60 ${className}`}
    >
      <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 w-full">
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground text-base font-semibold">
                Revenue Analysis
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs">
                Interactive Revenue Trend
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ${springY.get().toFixed(0)}
              </span>
              <Badge
                variant="outline"
                className={`${isPositive ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'} hover:${isPositive ? 'bg-green-500/20' : 'bg-red-500/20'} transition-colors text-xs px-2 py-1`}
              >
                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                <span>{Math.abs(trend).toFixed(1)}%</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="w-full flex-1 flex flex-col">
          <ChartContainer
            ref={chartRef}
            className="h-60 w-full"
            config={chartConfig}
          >
            <AreaChart
              className="overflow-visible"
              accessibilityLayer
              data={data}
              onMouseMove={(state) => {
                const x = state.activeCoordinate?.x;
                const dataValue = state.activePayload?.[0]?.value;
                if (x && dataValue !== undefined) {
                  springX.set(x);
                  springY.set(dataValue);
                }
              }}
              onMouseLeave={() => {
                springX.set(chartRef.current?.getBoundingClientRect().width || 0);
                springY.jump(data[data.length - 1].revenue);
              }}
              margin={{
                right: 0,
                left: 0,
                top: 10,
                bottom: 10,
              }}
              width={undefined}
              height={250}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="var(--muted)"
                strokeOpacity={0.3}
                horizontalCoordinatesGenerator={(props) => {
                  const { height } = props;
                  return [0, height - 20];
                }}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <Area
                dataKey="revenue"
                type="monotone"
                fill="url(#gradient-cliped-area-revenue)"
                fillOpacity={0.4}
                stroke="var(--color-revenue)"
                strokeWidth={2}
                clipPath={`inset(0 ${
                  Number(chartRef.current?.getBoundingClientRect().width) - axis
                } 0 0)`}
              />
              <line
                x1={axis}
                y1={0}
                x2={axis}
                y2={"85%"}
                stroke="var(--color-revenue)"
                strokeDasharray="3 3"
                strokeLinecap="round"
                strokeOpacity={0.2}
              />
              <rect
                x={axis - 35}
                y={0}
                width={35}
                height={14}
                fill="var(--color-revenue)"
                rx={2}
              />
              <text
                x={axis - 17.5}
                fontWeight={600}
                y={10}
                textAnchor="middle"
                fill="var(--primary-foreground)"
                fontSize={9}
              >
                ${springY.get().toFixed(0)}
              </text>
              {/* this is a ghost line behind graph */}
              <Area
                dataKey="revenue"
                type="monotone"
                fill="none"
                stroke="var(--color-revenue)"
                strokeOpacity={0.1}
                strokeWidth={1}
              />
              <defs>
                <linearGradient
                  id="gradient-cliped-area-revenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0}
                  />
                  <mask id="mask-cliped-area-chart">
                    <rect
                      x={0}
                      y={0}
                      width={"50%"}
                      height={"100%"}
                      fill="white"
                    />
                  </mask>
                </linearGradient>
              </defs>
            </AreaChart>
          </ChartContainer>

          {/* Legend */}
          <div className="mt-2 flex items-center justify-center">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-chart-2"></div>
              <span className="text-xs font-medium text-muted-foreground">
                Revenue Trend
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
