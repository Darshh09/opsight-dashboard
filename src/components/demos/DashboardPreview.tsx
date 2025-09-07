'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import CustomBuildRequest from '@/components/forms/CustomBuildRequest';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Brain,
  Settings,
  Bell,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Home,
  ShoppingCart,
  UserCheck,
  Activity,
  Zap,
  Shield,
  Clock,
  Target,
  Star,
  Eye,
  EyeOff,
  X
} from 'lucide-react';

export default function DashboardPreview() {
  const [currentView, setCurrentView] = useState<'overview' | 'sales' | 'leads' | 'ai'>('overview');
  const [showCustomBuildForm, setShowCustomBuildForm] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle view change with loading state
  const handleViewChange = (view: 'overview' | 'sales' | 'leads' | 'ai') => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsLoading(false);
    }, 200);
  };

  const metrics = [
    { label: 'MRR', value: '$45,230', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'text-green-500' },
    { label: 'New Customers', value: '1,234', change: '+8.2%', trend: 'up', icon: Users, color: 'text-blue-500' },
    { label: 'Churn Rate', value: '2.1%', change: '-0.3%', trend: 'down', icon: TrendingDown, color: 'text-red-500' },
    { label: 'Failed Payments', value: '23', change: '+5', trend: 'up', icon: AlertTriangle, color: 'text-orange-500' }
  ];

  const chartData = [
    { month: 'Jan', mrr: 32000, customers: 1200, revenue: 28000 },
    { month: 'Feb', mrr: 35000, customers: 1350, revenue: 32000 },
    { month: 'Mar', mrr: 38000, customers: 1450, revenue: 36000 },
    { month: 'Apr', mrr: 42000, customers: 1600, revenue: 40000 },
    { month: 'May', mrr: 45000, customers: 1750, revenue: 43000 },
    { month: 'Jun', mrr: 45230, customers: 1800, revenue: 45230 }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home, color: 'text-blue-600' },
    { id: 'sales', label: 'Sales', icon: DollarSign, color: 'text-green-600' },
    { id: 'leads', label: 'Leads', icon: UserCheck, color: 'text-purple-600' },
    { id: 'ai', label: 'AI Insights', icon: Brain, color: 'text-pink-600' }
  ];

  const recentTransactions = [
    { id: 'TXN-001', customer: 'John Doe', amount: '$99.00', status: 'success', date: '2024-01-15', time: '10:30 AM' },
    { id: 'TXN-002', customer: 'Jane Smith', amount: '$149.00', status: 'success', date: '2024-01-15', time: '09:45 AM' },
    { id: 'TXN-003', customer: 'Bob Johnson', amount: '$79.00', status: 'failed', date: '2024-01-14', time: '11:20 AM' },
    { id: 'TXN-004', customer: 'Alice Brown', amount: '$199.00', status: 'success', date: '2024-01-14', time: '08:15 AM' },
    { id: 'TXN-005', customer: 'Charlie Wilson', amount: '$299.00', status: 'success', date: '2024-01-14', time: '07:30 AM' }
  ];

  const leadFunnelData = [
    { stage: 'Visitors', count: 10000, percentage: 100, color: 'bg-blue-500' },
    { stage: 'Leads', count: 2500, percentage: 25, color: 'bg-green-500' },
    { stage: 'Qualified', count: 750, percentage: 7.5, color: 'bg-yellow-500' },
    { stage: 'Customers', count: 150, percentage: 1.5, color: 'bg-purple-500' }
  ];

  const aiInsights = [
    {
      type: 'revenue',
      title: 'Revenue Optimization',
      description: 'Your MRR growth is strong at 12.5%, but failed payments increased by 5 this month.',
      recommendation: 'Consider implementing automated retry logic to recover an estimated $2,300 in lost revenue.',
      priority: 'high',
      icon: DollarSign
    },
    {
      type: 'churn',
      title: 'Churn Prevention',
      description: 'Customer churn is decreasing, which is excellent news for your business.',
      recommendation: 'Focus on the onboarding process that\'s working well for new customers.',
      priority: 'low',
      icon: Users
    },
    {
      type: 'growth',
      title: 'Growth Opportunity',
      description: 'Your customer acquisition rate is above industry average.',
      recommendation: 'Consider scaling your marketing efforts to capitalize on this momentum.',
      priority: 'medium',
      icon: TrendingUp
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.mrr / 50000) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg flex-1 relative group hover:from-blue-600 hover:to-blue-500 transition-all duration-300"
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Growth</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.customers / 2000) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg flex-1 relative group hover:from-green-600 hover:to-green-500 transition-all duration-300"
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
    </div>
  );

  const renderSales = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Live Updates</span>
          </div>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((txn, index) => (
            <motion.div
              key={txn.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${txn.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{txn.customer}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{txn.id} • {txn.date} at {txn.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">{txn.amount}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  txn.status === 'success'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {txn.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Funnel Analysis</h3>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Conversion Tracking</span>
          </div>
        </div>
        <div className="space-y-6">
          {leadFunnelData.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{stage.stage}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{stage.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className={`${stage.color} h-3 rounded-full relative`}
                  >
                    <div className="absolute right-0 top-0 w-2 h-3 bg-white/30 rounded-r-full"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAI = () => (
    <div className="space-y-6">
      {aiInsights.map((insight, index) => (
        <motion.div
          key={insight.type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800"
        >
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              insight.priority === 'high' ? 'bg-red-100 dark:bg-red-900/20' :
              insight.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
              'bg-green-100 dark:bg-green-900/20'
            }`}>
              <insight.icon className={`h-6 w-6 ${
                insight.priority === 'high' ? 'text-red-600' :
                insight.priority === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{insight.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  insight.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {insight.priority} priority
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{insight.description}</p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Recommendation:</strong> {insight.recommendation}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderContent = () => {
    try {
      switch (currentView) {
        case 'overview':
          return renderOverview();
        case 'sales':
          return renderSales();
        case 'leads':
          return renderLeads();
        case 'ai':
          return renderAI();
        default:
          return renderOverview();
      }
    } catch (error) {
      console.error('Error rendering dashboard content:', error);
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Please try refreshing the page or contact support.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">OpsSight Dashboard</h2>
            <p className="text-blue-100">Interactive Preview - Experience the full interface</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-blue-100">{isLive ? 'Live Demo' : 'Demo Mode'}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-sm text-blue-100">Preview Mode</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleViewChange(item.id as any)}
                disabled={isLoading}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <item.icon className={`h-5 w-5 ${currentView === item.id ? item.color : ''}`} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center space-x-2 mb-2">
              <Bell className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Demo Mode</span>
            </div>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
              This is a preview. Your actual dashboard will have your real data and custom features.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCustomBuildForm(true)}
              className="w-full bg-yellow-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Get Your Dashboard
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Ready to get your own custom dashboard?
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This preview shows just a fraction of what's possible with your data.
            </p>
          </div>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCustomBuildForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Request Custom Build</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Custom Build Request Modal */}
      <CustomBuildRequest
        isOpen={showCustomBuildForm}
        onClose={() => setShowCustomBuildForm(false)}
      />
    </div>
  );
}
