"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Cell, XAxis, ReferenceLine } from "recharts";
import React from "react";
import { AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import { useMotionValueEvent, useSpring } from "framer-motion";
import { motion } from "framer-motion";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CHART_MARGIN = 35;

const chartData = [
  { month: "January", customers: 45 },
  { month: "February", customers: 52 },
  { month: "March", customers: 48 },
  { month: "April", customers: 61 },
  { month: "May", customers: 67 },
  { month: "June", customers: 73 },
  { month: "July", customers: 78 },
  { month: "August", customers: 85 },
  { month: "September", customers: 92 },
  { month: "October", customers: 88 },
  { month: "November", customers: 95 },
  { month: "December", customers: 102 },
];

const chartConfig = {
  customers: {
    label: "Customers",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface CustomerGrowthChartProps {
  data?: Array<{ month: string; customers: number }>;
  className?: string;
}

export default function CustomerGrowthChart({ data = chartData, className = "" }: CustomerGrowthChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined
  );

  const maxValueIndex = React.useMemo(() => {
    // if user is moving mouse over bar then set value to the bar value
    if (activeIndex !== undefined) {
      return { index: activeIndex, value: data[activeIndex].customers };
    }
    // if no active index then set value to max value
    return data.reduce(
      (max, dataPoint, index) => {
        return dataPoint.customers > max.value ? { index, value: dataPoint.customers } : max;
      },
      { index: 0, value: 0 }
    );
  }, [activeIndex, data]);

  const maxValueIndexSpring = useSpring(maxValueIndex.value, {
    stiffness: 100,
    damping: 20,
  });

  const [springyValue, setSpringyValue] = React.useState(maxValueIndex.value);

  useMotionValueEvent(maxValueIndexSpring, "change", (latest) => {
    setSpringyValue(Number(latest.toFixed(0)));
  });

  React.useEffect(() => {
    maxValueIndexSpring.set(maxValueIndex.value);
  }, [maxValueIndex.value, maxValueIndexSpring]);

  // Calculate growth rate
  const currentCustomers = data[data.length - 1]?.customers || 0;
  const previousCustomers = data[data.length - 2]?.customers || 0;
  const growthRate = previousCustomers > 0 ? ((currentCustomers - previousCustomers) / previousCustomers) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full max-w-full ${className}`}
    >
      <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 w-full h-[500px] flex flex-col">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground text-xl font-bold">
                Customer Growth
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Monthly Customer Acquisition
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={cn(jetBrainsMono.className, "text-2xl tracking-tighter text-foreground")}
              >
                {maxValueIndex.value}
              </span>
              <Badge variant="outline" className="text-green-500 bg-green-500/10 border-green-500/20 hover:bg-green-500/20 transition-colors">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{Math.abs(growthRate).toFixed(1)}%</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="w-full flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <ChartContainer config={chartConfig} className="h-[300px] w-full flex-1">
              <BarChart
                accessibilityLayer
                data={data}
                onMouseLeave={() => setActiveIndex(undefined)}
                margin={{
                  left: CHART_MARGIN,
                  right: 20,
                  top: 20,
                  bottom: 20,
                }}
                width={undefined}
                height={300}
              >
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                />
                <Bar dataKey="customers" fill="var(--color-customers)" radius={4}>
                  {data.map((_, index) => (
                    <Cell
                      className="duration-200"
                      opacity={index === maxValueIndex.index ? 1 : 0.2}
                      key={index}
                      onMouseEnter={() => setActiveIndex(index)}
                    />
                  ))}
                </Bar>
                <ReferenceLine
                  opacity={0.4}
                  y={springyValue}
                  stroke="var(--chart-3)"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  label={<CustomReferenceLabel value={maxValueIndex.value} />}
                />
              </BarChart>
            </ChartContainer>
          </AnimatePresence>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-chart-3"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Customer Count
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface CustomReferenceLabelProps {
  viewBox?: {
    x?: number;
    y?: number;
  };
  value: number;
}

const CustomReferenceLabel: React.FC<CustomReferenceLabelProps> = (props) => {
  const { viewBox, value } = props;
  const x = viewBox?.x ?? 0;
  const y = viewBox?.y ?? 0;

  // we need to change width based on value length
  const width = React.useMemo(() => {
    const characterWidth = 8; // Average width of a character in pixels
    const padding = 10;
    return value.toString().length * characterWidth + padding;
  }, [value]);

  return (
    <>
      <rect
        x={x - CHART_MARGIN}
        y={y - 9}
        width={width}
        height={18}
        fill="var(--chart-3)"
        rx={4}
      />
      <text
        fontWeight={600}
        x={x - CHART_MARGIN + 6}
        y={y + 4}
        fill="var(--primary-foreground)"
      >
        {value}
      </text>
    </>
  );
};
