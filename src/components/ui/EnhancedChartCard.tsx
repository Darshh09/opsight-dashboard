interface EnhancedChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  metric?: {
    value: string;
    label: string;
    color: string;
  };
}

export default function EnhancedChartCard({
  title,
  subtitle,
  children,
  className = '',
  trend,
  metric
}: EnhancedChartCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${className}`}>
      {/* Enhanced header with metrics */}
      <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>

          {/* Trend indicator */}
          {trend && (
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                trend.isPositive
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                <span className={`text-xs font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? '↗' : '↘'}
                </span>
                <span className="text-xs font-medium">
                  {trend.value}%
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {trend.label}
              </span>
            </div>
          )}
        </div>

        {/* Metric display */}
        {metric && (
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {metric.label}:
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {metric.value}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chart content with enhanced padding */}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}
