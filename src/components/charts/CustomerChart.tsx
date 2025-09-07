'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, TrendingUp } from 'lucide-react';

interface CustomerChartProps {
  data: Array<{ month: string; customers: number }>;
  className?: string;
}

export default function CustomerChart({ data, className = '' }: CustomerChartProps) {
  // Calculate trend
  const currentCustomers = data[data.length - 1]?.customers || 0;
  const previousCustomers = data[data.length - 2]?.customers || 0;
  const trend = previousCustomers > 0 ? ((currentCustomers - previousCustomers) / previousCustomers) * 100 : 0;
  const isPositive = trend >= 0;

  // Beautiful gradient colors for bars
  const colors = [
    'url(#customerGradient1)',
    'url(#customerGradient2)',
    'url(#customerGradient3)',
    'url(#customerGradient4)',
    'url(#customerGradient5)',
    'url(#customerGradient6)'
  ];

  return (
    <div className={className}>
      {/* Enhanced chart with beautiful bars */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          {/* Beautiful gradient definitions */}
          <defs>
            <linearGradient id="customerGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981"/>
              <stop offset="100%" stopColor="#059669"/>
            </linearGradient>
            <linearGradient id="customerGradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4"/>
              <stop offset="100%" stopColor="#0891b2"/>
            </linearGradient>
            <linearGradient id="customerGradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6"/>
              <stop offset="100%" stopColor="#7c3aed"/>
            </linearGradient>
            <linearGradient id="customerGradient4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b"/>
              <stop offset="100%" stopColor="#d97706"/>
            </linearGradient>
            <linearGradient id="customerGradient5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444"/>
              <stop offset="100%" stopColor="#dc2626"/>
            </linearGradient>
            <linearGradient id="customerGradient6" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ec4899"/>
              <stop offset="100%" stopColor="#db2777"/>
            </linearGradient>
          </defs>

          {/* Enhanced grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            strokeOpacity={0.5}
            horizontal={true}
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
          />

          {/* Enhanced tooltip */}
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0];
                const value = data.value as number;
                const monthIndex = data.payload?.monthIndex || 0;
                const previousValue = monthIndex > 0 ? data.payload?.previousCustomers : null;
                const change = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
                const isPositive = change >= 0;

                return (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {label}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Customers</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {value.toLocaleString()}
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
                          <Users className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            New Customer Acquisitions
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
              fill: 'rgba(16, 185, 129, 0.1)',
              stroke: '#10b981',
              strokeWidth: 2,
              strokeOpacity: 0.6
            }}
          />

          {/* Beautiful bars with gradients */}
          <Bar
            dataKey="customers"
            radius={[8, 8, 0, 0]}
            barSize={40}
            animationDuration={2000}
            animationBegin={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Enhanced metrics display */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Customer Growth
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
              {currentCustomers.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Total Customers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
