'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, Package, Users } from 'lucide-react';

export default function EcommerceDashboardDemo() {
  const metrics = [
    { label: 'Total Sales', value: '$89,450', change: '+15.2%', trend: 'up', icon: DollarSign },
    { label: 'Orders', value: '2,847', change: '+8.7%', trend: 'up', icon: ShoppingCart },
    { label: 'Failed Orders', value: '34', change: '-12%', trend: 'down', icon: TrendingDown },
    { label: 'Top Product', value: 'Wireless Headphones', change: '+23%', trend: 'up', icon: Package }
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 234, revenue: '$11,700', growth: '+23%' },
    { name: 'Smart Watch', sales: 189, revenue: '$9,450', growth: '+18%' },
    { name: 'Phone Case', sales: 456, revenue: '$2,280', growth: '+12%' },
    { name: 'Laptop Stand', sales: 123, revenue: '$1,845', growth: '+8%' }
  ];

  const salesData = [
    { day: 'Mon', sales: 12000, orders: 180 },
    { day: 'Tue', sales: 15000, orders: 220 },
    { day: 'Wed', sales: 18000, orders: 280 },
    { day: 'Thu', sales: 22000, orders: 320 },
    { day: 'Fri', sales: 25000, orders: 380 },
    { day: 'Sat', sales: 28000, orders: 420 },
    { day: 'Sun', sales: 24000, orders: 360 }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">E-Commerce Sales Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Product performance & sales analytics</p>
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

      {/* Charts and Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Sales Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {salesData.map((data, index) => (
              <motion.div
                key={data.day}
                initial={{ height: 0 }}
                animate={{ height: `${(data.sales / 30000) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg flex-1 relative group"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ${data.sales.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            {salesData.map(data => (
              <span key={data.day}>{data.day}</span>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{product.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{product.revenue}</p>
                  <p className="text-xs text-green-600">{product.growth}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Cohorts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Retention Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">78%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">30-day retention</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">$45</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg. order value</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">2.3</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Orders per customer</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
