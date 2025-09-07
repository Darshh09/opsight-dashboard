'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
  X,
  Calendar,
  Mail,
  Phone,
  Globe,
  Database,
  Code,
  Layers,
  PieChart,
  LineChart,
  MousePointer,
  Filter,
  Download,
  Share2,
  RefreshCw,
  Plus,
  Minus,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function FullDashboardPreview() {
  const [currentView, setCurrentView] = useState<'overview' | 'sales' | 'leads' | 'ai' | 'settings' | 'reports'>('overview');
  const [isLive, setIsLive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleViewChange = (view: 'overview' | 'sales' | 'leads' | 'ai' | 'settings' | 'reports') => {
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
    { label: 'Failed Payments', value: '23', change: '+5', trend: 'up', icon: AlertTriangle, color: 'text-orange-500' },
    { label: 'Active Users', value: '8,456', change: '+15.2%', trend: 'up', icon: Activity, color: 'text-purple-500' },
    { label: 'Conversion Rate', value: '3.4%', change: '+0.8%', trend: 'up', icon: Target, color: 'text-indigo-500' }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home, color: 'text-blue-600', description: 'Key metrics and insights' },
    { id: 'sales', label: 'Sales', icon: DollarSign, color: 'text-green-600', description: 'Revenue and transactions' },
    { id: 'leads', label: 'Leads', icon: UserCheck, color: 'text-purple-600', description: 'Lead generation and conversion' },
    { id: 'ai', label: 'AI Insights', icon: Brain, color: 'text-pink-600', description: 'Smart recommendations' },
    { id: 'reports', label: 'Reports', icon: BarChart3, color: 'text-orange-600', description: 'Custom reports and exports' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600', description: 'Dashboard configuration' }
  ];

  const features = [
    { icon: BarChart3, title: 'Real-time Analytics', description: 'Live data updates every 30 seconds' },
    { icon: Brain, title: 'AI-Powered Insights', description: 'Smart recommendations and predictions' },
    { icon: Zap, title: 'Custom Alerts', description: 'Email, Slack, and SMS notifications' },
    { icon: Shield, title: 'Secure Integration', description: 'Connect to 50+ tools securely' },
    { icon: Download, title: 'Export Reports', description: 'PDF, CSV, and API exports' },
    { icon: Share2, title: 'Team Collaboration', description: 'Share dashboards with your team' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
            <div className="text-center">
              <LineChart className="h-12 w-12 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Interactive Revenue Chart</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Distribution</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Customer Segments Chart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSales = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Analytics</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Live Updates</span>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Advanced Sales Dashboard</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Revenue, transactions, and payment analytics</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Funnel</h3>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Conversion Tracking</span>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
          <div className="text-center">
            <Target className="h-12 w-12 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Lead Generation Dashboard</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Track leads from source to conversion</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAI = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Insights</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your MRR growth is strong at 12.5%, but failed payments increased by 5 this month.
              Consider implementing automated retry logic to recover an estimated $2,300 in lost revenue.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Revenue Optimization', 'Churn Prevention', 'Growth Opportunities'].map((insight, index) => (
                <span
                  key={insight}
                  className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600"
                >
                  {insight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Custom Reports</h3>
          <div className="flex items-center space-x-2">
            <Download className="h-5 w-5 text-orange-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Export Options</span>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Report Builder</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Create and schedule custom reports</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard Settings</h3>
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Configuration</span>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
          <div className="text-center">
            <Settings className="h-12 w-12 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Settings Panel</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Configure integrations and preferences</p>
          </div>
        </div>
      </div>
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
        case 'reports':
          return renderReports();
        case 'settings':
          return renderSettings();
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
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">OpsSight Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-400">Complete analytics platform preview</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{isLive ? 'Live Demo' : 'Demo Mode'}</span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-1">
              <span className="text-sm text-blue-700 dark:text-blue-300">Full Preview</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${showSidebar ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              {showSidebar && (
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Navigation</h3>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSidebar(!showSidebar)}
                className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {showSidebar ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </motion.button>
            </div>

            <div className="space-y-2">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleViewChange(item.id as 'overview' | 'sales' | 'leads' | 'ai-insights' | 'reports' | 'settings')}
                  disabled={isLoading}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <item.icon className={`h-5 w-5 ${currentView === item.id ? item.color : ''}`} />
                  {showSidebar && (
                    <div className="flex-1">
                      <span className="font-medium">{item.label}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {showSidebar && (
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Bell className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Demo Mode</span>
                </div>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
                  This is a preview. Your actual dashboard will have your real data and custom features.
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-yellow-700 dark:text-yellow-300">
                    <strong>Available Features:</strong>
                  </div>
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs text-yellow-700 dark:text-yellow-300">
                      <feature.icon className="h-3 w-3" />
                      <span>{feature.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              This is a comprehensive preview of your future dashboard
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All features shown here will be customized for your specific business needs and data sources.
            </p>
          </div>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Data</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Get Your Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
