'use client';

import { useState, useEffect } from 'react';
import {
  DollarSign,
  Users,
  XCircle,
  TrendingDown
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KPICard from '@/components/ui/KPICard';
import EnhancedChartCard from '@/components/ui/EnhancedChartCard';
import AIInsightsBox from '@/components/ui/AIInsightsBox';
import RevenueChart from '@/components/charts/RevenueChart';
import CustomerChart from '@/components/charts/CustomerChart';

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

export default function DashboardPage() {
  const [aiInsights, setAiInsights] = useState<string>('');
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);

  useEffect(() => {
    // Simulate AI insights generation
    const timer = setTimeout(() => {
      setAiInsights(
        "Your SaaS is showing strong growth momentum! MRR increased 28% month-over-month, driven by 12 new enterprise customers. Customer churn remains low at 2.1%, well below industry average. Consider focusing on upselling existing customers as your expansion revenue is growing 35% faster than new customer acquisition."
      );
      setIsLoadingInsights(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

            {/* Good news first - Growth metrics */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Monthly Recurring Revenue"
                value="$25,600"
                change={{ value: 28, isPositive: true }}
                icon={DollarSign}
                color="blue"
                subtitle="Up from $20,000 last month"
              />

              <KPICard
                title="New Customers"
                value="142"
                change={{ value: 12, isPositive: true }}
                icon={Users}
                color="green"
                subtitle="12 new enterprise customers this month"
              />

              <KPICard
                title="Failed Payments"
                value="8"
                change={{ value: 15, isPositive: false }}
                icon={XCircle}
                color="red"
                subtitle="Down from 9 last month"
              />

              <KPICard
                title="Customer Churn"
                value="2.1%"
                change={{ value: 0.3, isPositive: false }}
                icon={TrendingDown}
                color="yellow"
                subtitle="Slight increase from 1.8%"
              />
            </div>
        </div>

        {/* Enhanced Charts with beautiful styling */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            📊 Performance Trends
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <EnhancedChartCard
              title="Revenue Trend"
              subtitle="Monthly recurring revenue growth over time"
              trend={{ value: 28, isPositive: true, label: "vs last month" }}
              metric={{ value: "$25,600", label: "Current MRR", color: "#3b82f6" }}
            >
              <RevenueChart data={revenueData} />
            </EnhancedChartCard>

            <EnhancedChartCard
              title="Customer Growth"
              subtitle="New customer acquisition by month"
              trend={{ value: 12, isPositive: true, label: "vs last month" }}
              metric={{ value: "73", label: "Total Customers", color: "#10b981" }}
            >
              <CustomerChart data={customerData} />
            </EnhancedChartCard>
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
