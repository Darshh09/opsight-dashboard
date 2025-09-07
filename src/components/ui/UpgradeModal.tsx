'use client';

import { useState } from 'react';
import { X, Check, CreditCard, Zap, Crown } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: string;
}

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    period: 'month',
    description: 'Perfect for small teams',
    features: [
      'Unlimited AI queries',
      '10 alert rules',
      '50MB CSV uploads',
      'Email support',
      'Basic analytics'
    ],
    popular: false,
    stripePriceId: 'price_basic_monthly',
    paypalPlanId: 'P-basic-monthly',
    razorpayPlanId: 'plan_basic_monthly'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    period: 'month',
    description: 'Best for growing businesses',
    features: [
      'Unlimited AI queries',
      'Unlimited alert rules',
      '500MB CSV uploads',
      'Priority support',
      'Advanced analytics',
      'Slack integration',
      'Custom dashboards'
    ],
    popular: true,
    stripePriceId: 'price_pro_monthly',
    paypalPlanId: 'P-pro-monthly',
    razorpayPlanId: 'plan_pro_monthly'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'month',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Unlimited CSV uploads',
      'Dedicated support',
      'Custom integrations',
      'Advanced security',
      'SLA guarantee',
      'Custom training'
    ],
    popular: false,
    stripePriceId: 'price_enterprise_monthly',
    paypalPlanId: 'P-enterprise-monthly',
    razorpayPlanId: 'plan_enterprise_monthly'
  }
];

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const plan = plans.find(p => p.id === selectedPlan);
      if (!plan) return;

      let response;
      const requestBody = { planId: plan[`${selectedPaymentMethod}PlanId` as keyof typeof plan], plan: plan.id };

      switch (selectedPaymentMethod) {
        case 'stripe':
          response = await fetch('/api/subscriptions/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
          });
          const stripeData = await response.json();
          if (stripeData.sessionUrl) {
            window.location.href = stripeData.sessionUrl;
          }
          break;

        case 'paypal':
          response = await fetch('/api/payments/paypal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
          });
          const paypalData = await response.json();
          if (paypalData.approvalUrl) {
            window.location.href = paypalData.approvalUrl;
          }
          break;

        case 'razorpay':
          response = await fetch('/api/payments/razorpay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
          });
          const razorpayData = await response.json();
          if (razorpayData.subscriptionId) {
            // Handle Razorpay integration (you'll need to add Razorpay SDK)
            console.log('Razorpay subscription created:', razorpayData);
          }
          break;
      }
    } catch (error) {
      console.error('Upgrade error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upgrade to Premium</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Unlock the full power of OpsSight</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Current Plan Status */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Currently on Pilot Plan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You&apos;re using the free pilot with limited features. Upgrade to unlock unlimited access.
              </p>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } ${plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedPaymentMethod('stripe')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedPaymentMethod === 'stripe'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">Credit Card</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Visa, Mastercard, Amex</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedPaymentMethod('paypal')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedPaymentMethod === 'paypal'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PP</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">PayPal</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Pay with PayPal account</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedPaymentMethod('razorpay')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedPaymentMethod === 'razorpay'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">RZ</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">Razorpay</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">UPI, Cards, Net Banking</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>✓ 30-day money-back guarantee</p>
              <p>✓ Cancel anytime</p>
              <p>✓ No setup fees</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Maybe Later
              </button>
              <button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Crown className="h-4 w-4" />
                    <span>Upgrade Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
