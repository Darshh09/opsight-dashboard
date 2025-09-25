'use client';

import { useState, useEffect, memo, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  Users,
  XCircle,
  TrendingDown,
  LucideIcon,
  BarChart3,
  TrendingUp,
  Brain,
  Target,
  BarChart,
  Bell,
  MessageCircle
} from 'lucide-react';
import EyeIcon from '@/components/ui/EyeIcon';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KPICard from '@/components/ui/KPICard';
import EnhancedChartCard from '@/components/ui/EnhancedChartCard';
import AIInsightsBox from '@/components/ui/AIInsightsBox';
import { ChartSkeleton, KPISkeleton } from '@/components/ui/LoadingSkeleton';
import { PerformanceCard } from '@/components/ui/PerformanceCard';

// Lazy load heavy chart components
const GlowingLineChart = lazy(() => import('@/components/charts/GlowingLineChart'));
const CustomerGrowthChart = lazy(() => import('@/components/charts/CustomerGrowthChart'));

// Dummy data for Week 1
const revenueData = [
  { month: 'January', revenue: 12500, expenses: 8500 },
  { month: 'February', revenue: 15800, expenses: 9200 },
  { month: 'March', revenue: 14200, expenses: 8800 },
  { month: 'April', revenue: 18900, expenses: 10500 },
  { month: 'May', revenue: 22100, expenses: 11200 },
  { month: 'June', revenue: 25600, expenses: 12800 },
];

const customerData = [
  { month: 'January', customers: 45 },
  { month: 'February', customers: 52 },
  { month: 'March', customers: 48 },
  { month: 'April', customers: 61 },
  { month: 'May', customers: 67 },
  { month: 'June', customers: 73 },
  { month: 'July', customers: 78 },
  { month: 'August', customers: 85 },
  { month: 'September', customers: 92 },
  { month: 'October', customers: 88 },
  { month: 'November', customers: 95 },
  { month: 'December', customers: 102 },
];


// Memoized Chart Card component
const MemoizedChartCard = memo(function MemoizedChartCard({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <PerformanceCard className="p-6" hover={true}>
      <EnhancedChartCard title={title}>
        {children}
      </EnhancedChartCard>
    </PerformanceCard>
  );
});

export default function DashboardPage() {
  const [aiInsights, setAiInsights] = useState<string>('');
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const loadAIInsights = useCallback(() => {
    // Simulate AI insights generation
    const timer = setTimeout(() => {
      setAiInsights(
        "Your SaaS is showing strong growth momentum! MRR increased 28% month-over-month, driven by 12 new enterprise customers. Customer churn remains low at 2.1%, well below industry average. Consider focusing on upselling existing customers as your expansion revenue is growing 35% faster than new customer acquisition."
      );
      setIsLoadingInsights(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate page loading
    const pageTimer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    const insightsCleanup = loadAIInsights();

    return () => {
      clearTimeout(pageTimer);
      insightsCleanup();
    };
  }, [loadAIInsights]);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-8"
      >
        {/* Page header with better spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pb-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <EyeIcon size={36} animated={true} variant="gradient" />
            <h1 className="text-3xl font-bold text-foreground">
              Dashboard Overview
            </h1>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your business today.
          </p>
        </motion.div>

        {/* KPI Cards with enhanced styling and better storytelling flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <EyeIcon size={24} variant="gradient" animated={true} />
            <h2 className="text-xl font-semibold text-foreground">
              Business Health at a Glance
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {isPageLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {Array.from({ length: 4 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <KPISkeleton />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="loaded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <KPICard
                    title="Monthly Recurring Revenue"
                    value="$25,600"
                    change={{ value: 28, isPositive: true }}
                    icon={DollarSign}
                    color="blue"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <KPICard
                    title="New Customers"
                    value="142"
                    change={{ value: 12, isPositive: true }}
                    icon={Users}
                    color="green"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <KPICard
                    title="Failed Payments"
                    value="8"
                    change={{ value: 15, isPositive: true }}
                    icon={XCircle}
                    color="red"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <KPICard
                    title="Customer Churn"
                    value="2.1%"
                    change={{ value: 0.3, isPositive: true }}
                    icon={TrendingDown}
                    color="green"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Charts with beautiful styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <EyeIcon size={24} variant="outline" animated={true} color="var(--primary)" />
            <h2 className="text-xl font-semibold text-foreground">
              Performance Trends
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full h-full"
            >
              <Suspense fallback={<ChartSkeleton />}>
                <GlowingLineChart data={revenueData} className="w-full h-full" />
              </Suspense>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full h-full"
            >
              <Suspense fallback={<ChartSkeleton />}>
                <CustomerGrowthChart data={customerData} className="w-full h-full" />
              </Suspense>
            </motion.div>
          </div>
        </motion.div>

        {/* AI Insights with enhanced prominence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <EyeIcon size={24} variant="solid" animated={true} color="var(--primary)" />
            <h2 className="text-xl font-semibold text-foreground">
              AI-Powered Business Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <AIInsightsBox
                insights={aiInsights}
                isLoading={isLoadingInsights}
                type="positive"
                tldr="✅ Growth momentum: 28% MRR increase, 12 new enterprise customers, low churn at 2.1%"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-card rounded-2xl shadow-xl border border-border p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Quick Actions
                </h3>
              </div>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:bg-accent rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BarChart className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>View detailed sales report</span>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:bg-accent rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Bell className="h-4 w-4 text-red-600" />
                    </div>
                    <span>Set up payment failure alerts</span>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:bg-accent rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="h-4 w-4 text-purple-600" />
                    </div>
                    <span>Ask AI about your data</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
