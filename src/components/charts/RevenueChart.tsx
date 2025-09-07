'use client';

import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number }>;
  className?: string;
}

export default function RevenueChart({ data, className = '' }: RevenueChartProps) {
  // Calculate trend
  const currentRevenue = data[data.length - 1]?.revenue || 0;
  const previousRevenue = data[data.length - 2]?.revenue || 0;
  const trend = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
  const isPositive = trend >= 0;

  return (
    <div className={className}>
      {/* Enhanced chart with area fill */}
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          {/* Beautiful gradient definitions */}
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="revenueLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6"/>
              <stop offset="100%" stopColor="#1d4ed8"/>
            </linearGradient>
          </defs>

          {/* Enhanced grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            strokeOpacity={0.5}
            vertical={false}
          />

          {/* Enhanced axes */}
          <XAxis
            dataKey="month"
            stroke="#6b7280"
            fontSize={12}
            fontWeight={500}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#6b7280' }}
          />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            fontWeight={500}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#6b7280' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />

          {/* Enhanced tooltip */}
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0];
                const value = data.value as number;
                const monthIndex = data.payload?.monthIndex || 0;
                const previousValue = monthIndex > 0 ? data.payload?.previousRevenue : null;
                const change = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
                const isPositive = change >= 0;

                return (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {label}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${value.toLocaleString()}
                        </span>
                      </div>
                      {previousValue && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Change</span>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className={`h-3 w-3 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
                            <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {isPositive ? '+' : ''}{change.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-3 w-3 text-blue-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Monthly Recurring Revenue
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
            cursor={{
              stroke: '#3b82f6',
              strokeWidth: 2,
              strokeDasharray: '5 5',
              strokeOpacity: 0.6
            }}
          />

          {/* Beautiful area fill */}
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="url(#revenueLine)"
            strokeWidth={3}
            fill="url(#revenueGradient)"
            fillOpacity={1}
          />

          {/* Enhanced line */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="url(#revenueLine)"
            strokeWidth={4}
            dot={{
              fill: '#ffffff',
              stroke: '#3b82f6',
              strokeWidth: 3,
              r: 6,
              filter: 'drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3))'
            }}
            activeDot={{
              r: 8,
              stroke: '#ffffff',
              strokeWidth: 3,
              fill: '#3b82f6',
              filter: 'drop-shadow(0 8px 16px rgba(59, 130, 246, 0.4))'
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Enhanced metrics display */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Monthly Revenue
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className={`h-4 w-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
            <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{Math.abs(trend).toFixed(1)}%
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              ${currentRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Current Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
