'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function AgencyDashboardDemo() {
  const metrics = [
    { label: 'Total Revenue', value: '$125,400', change: '+18.5%', trend: 'up', icon: DollarSign },
    { label: 'Active Clients', value: '24', change: '+3', trend: 'up', icon: Users },
    { label: 'Projects Completed', value: '156', change: '+12%', trend: 'up', icon: CheckCircle },
    { label: 'Avg. Response Time', value: '2.3h', change: '-0.5h', trend: 'down', icon: Clock }
  ];

  const clients = [
    { name: 'TechCorp Inc.', status: 'active', revenue: '$15,200', projects: 8, satisfaction: 95 },
    { name: 'StartupXYZ', status: 'active', revenue: '$8,900', projects: 5, satisfaction: 92 },
    { name: 'E-commerce Plus', status: 'active', revenue: '$12,400', projects: 6, satisfaction: 88 },
    { name: 'Digital Agency', status: 'pending', revenue: '$5,600', projects: 2, satisfaction: 90 }
  ];

  const projectStatus = [
    { status: 'Completed', count: 45, color: 'bg-green-500' },
    { status: 'In Progress', count: 12, color: 'bg-blue-500' },
    { status: 'Pending', count: 8, color: 'bg-yellow-500' },
    { status: 'On Hold', count: 3, color: 'bg-red-500' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Agency Client Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Multi-client project management & reporting</p>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client List */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client Overview</h3>
          <div className="space-y-4">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    client.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{client.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {client.projects} projects • {client.satisfaction}% satisfaction
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">{client.revenue}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Status</h3>
          <div className="space-y-4">
            {projectStatus.map((item, index) => (
              <motion.div
                key={item.status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700 dark:text-gray-300">{item.status}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{item.count}</span>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Overall Progress</span>
              <span>68%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ delay: 0.5, duration: 1 }}
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Automated Reports */}
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
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Automated Client Reports</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Weekly performance reports are automatically generated and sent to all active clients.
              Next report scheduled for Monday 9:00 AM.
            </p>
            <div className="flex flex-wrap gap-2">
              {['PDF Report', 'Email Delivery', 'Slack Integration', 'Custom Branding'].map((feature, index) => (
                <span
                  key={feature}
                  className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
