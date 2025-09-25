'use client';

import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  CheckCircle,
  XCircle,
  Download
} from 'lucide-react';
import EyeIcon from '@/components/ui/EyeIcon';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ChartCard from '@/components/ui/ChartCard';
import AIInsightsBox from '@/components/ui/AIInsightsBox';
import { ChartSkeleton } from '@/components/ui/LoadingSkeleton';

// Lazy load the ClippedAreaChart
const ClippedAreaChart = lazy(() => import('@/components/charts/ClippedAreaChart'));

// Dummy Stripe transaction data
const transactions = [
  { id: 'txn_001', customer: 'Acme Corp', amount: 299.00, status: 'succeeded', date: '2024-06-15', plan: 'Pro Plan' },
  { id: 'txn_002', customer: 'TechStart Inc', amount: 99.00, status: 'succeeded', date: '2024-06-14', plan: 'Basic Plan' },
  { id: 'txn_003', customer: 'Global Solutions', amount: 599.00, status: 'failed', date: '2024-06-14', plan: 'Enterprise Plan' },
  { id: 'txn_004', customer: 'Innovation Labs', amount: 199.00, status: 'succeeded', date: '2024-06-13', plan: 'Starter Plan' },
  { id: 'txn_005', customer: 'DataFlow Systems', amount: 399.00, status: 'succeeded', date: '2024-06-13', plan: 'Pro Plan' },
  { id: 'txn_006', customer: 'CloudTech', amount: 299.00, status: 'failed', date: '2024-06-12', plan: 'Pro Plan' },
  { id: 'txn_007', customer: 'FutureWorks', amount: 99.00, status: 'succeeded', date: '2024-06-12', plan: 'Basic Plan' },
  { id: 'txn_008', customer: 'SmartSolutions', amount: 199.00, status: 'succeeded', date: '2024-06-11', plan: 'Starter Plan' },
];

const revenueData = [
  { month: 'January', revenue: 12500 },
  { month: 'February', revenue: 15800 },
  { month: 'March', revenue: 14200 },
  { month: 'April', revenue: 18900 },
  { month: 'May', revenue: 22100 },
  { month: 'June', revenue: 25600 },
  { month: 'July', revenue: 23400 },
  { month: 'August', revenue: 27800 },
  { month: 'September', revenue: 24500 },
  { month: 'October', revenue: 26700 },
  { month: 'November', revenue: 28900 },
  { month: 'December', revenue: 31200 },
];

export default function SalesPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'succeeded' | 'failed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesSearch = transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = transactions
    .filter(t => t.status === 'succeeded')
    .reduce((sum, t) => sum + t.amount, 0);

  const failedPayments = transactions.filter(t => t.status === 'failed').length;
  const successRate = ((transactions.filter(t => t.status === 'succeeded').length / transactions.length) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Sales & Revenue
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor your Stripe transactions and revenue performance
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-4 py-2 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-card hover:bg-accent transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card overflow-hidden rounded-lg shadow-lg border border-border p-5 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">
                    Total Revenue
                  </dt>
                  <dd className="text-lg font-medium text-foreground">
                    ${totalRevenue.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card overflow-hidden rounded-lg shadow-lg border border-border p-5 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">
                    Success Rate
                  </dt>
                  <dd className="text-lg font-medium text-foreground">
                    {successRate}%
                  </dd>
                </dl>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card overflow-hidden rounded-lg shadow-lg border border-border p-5 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">
                    Failed Payments
                  </dt>
                  <dd className="text-lg font-medium text-foreground">
                    {failedPayments}
                  </dd>
                </dl>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Revenue Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <EyeIcon size={20} variant="gradient" animated={true} />
            <h2 className="text-lg font-semibold text-foreground">
              Revenue Performance
            </h2>
          </div>
          <div className="w-full">
            <Suspense fallback={<ChartSkeleton />}>
              <ClippedAreaChart data={revenueData} className="w-full h-100" />
            </Suspense>
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full"
        >
          <AIInsightsBox
            title="Payment Failure Analysis"
            insights="Top 3 reasons for failed payments: 1) Expired credit cards (45%), 2) Insufficient funds (32%), 3) Incorrect billing information (23%). Consider implementing automatic retry logic and proactive customer communication to reduce failed payments."
            type="warning"
            tldr="⚠️ Payment failures: 45% expired cards, 32% insufficient funds, 23% billing errors"
          />
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ChartCard title="Recent Transactions">
            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search customers or transaction IDs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-card text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'succeeded' | 'failed')}
                  className="px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-card text-foreground"
                >
                  <option value="all">All Status</option>
                  <option value="succeeded">Succeeded</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-accent transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {transaction.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {transaction.plan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'succeeded'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {transaction.status === 'succeeded' ? 'Succeeded' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {transaction.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
