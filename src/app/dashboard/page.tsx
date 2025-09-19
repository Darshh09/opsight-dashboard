'use client';

import { useState, useEffect, memo, useCallback, Suspense, lazy } from 'react';
import {
  DollarSign,
  Users,
  XCircle,
  TrendingDown,
  LucideIcon
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KPICard from '@/components/ui/KPICard';
import EnhancedChartCard from '@/components/ui/EnhancedChartCard';
import AIInsightsBox from '@/components/ui/AIInsightsBox';
import { ChartSkeleton, KPISkeleton } from '@/components/ui/LoadingSkeleton';
import { PerformanceCard } from '@/components/ui/PerformanceCard';

// Lazy load heavy chart components
const RevenueChart = lazy(() => import('@/components/charts/RevenueChart'));
const CustomerChart = lazy(() => import('@/components/charts/CustomerChart'));

// Dummy data for Week 1
const revenueData = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 15800 },
  { month: 'Mar', revenue: 14200 },
  { month: 'Apr', revenue: 18900 },
  { month: 'May', revenue: 22100 },
  { month: 'Jun', revenue: 25600 },
];

const customerData = [
  { month: 'Jan', customers: 45 },
  { month: 'Feb', customers: 52 },
  { month: 'Mar', customers: 48 },
  { month: 'Apr', customers: 61 },
  { month: 'May', customers: 67 },
  { month: 'Jun', customers: 73 },
];

// Memoized KPI Card component
const MemoizedKPICard = memo(function MemoizedKPICard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color
}: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: string;
}) {
  // Convert string change to KPICard format
  const changeValue = parseFloat(change.replace(/[+%-]/g, ''));
  const isPositive = change.startsWith('+') || (change.startsWith('-') && trend === 'up');

  return (
    <PerformanceCard className="p-6" hover={true}>
      <KPICard
        title={title}
        value={value}
        change={{ value: changeValue, isPositive }}
        icon={Icon}
        color={color as 'blue' | 'green' | 'red' | 'yellow' | 'purple'}
      />
    </PerformanceCard>
  );
});

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
      <div className="space-y-8">
        {/* Page header with better spacing */}
        <div className="pb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Welcome back! Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        {/* KPI Cards with enhanced styling and better storytelling flow */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            📈 Business Health at a Glance
          </h2>

          {isPageLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <KPISkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <MemoizedKPICard
                title="Monthly Recurring Revenue"
                value="$25,600"
                change="+28%"
                trend="up"
                icon={DollarSign}
                color="blue"
              />

              <MemoizedKPICard
                title="New Customers"
                value="142"
                change="+12%"
                trend="up"
                icon={Users}
                color="green"
              />

              <MemoizedKPICard
                title="Failed Payments"
                value="8"
                change="-15%"
                trend="up"
                icon={XCircle}
                color="red"
              />

              <MemoizedKPICard
                title="Customer Churn"
                value="2.1%"
                change="-0.3%"
                trend="up"
                icon={TrendingDown}
                color="green"
              />
            </div>
          )}
        </div>

        {/* Enhanced Charts with beautiful styling */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            📊 Performance Trends
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <MemoizedChartCard title="Revenue Trend">
              <Suspense fallback={<ChartSkeleton />}>
                <RevenueChart data={revenueData} />
              </Suspense>
            </MemoizedChartCard>

            <MemoizedChartCard title="Customer Growth">
              <Suspense fallback={<ChartSkeleton />}>
                <CustomerChart data={customerData} />
              </Suspense>
            </MemoizedChartCard>
          </div>
        </div>

        {/* AI Insights with enhanced prominence */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            🤖 AI-Powered Business Intelligence
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <AIInsightsBox
              insights={aiInsights}
              isLoading={isLoadingInsights}
              type="positive"
              tldr="✅ Growth momentum: 28% MRR increase, 12 new enterprise customers, low churn at 2.1%"
            />

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🎯 Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      📊
                    </div>
                    <span>View detailed sales report</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      🔔
                    </div>
                    <span>Set up payment failure alerts</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      💬
                    </div>
                    <span>Ask AI about your data</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
