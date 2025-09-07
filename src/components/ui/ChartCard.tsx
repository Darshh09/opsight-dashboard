interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export default function ChartCard({ title, children, className = '', subtitle }: ChartCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
