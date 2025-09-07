'use client';

import { useState } from 'react';
import {
  Bell,
  Plus,
  Mail,
  MessageSquare,
  Trash2,
  Edit,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Lock
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ChartCard from '@/components/ui/ChartCard';
import AIInsightsBox from '@/components/ui/AIInsightsBox';
import { usePilot } from '@/contexts/PilotContext';
import PilotStatusBadge from '@/components/ui/PilotStatusBadge';

interface AlertRule {
  id: string;
  name: string;
  metric: string;
  threshold: number;
  condition: 'above' | 'below';
  channel: 'email' | 'slack';
  status: 'active' | 'inactive';
  lastTriggered?: Date;
  recipients: string[];
}

const initialAlertRules: AlertRule[] = [
  {
    id: '1',
    name: 'High Churn Alert',
    metric: 'Customer Churn Rate',
    threshold: 5,
    condition: 'above',
    channel: 'email',
    status: 'active',
    lastTriggered: new Date('2024-06-10'),
    recipients: ['ceo@company.com', 'cs@company.com']
  },
  {
    id: '2',
    name: 'Payment Failure Alert',
    metric: 'Failed Payments',
    threshold: 10,
    condition: 'above',
    channel: 'slack',
    status: 'active',
    lastTriggered: new Date('2024-06-14'),
    recipients: ['#payments', '#engineering']
  },
  {
    id: '3',
    name: 'Revenue Drop Alert',
    metric: 'Daily Revenue',
    threshold: 1000,
    condition: 'below',
    channel: 'email',
    status: 'inactive',
    recipients: ['finance@company.com']
  }
];

export default function AlertsPage() {
  const { pilotLimits, canCreateAlert } = usePilot();
  const [alertRules, setAlertRules] = useState<AlertRule[]>(initialAlertRules);
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState<AlertRule | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    metric: '',
    threshold: '',
    condition: 'above' as 'above' | 'below',
    channel: 'email' as 'email' | 'slack',
    recipients: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check pilot restrictions for new rules
    if (!editingRule && !canCreateAlert()) {
      alert(`🚫 You've reached your limit of ${pilotLimits.maxAlertRules} alert rules in pilot mode. Upgrade to Premium for unlimited alerts!`);
      return;
    }

    if (editingRule) {
      // Update existing rule
      setAlertRules(prev => prev.map(rule =>
        rule.id === editingRule.id
          ? {
              ...rule,
              name: formData.name,
              metric: formData.metric,
              threshold: Number(formData.threshold),
              condition: formData.condition,
              channel: formData.channel,
              recipients: formData.recipients.split(',').map(r => r.trim())
            }
          : rule
      ));
    } else {
      // Create new rule
      const newRule: AlertRule = {
        id: Date.now().toString(),
        name: formData.name,
        metric: formData.metric,
        threshold: Number(formData.threshold),
        condition: formData.condition,
        channel: formData.channel,
        status: 'active',
        recipients: formData.recipients.split(',').map(r => r.trim())
      };
      setAlertRules(prev => [...prev, newRule]);
    }

    handleCloseModal();
  };

  const handleEdit = (rule: AlertRule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      metric: rule.metric,
      threshold: rule.threshold.toString(),
      condition: rule.condition,
      channel: rule.channel,
      recipients: rule.recipients.join(', ')
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setAlertRules(prev => prev.filter(rule => rule.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setAlertRules(prev => prev.map(rule =>
      rule.id === id
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
        : rule
    ));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRule(null);
    setFormData({
      name: '',
      metric: '',
      threshold: '',
      condition: 'above',
      channel: 'email',
      recipients: ''
    });
  };

  const activeAlerts = alertRules.filter(rule => rule.status === 'active').length;
  const triggeredToday = alertRules.filter(rule =>
    rule.lastTriggered &&
    rule.lastTriggered.toDateString() === new Date().toDateString()
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Alerts & Notifications
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage automated alerts for critical business metrics
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <PilotStatusBadge showDetails={true} />
            <button
              onClick={() => setShowModal(true)}
              disabled={!canCreateAlert()}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                canCreateAlert()
                  ? 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  : 'text-gray-400 bg-gray-300 cursor-not-allowed'
              }`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Alert Rule
              {!canCreateAlert() && <Lock className="h-4 w-4 ml-2" />}
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Active Alerts
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {activeAlerts}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Triggered Today
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {triggeredToday}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Rules
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {alertRules.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Table and AI Insights */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="Alert Rules">
            <div className="space-y-4">
              {alertRules.map((rule) => (
                <div key={rule.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {rule.name}
                        </h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          rule.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          {rule.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {rule.metric} {rule.condition} {rule.threshold}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        {rule.channel === 'email' ? (
                          <Mail className="h-4 w-4 text-gray-400" />
                        ) : (
                          <MessageSquare className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {rule.recipients.join(', ')}
                        </span>
                      </div>
                      {rule.lastTriggered && (
                        <div className="flex items-center space-x-1 mt-2">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Last triggered: {rule.lastTriggered.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleStatus(rule.id)}
                        className={`p-2 rounded-md ${
                          rule.status === 'active'
                            ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30'
                            : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {rule.status === 'active' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(rule)}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(rule.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          <AIInsightsBox
            title="Alert Optimization"
            insights="Your alert system is well-configured with 3 active rules covering critical metrics. Consider adding alerts for: 1) Revenue growth below 20% monthly, 2) Customer support response time above 4 hours, 3) Server uptime below 99.9%. This will provide comprehensive business monitoring."
            type="info"
            tldr="ℹ️ Well-configured alerts. Consider adding: revenue growth, support response time, server uptime"
          />
        </div>

        {/* Modal for adding/editing alerts */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {editingRule ? 'Edit Alert Rule' : 'Add Alert Rule'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Alert Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Metric
                    </label>
                    <input
                      type="text"
                      value={formData.metric}
                      onChange={(e) => setFormData({...formData, metric: e.target.value})}
                      placeholder="e.g., Customer Churn Rate"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Threshold
                      </label>
                      <input
                        type="number"
                        value={formData.threshold}
                        onChange={(e) => setFormData({...formData, threshold: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Condition
                      </label>
                      <select
                        value={formData.condition}
                        onChange={(e) => setFormData({...formData, condition: e.target.value as 'above' | 'below'})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="above">Above</option>
                        <option value="below">Below</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Channel
                    </label>
                    <select
                      value={formData.channel}
                      onChange={(e) => setFormData({...formData, channel: e.target.value as 'email' | 'slack'})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="email">Email</option>
                      <option value="slack">Slack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Recipients
                    </label>
                    <input
                      type="text"
                      value={formData.recipients}
                      onChange={(e) => setFormData({...formData, recipients: e.target.value})}
                      placeholder={formData.channel === 'email' ? 'email1@company.com, email2@company.com' : '#channel1, #channel2'}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                      {editingRule ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
