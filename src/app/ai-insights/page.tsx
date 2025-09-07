'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Brain,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ChartCard from '@/components/ui/ChartCard';
import { usePilot } from '@/contexts/PilotContext';
import PilotStatusBadge from '@/components/ui/PilotStatusBadge';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const presetPrompts = [
  {
    title: "Weekly Summary",
    prompt: "Summarize last week's performance and highlight key insights",
    icon: Clock
  },
  {
    title: "Revenue Forecast",
    prompt: "Predict next month's MRR based on current trends",
    icon: TrendingUp
  },
  {
    title: "Customer Analysis",
    prompt: "Analyze customer behavior patterns and suggest retention strategies",
    icon: Users
  },
  {
    title: "Payment Issues",
    prompt: "What are the main reasons for failed payments and how to fix them?",
    icon: AlertTriangle
  }
];

export default function AIInsightsPage() {
  const { isPilotMode, pilotLimits, useAiQuery } = usePilot();
  const canUseAiQuery = useAiQuery(); // Call hook at component level
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI business analyst. I can help you understand your data, predict trends, and provide actionable insights. What would you like to know about your business?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Check pilot restrictions
    if (isPilotMode && !canUseAiQuery) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `🚫 You've reached your limit of ${pilotLimits.aiQueriesRemaining} AI queries in pilot mode. Upgrade to Premium for unlimited AI insights!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual OpenAI API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('weekly') || input.includes('summary')) {
      return "Based on last week's data, your SaaS showed strong performance with a 28% increase in MRR. Key highlights: 12 new enterprise customers onboarded, customer churn reduced to 2.1%, and expansion revenue grew 35% faster than new customer acquisition. Your customer success initiatives are working well!";
    }

    if (input.includes('revenue') || input.includes('mrr') || input.includes('forecast')) {
      return "Looking at your current growth trajectory, I predict next month's MRR will reach $32,800 - a 28% increase. This projection is based on your consistent 12% monthly customer growth rate and improving expansion revenue. Consider focusing on upselling existing customers as this segment shows the highest growth potential.";
    }

    if (input.includes('customer') || input.includes('behavior') || input.includes('retention')) {
      return "Your customer analysis reveals interesting patterns: Enterprise customers (>$500/month) have 95% retention vs 78% for smaller plans. Customers who engage with onboarding within 7 days have 3x better retention. Recommendation: Implement proactive onboarding check-ins and consider tiered pricing to move customers up the value ladder.";
    }

    if (input.includes('payment') || input.includes('failed') || input.includes('fix')) {
      return "Payment failure analysis shows 3 main issues: 1) Expired cards (45%) - implement card expiry reminders 30 days before, 2) Insufficient funds (32%) - offer payment plan options, 3) Incorrect billing (23%) - add address verification. Consider implementing automatic retry logic with exponential backoff and proactive customer communication.";
    }

    return "I can help you analyze your business data, predict trends, and provide actionable insights. Try asking about weekly performance, revenue forecasting, customer behavior, or payment issues. I'm here to help you make data-driven decisions!";
  };

  const handlePresetPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Insights
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Chat with your AI business analyst powered by GPT-4
            </p>
          </div>
          <PilotStatusBadge showDetails={true} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Chat Panel */}
          <div className="lg:col-span-2">
            <ChartCard title="AI Business Analyst">
              <div className="flex flex-col h-96">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    placeholder="Ask about your business data..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={isLoading || !inputValue.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </ChartCard>
          </div>

          {/* Preset Prompts */}
          <div className="space-y-4">
            <ChartCard title="Quick Prompts">
              <div className="space-y-3">
                {presetPrompts.map((prompt, index) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handlePresetPrompt(prompt.prompt)}
                      disabled={isLoading}
                      className="w-full text-left p-3 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {prompt.title}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {prompt.prompt}
                      </p>
                    </button>
                  );
                })}
              </div>
            </ChartCard>

            <ChartCard title="AI Capabilities">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Data Analysis & Insights
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Trend Prediction
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Customer Behavior Analysis
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Revenue Optimization
                  </span>
                </div>
              </div>
            </ChartCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
