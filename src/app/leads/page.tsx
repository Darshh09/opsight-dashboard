'use client';

import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  UserPlus,
  CreditCard,
  CheckCircle,
  Download
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EnhancedChartCard from '@/components/ui/EnhancedChartCard';
import AIInsightsBox from '@/components/ui/AIInsightsBox';
import FunnelChart from '@/components/charts/FunnelChart';
import DropoffChart from '@/components/charts/DropoffChart';
import { FileUpload } from '@/components/ui/file-upload';
import { usePilot } from '@/contexts/PilotContext';
import PilotStatusBadge from '@/components/ui/PilotStatusBadge';
import { ChartSkeleton } from '@/components/ui/LoadingSkeleton';
import EyeIcon from '@/components/ui/EyeIcon';

// Lazy load the funnel distribution chart
const FunnelDistributionChart = lazy(() => import('@/components/charts/FunnelDistributionChart'));

// Enhanced funnel data with icons and descriptions
const funnelData = [
  {
    stage: 'Website Visits',
    count: 1000,
    percentage: 100,
    color: '#3b82f6',
    icon: Eye,
    description: 'Total website visitors'
  },
  {
    stage: 'Sign-ups',
    count: 300,
    percentage: 30,
    color: '#10b981',
    icon: UserPlus,
    description: 'User registrations'
  },
  {
    stage: 'Paid Plans',
    count: 80,
    percentage: 8,
    color: '#f59e0b',
    icon: CreditCard,
    description: 'Converted to paid'
  },
  {
    stage: 'Retained',
    count: 60,
    percentage: 6,
    color: '#ef4444',
    icon: CheckCircle,
    description: 'Converted to paid'
  }
];

// Enhanced drop-off data with previous values for trends
const dropoffData = [
  { stage: 'Visits to Sign-ups', dropoff: 70, previousDropoff: 75 },
  { stage: 'Sign-ups to Paid', dropoff: 73, previousDropoff: 70 },
  { stage: 'Paid to Retained', dropoff: 25, previousDropoff: 30 }
];


export default function LeadsPage() {
  const { isPilotMode, pilotLimits, canUploadCsv } = usePilot();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <EyeIcon size={36} animated={true} variant="gradient" />
              <h1 className="text-3xl font-bold text-foreground">Leads & Funnel</h1>
            </div>
            <p className="text-muted-foreground mt-2">
              Track your customer acquisition funnel and optimize conversion rates
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <PilotStatusBadge showDetails={true} />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </motion.button>
          </div>
        </div>

      {/* Enhanced Funnel Visualization */}
      <EnhancedChartCard
        title="Customer Acquisition Funnel"
        subtitle="Track conversion rates through each stage of your sales process"
        trend={{ value: 6, isPositive: true, label: "final conversion rate" }}
        metric={{ value: "60", label: "retained customers", color: "#ef4444" }}
      >
        <FunnelChart data={funnelData} />
      </EnhancedChartCard>

      {/* Drop-off Analysis and Funnel Distribution */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <EnhancedChartCard
          title="Drop-off Analysis"
          subtitle="Identify where customers are leaving your funnel"
          trend={{ value: -5, isPositive: true, label: "improvement vs last month" }}
        >
          <DropoffChart data={dropoffData} showTrends={true} />
        </EnhancedChartCard>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Suspense fallback={<ChartSkeleton />}>
            <FunnelDistributionChart className="w-full h-full" />
          </Suspense>
        </motion.div>
      </div>

      {/* AI Insights and CSV Upload */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AIInsightsBox
          title="Funnel Optimization Insights"
          insights="Your funnel shows a 70% drop-off at sign-up stage, indicating UX issues. The 73% drop-off from sign-up to paid suggests pricing strategy needs review. Focus on simplifying the signup process and consider A/B testing pricing tiers to improve conversion rates."
          type="warning"
          tldr="⚠️ Major drop-offs: 70% at signup (UX issues), 73% at payment (pricing concerns)"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card border border-border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">Import Leads Data</h3>
            <p className="text-sm text-muted-foreground">Upload CSV files to analyze your lead data</p>
          </div>

          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-card border-border rounded-lg">
            <FileUpload onChange={(files) => {
              if (files.length > 0) {
                const file = files[0];
                if (!canUploadCsv(file.size)) {
                  alert(`🚫 File size exceeds ${pilotLimits.maxCsvFileSize}MB limit in pilot mode. Upgrade to Premium for larger file uploads!`);
                  return;
                }
                setSelectedFile(file);
              }
            }} />
          </div>

          {isPilotMode && (
            <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <p className="text-xs text-orange-600 dark:text-orange-400">
                📁 Pilot mode: Max file size {pilotLimits.maxCsvFileSize}MB
              </p>
            </div>
          )}

          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800 dark:text-green-200 font-medium">
                  File selected: {selectedFile.name}
                </span>
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                Ready to process {selectedFile.size} bytes of data
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

        {/* Conversion Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <EnhancedChartCard title="Conversion Metrics" subtitle="Key performance indicators for your funnel">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {funnelData[0].count.toLocaleString()}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Total Visits</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-xl border border-green-200 dark:border-green-800">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {funnelData[1].count.toLocaleString()}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Sign-ups</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  {funnelData[2].count.toLocaleString()}
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300">Paid Plans</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {funnelData[3].count.toLocaleString()}
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">Retained</div>
              </div>
            </div>
          </EnhancedChartCard>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
