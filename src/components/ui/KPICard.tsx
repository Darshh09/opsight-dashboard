import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  subtitle?: string;
}

const colorClasses = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10',
    icon: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    change: 'text-blue-600 dark:text-blue-400'
  },
  green: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10',
    icon: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    change: 'text-green-600 dark:text-green-400'
  },
  red: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10',
    icon: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    change: 'text-red-600 dark:text-red-400'
  },
  yellow: {
    bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10',
    icon: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800',
    change: 'text-yellow-600 dark:text-yellow-400'
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10',
    icon: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    change: 'text-purple-600 dark:text-purple-400'
  },
};

export default function KPICard({ title, value, change, icon: Icon, color = 'blue', subtitle }: KPICardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`overflow-hidden rounded-xl shadow-sm border ${colors.border} ${colors.bg} hover:shadow-md transition-all duration-200 group cursor-pointer`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-shrink-0">
            <div className={`flex items-center justify-center h-12 w-12 rounded-xl ${colors.icon} group-hover:scale-110 transition-transform duration-200`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
          {change && (
            <div className={`text-right`}>
              <div className={`text-sm font-semibold ${colors.change}`}>
                {change.isPositive ? '+' : ''}{change.value}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                MoM
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <dt className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
            {title}
          </dt>
          <dd className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
            {value}
          </dd>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
