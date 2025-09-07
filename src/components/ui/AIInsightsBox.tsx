import { Brain, Sparkles, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface AIInsightsBoxProps {
  title?: string;
  insights: string;
  isLoading?: boolean;
  type?: 'positive' | 'warning' | 'info';
  tldr?: string;
}

const typeStyles = {
  positive: {
    bg: 'from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/10',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    accent: 'text-green-700 dark:text-green-300'
  },
  warning: {
    bg: 'from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/10',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    accent: 'text-yellow-700 dark:text-yellow-300'
  },
  info: {
    bg: 'from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/10',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    accent: 'text-blue-700 dark:text-blue-300'
  }
};

export default function AIInsightsBox({
  title = "AI Insights",
  insights,
  isLoading = false,
  type = 'info',
  tldr
}: AIInsightsBoxProps) {
  const styles = typeStyles[type];

  return (
    <div className={`bg-gradient-to-br ${styles.bg} rounded-xl border ${styles.border} shadow-sm hover:shadow-md transition-all duration-200 group`}>
      <div className="p-6">
        {/* Header with enhanced styling */}
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm ${styles.icon} group-hover:scale-105 transition-transform duration-200`}>
              <Brain className="h-6 w-6" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h3 className={`text-lg font-semibold ${styles.accent}`}>
              {title}
            </h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Sparkles className="h-4 w-4 mr-1" />
              Powered by GPT-4
            </div>
          </div>
        </div>

        {/* TL;DR Summary */}
        {tldr && (
          <div className="mb-4 p-3 bg-white/50 dark:bg-white/10 rounded-lg border border-white/20">
            <div className="flex items-center space-x-2 mb-2">
              {type === 'positive' && <CheckCircle className="h-4 w-4 text-green-600" />}
              {type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
              {type === 'info' && <TrendingUp className="h-4 w-4 text-blue-600" />}
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                TL;DR
              </span>
            </div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {tldr}
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 bg-white/30 dark:bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 bg-white/30 dark:bg-white/10 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-white/30 dark:bg-white/10 rounded w-4/6 animate-pulse"></div>
          </div>
        ) : (
          /* Insights content */
          <div className="text-gray-800 dark:text-gray-200">
            <p className="text-sm leading-relaxed">{insights}</p>
          </div>
        )}

        {/* Interactive hint */}
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="text-xs text-gray-600 dark:text-gray-400 italic">
            💡 Click to ask follow-up questions or get deeper analysis
          </p>
        </div>
      </div>
    </div>
  );
}
