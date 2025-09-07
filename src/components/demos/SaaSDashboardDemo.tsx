'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SaaSDashboardDemo() {
  const metrics = [
    { label: 'MRR', value: '$45,230', change: '+12.5%', trend: 'up', icon: DollarSign },
    { label: 'New Customers', value: '1,234', change: '+8.2%', trend: 'up', icon: Users },
    { label: 'Churn Rate', value: '2.1%', change: '-0.3%', trend: 'down', icon: TrendingDown },
    { label: 'Failed Payments', value: '23', change: '+5', trend: 'up', icon: AlertTriangle }
  ];

  const chartData = [
    { month: 'Jan', mrr: 32000, customers: 1200 },
    { month: 'Feb', mrr: 35000, customers: 1350 },
    { month: 'Mar', mrr: 38000, customers: 1450 },
    { month: 'Apr', mrr: 42000, customers: 1600 },
    { month: 'May', mrr: 45000, customers: 1750 },
    { month: 'Jun', mrr: 45230, customers: 1800 }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">SaaS Revenue Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Real-time business metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className={`h-8 w-8 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{metric.change}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MRR Chart */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Recurring Revenue</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.mrr / 50000) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg flex-1 relative group"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ${data.mrr.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            {chartData.map(data => (
              <span key={data.month}>{data.month}</span>
            ))}
          </div>
        </div>

        {/* Customer Growth Chart */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Growth</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.customers / 2000) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg flex-1 relative group"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.customers.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            {chartData.map(data => (
              <span key={data.month}>{data.month}</span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800"
      >
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Insight</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Your MRR growth is strong at 12.5%, but failed payments increased by 5 this month.
              Consider implementing automated retry logic to recover an estimated $2,300 in lost revenue.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
