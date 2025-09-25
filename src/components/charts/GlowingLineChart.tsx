"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", revenue: 12500, expenses: 8500 },
  { month: "February", revenue: 15800, expenses: 9200 },
  { month: "March", revenue: 14200, expenses: 8800 },
  { month: "April", revenue: 18900, expenses: 10500 },
  { month: "May", revenue: 22100, expenses: 11200 },
  { month: "June", revenue: 25600, expenses: 12800 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

interface GlowingLineChartProps {
  data?: Array<{ month: string; revenue: number; expenses: number }>;
  className?: string;
}

export default function GlowingLineChart({ data = chartData, className = "" }: GlowingLineChartProps) {
  // Calculate trend for revenue
  const currentRevenue = data[data.length - 1]?.revenue || 0;
  const previousRevenue = data[data.length - 2]?.revenue || 0;
  const trend = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;

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
                Revenue Analysis
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Revenue vs Expenses Trend
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-foreground">
                ${currentRevenue.toLocaleString()}
              </span>
              <Badge
                variant="outline"
                className="text-green-500 bg-green-500/10 border-green-500/20 hover:bg-green-500/20 transition-colors"
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{Math.abs(trend).toFixed(1)}%</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="w-full flex-1 flex flex-col">
          <ChartContainer config={chartConfig} className="h-[300px] w-full flex-1">
            <LineChart
              accessibilityLayer
              data={data}
              width={undefined}
              height={300}
              margin={{
                left: 12,
                right: 12,
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--muted)"
                strokeOpacity={0.3}
                strokeDasharray="2 4"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent
                  hideLabel
                  className="bg-card border-border shadow-lg"
                />}
              />
              <Line
                dataKey="revenue"
                type="bump"
                stroke="var(--chart-2)"
                dot={false}
                strokeWidth={3}
                filter="url(#rainbow-line-glow)"
              />
              <Line
                dataKey="expenses"
                type="bump"
                stroke="var(--chart-5)"
                dot={false}
                strokeWidth={3}
                filter="url(#rainbow-line-glow)"
              />
              <defs>
                <filter
                  id="rainbow-line-glow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </LineChart>
          </ChartContainer>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-chart-2"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Revenue
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-chart-5"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Expenses
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
