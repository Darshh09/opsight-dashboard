'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Users, TrendingUp, Target, Zap } from 'lucide-react';

interface DonutDatum {
  stage: string;
  count: number;
  color: string;
  conversionRate?: number;
  previousCount?: number;
}

interface DonutFunnelChartProps {
  data: DonutDatum[];
  totalLabel?: string;
  className?: string;
  showTrends?: boolean;
}

export default function DonutFunnelChart({ data, totalLabel = 'Total', className = '', showTrends = false }: DonutFunnelChartProps) {
  const total = data.reduce((s, d) => s + d.count, 0);
  const conversionRate = data.length > 1 ? ((data[data.length - 1].count / data[0].count) * 100) : 0;

  return (
    <div className={className}>
      {/* Chart Header with Key Metrics */}
      <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Funnel</div>
              <div className="text-lg font-bold text-blue-900 dark:text-blue-100">{total.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-green-800 dark:text-green-200">Conversion Rate</div>
              <div className="text-lg font-bold text-green-900 dark:text-green-100">{conversionRate.toFixed(1)}%</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Efficiency</div>
              <div className="text-lg font-bold text-purple-900 dark:text-purple-100">
                {data.length > 1 ? ((data[data.length - 1].count / data[0].count) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Chart Container */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <defs>
              <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.15"/>
              </filter>
            </defs>

            <Pie
              data={data}
              dataKey="count"
              nameKey="stage"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={130}
              paddingAngle={3}
              cornerRadius={12}
              className="drop-shadow-lg"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            {/* Enhanced Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: 'none',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(20px)',
                fontSize: '13px'
              }}
              formatter={(value: number, name: string) => [
                value.toLocaleString(),
                name
              ]}
              labelStyle={{
                color: '#111827',
                fontWeight: '700',
                fontSize: '14px',
                marginBottom: '8px'
              }}
              itemStyle={{
                color: '#374151',
                fontWeight: '500'
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Summary with Enhanced Styling */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/50">
            <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">
              {totalLabel}
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {total.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Total Volume
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Legend with Metrics */}
      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((stage) => {
            const percentage = ((stage.count / total) * 100);
            const trend = stage.previousCount ? stage.count - stage.previousCount : 0;
            const isImproving = trend > 0;

            return (
              <div
                key={stage.stage}
                className="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                      style={{ backgroundColor: stage.color }}
                    ></div>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      {stage.stage}
                    </span>
                  </div>

                  {showTrends && stage.previousCount && (
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      isImproving
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      <TrendingUp className={`h-3 w-3 ${isImproving ? 'text-green-600' : 'text-red-600'}`} />
                      <span>{Math.abs(trend).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stage.count.toLocaleString()}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      {percentage.toFixed(1)}%
                    </div>
                    {stage.conversionRate && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {stage.conversionRate.toFixed(1)}% conv.
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: stage.color
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Funnel Performance Insights</span>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          {data.length > 1 && (
            <>
              Your funnel shows a <span className="font-semibold text-blue-600">{conversionRate.toFixed(1)}% overall conversion rate</span>.
              The biggest drop-off occurs at <span className="font-semibold text-orange-600">
                {(() => {
                  let maxDropoff = 0;
                  let maxIndex = 0;
                  for (let i = 1; i < data.length; i++) {
                    const dropoff = data[i-1].count - data[i].count;
                    if (dropoff > maxDropoff) {
                      maxDropoff = dropoff;
                      maxIndex = i;
                    }
                  }
                  return maxIndex === 1 ? 'sign-up' : 'payment';
                })()} stage
              </span> with a <span className="font-semibold text-red-600">
                {(() => {
                  let maxDropoff = 0;
                  for (let i = 1; i < data.length; i++) {
                    const dropoff = data[i-1].count - data[i].count;
                    if (dropoff > maxDropoff) {
                      maxDropoff = dropoff;
                    }
                  }
                  return maxDropoff.toLocaleString();
                })()} visitor loss
              </span>.
            </>
          )}
        </div>
      </div>
    </div>
  );
}
