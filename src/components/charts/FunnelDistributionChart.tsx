"use client";

import { LabelList, Pie, PieChart } from "recharts";
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
import { TrendingUp, Users, Eye, ShoppingCart, CreditCard, LucideIcon } from "lucide-react";

const chartData = [
  { stage: "Visitors", count: 1000, fill: "var(--color-visitors)", icon: Eye },
  { stage: "Leads", count: 650, fill: "var(--color-leads)", icon: Users },
  { stage: "Trials", count: 320, fill: "var(--color-trials)", icon: ShoppingCart },
  { stage: "Customers", count: 180, fill: "var(--color-customers)", icon: CreditCard },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
  leads: {
    label: "Leads",
    color: "var(--chart-2)",
  },
  trials: {
    label: "Trials",
    color: "var(--chart-3)",
  },
  customers: {
    label: "Customers",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

interface FunnelDistributionChartProps {
  data?: Array<{ stage: string; count: number; fill: string; icon: LucideIcon }>;
  className?: string;
}

export default function FunnelDistributionChart({
  data = chartData,
  className = ""
}: FunnelDistributionChartProps) {
  // Calculate conversion rates
  const totalVisitors = data[0]?.count || 0;
  const conversionRates = data.map((item) => {
    const rate = totalVisitors > 0 ? (item.count / totalVisitors) * 100 : 0;
    return { ...item, conversionRate: rate };
  });

  // Calculate overall conversion rate (visitors to customers)
  const overallConversionRate = totalVisitors > 0
    ? ((data[data.length - 1]?.count || 0) / totalVisitors) * 100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full max-w-full ${className}`}
    >
      <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 w-full h-[400px] flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground text-lg font-semibold">
                Funnel Distribution
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Customer Journey Analysis
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                {overallConversionRate.toFixed(1)}%
              </span>
              <Badge
                variant="outline"
                className="text-green-500 bg-green-500/10 border-green-500/20 hover:bg-green-500/20 transition-colors text-xs px-2 py-1"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>Conversion</span>
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col pb-0">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-foreground mx-auto aspect-square max-h-[250px] flex-1"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="count" hideLabel />}
              />
              <Pie
                data={data}
                innerRadius={40}
                dataKey="count"
                radius={80}
                cornerRadius={6}
                paddingAngle={2}
              >
                <LabelList
                  dataKey="count"
                  stroke="none"
                  fontSize={11}
                  fontWeight={600}
                  fill="var(--foreground)"
                  formatter={(value: number) => value.toString()}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* Legend with conversion rates */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {conversionRates.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.stage} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.fill }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <IconComponent className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground truncate">
                        {item.stage}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.count} ({item.conversionRate.toFixed(1)}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
