"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { stage: "Landing Page", visitors: 1000, dropoffs: 0, conversions: 1000 },
  { stage: "Product View", visitors: 850, dropoffs: 150, conversions: 850 },
  { stage: "Add to Cart", visitors: 520, dropoffs: 330, conversions: 520 },
  { stage: "Checkout", visitors: 320, dropoffs: 200, conversions: 320 },
  { stage: "Payment", visitors: 180, dropoffs: 140, conversions: 180 },
  { stage: "Complete", visitors: 165, dropoffs: 15, conversions: 165 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
  dropoffs: {
    label: "Drop-offs",
    color: "var(--chart-2)",
  },
  conversions: {
    label: "Conversions",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

type ActiveProperty = keyof typeof chartConfig | "all";

interface DropoffAnalysisChartProps {
  data?: Array<{ stage: string; visitors: number; dropoffs: number; conversions: number }>;
  className?: string;
}

export default function DropoffAnalysisChart({
  data = chartData,
  className = ""
}: DropoffAnalysisChartProps) {
  const [activeProperty, setActiveProperty] = React.useState<ActiveProperty>("all");

  // Calculate overall conversion rate
  const totalVisitors = data[0]?.visitors || 0;
  const totalConversions = data[data.length - 1]?.conversions || 0;
  const conversionRate = totalVisitors > 0 ? (totalConversions / totalVisitors) * 100 : 0;
  const isPositive = conversionRate >= 15; // Consider 15%+ as positive

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full max-w-full ${className}`}
    >
      <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 w-full h-[400px] flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex flex-row justify-between items-start">
            <div>
              <CardTitle className="text-foreground text-lg font-semibold">
                Drop-off Analysis
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Customer Journey Drop-off Points
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                {conversionRate.toFixed(1)}%
              </span>
              <Badge
                variant="outline"
                className={`${isPositive ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'} hover:${isPositive ? 'bg-green-500/20' : 'bg-red-500/20'} transition-colors text-xs px-2 py-1`}
              >
                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                <span>Conversion</span>
              </Badge>
            </div>
          </div>

          <div className="mt-3">
            <Select
              value={activeProperty}
              onValueChange={(value: ActiveProperty) => {
                setActiveProperty(value);
              }}
            >
              <SelectTrigger className="text-xs h-8 px-3 w-32 bg-card border-border text-foreground">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent align="end" className="bg-card border-border">
                <SelectGroup>
                  <SelectLabel className="text-muted-foreground">Metrics</SelectLabel>
                  <SelectItem className="text-xs text-foreground" value="all">
                    All
                  </SelectItem>
                  <SelectItem className="text-xs text-foreground" value="visitors">
                    Visitors
                  </SelectItem>
                  <SelectItem className="text-xs text-foreground" value="dropoffs">
                    Drop-offs
                  </SelectItem>
                  <SelectItem className="text-xs text-foreground" value="conversions">
                    Conversions
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{
                left: -15,
                right: 20,
                top: 10,
                bottom: 10,
              }}
            >
              <YAxis
                type="category"
                dataKey="stage"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                width={100}
              />
              <XAxis
                type="number"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                hide
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                stackId="a"
                barSize={12}
                className="dark:text-[#1A1A1C] text-[#E4E4E7]"
                dataKey="visitors"
                fill="var(--color-visitors)"
                radius={4}
                shape={<CustomGradientBar activeProperty={activeProperty} dataKey="visitors" />}
                background={{ fill: "currentColor", radius: 4 }}
                overflow="visible"
              />
              <Bar
                stackId="a"
                barSize={12}
                shape={<CustomGradientBar activeProperty={activeProperty} dataKey="dropoffs" />}
                dataKey="dropoffs"
                fill="var(--color-dropoffs)"
                radius={4}
                overflow="visible"
              />
              <Bar
                stackId="a"
                barSize={12}
                shape={<CustomGradientBar activeProperty={activeProperty} dataKey="conversions" />}
                dataKey="conversions"
                fill="var(--color-conversions)"
                radius={4}
                overflow="visible"
              />
            </BarChart>
          </ChartContainer>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-chart-1"></div>
              <span className="text-xs font-medium text-muted-foreground">Visitors</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-chart-2"></div>
              <span className="text-xs font-medium text-muted-foreground">Drop-offs</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-chart-3"></div>
              <span className="text-xs font-medium text-muted-foreground">Conversions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const CustomGradientBar = (
  props: React.SVGProps<SVGRectElement> & {
    dataKey?: string;
    activeProperty?: ActiveProperty | null;
    glowOpacity?: number;
  }
) => {
  const { fill, x, y, width, height, dataKey, activeProperty, radius } = props;

  const isActive = activeProperty === "all" ? true : activeProperty === dataKey;

  return (
    <>
      <rect
        x={x}
        y={y}
        rx={radius}
        width={width}
        height={height}
        stroke="none"
        fill={fill}
        opacity={isActive ? 1 : 0.1}
        filter={
          isActive && activeProperty !== "all"
            ? `url(#glow-chart-${dataKey})`
            : undefined
        }
      />
      <defs>
        <filter
          id={`glow-chart-${dataKey}`}
          x="-200%"
          y="-200%"
          width="600%"
          height="600%"
        >
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </>
  );
};
