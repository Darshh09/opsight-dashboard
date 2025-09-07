'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, ReferenceLine } from 'recharts';
import { TrendingDown, AlertTriangle, Info } from 'lucide-react';

interface DropoffDatum {
  stage: string;
  dropoff: number; // percent
  previousDropoff?: number; // for trend comparison
}

interface DropoffChartProps {
  data: DropoffDatum[];
  className?: string;
  showAverage?: boolean;
  showTrends?: boolean;
}

export default function DropoffChart({ data, className = '', showAverage = true, showTrends = false }: DropoffChartProps) {
  const average = data.length ? data.reduce((s, d) => s + d.dropoff, 0) / data.length : 0;
  const maxDropoff = Math.max(...data.map(d => d.dropoff));
  const criticalThreshold = 50; // percent

  return (
    <div className={className}>
      {/* Chart Header with Insights */}
      <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-200 mb-1">
              Drop-off Analysis Summary
            </h4>
            <p className="text-xs text-orange-700 dark:text-orange-300">
              {data.filter(d => d.dropoff > criticalThreshold).length > 0
                ? `${data.filter(d => d.dropoff > criticalThreshold).length} stages need immediate attention`
                : 'All stages performing within acceptable ranges'
              }
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-orange-800 dark:text-orange-200">
              {average.toFixed(1)}%
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-400">Avg Drop-off</div>
          </div>
        </div>
      </div>

      {/* Enhanced Chart */}
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 80, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="dropoffGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#ef4444" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="dropoffHover" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <filter id="dropoffShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#ef4444" floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* Enhanced Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            strokeOpacity={0.4}
            horizontal
            vertical={false}
          />

          {/* X-Axis with better formatting */}
          <XAxis
            type="number"
            tickFormatter={(v) => `${v}%`}
            tickLine={false}
            axisLine={false}
            stroke="#6b7280"
            fontSize={11}
            fontWeight={500}
            domain={[0, Math.max(maxDropoff * 1.3, 100)]}
            tick={{ fill: '#6b7280' }}
          />

          {/* Y-Axis with stage labels */}
          <YAxis
            type="category"
            dataKey="stage"
            tickLine={false}
            axisLine={false}
            width={120}
            stroke="#374151"
            fontSize={12}
            fontWeight={600}
            tick={{ fill: '#374151' }}
          />

          {/* Critical threshold line */}
          {showAverage && (
            <ReferenceLine
              x={criticalThreshold}
              stroke="#dc2626"
              strokeDasharray="5 5"
              strokeWidth={2}
            >
              <LabelList
                valueAccessor={() => ''}
                position="top"
                offset={10}
              />
            </ReferenceLine>
          )}

          {/* Average line */}
          {showAverage && (
            <ReferenceLine
              x={average}
              stroke="#f59e0b"
              strokeDasharray="3 3"
              strokeWidth={2}
            >
              <LabelList
                valueAccessor={() => ''}
                position="top"
                offset={10}
              />
            </ReferenceLine>
          )}

          {/* Enhanced Tooltip */}
          <Tooltip
            cursor={{ fill: 'rgba(239, 68, 68, 0.08)' }}
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
              `${value.toFixed(1)}%`,
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

          {/* Enhanced Bars */}
          <Bar
            dataKey="dropoff"
            fill="url(#dropoffGradient)"
            radius={[12, 12, 12, 12]}
            barSize={32}
            className="transition-all duration-300 hover:opacity-90"
          >
            {/* Value Labels */}
            <LabelList
              dataKey="dropoff"
              position="right"
              formatter={(value: number) => `${value.toFixed(1)}%`}
              style={{
                fill: '#111827',
                fontWeight: '700',
                fontSize: '13px'
              }}
              offset={15}
            />

            {/* Trend Indicators */}
            {showTrends && data.map((entry, index) => {
              if (entry.previousDropoff) {
                const trend = entry.dropoff - entry.previousDropoff;
                const isImproving = trend < 0;
                return (
                  <LabelList
                    key={`trend-${index}`}
                    dataKey="dropoff"
                    position="right"
                    formatter={() => (
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs font-medium ${isImproving ? 'text-green-600' : 'text-red-600'}`}>
                          {isImproving ? '↘' : '↗'}
                        </span>
                        <span className={`text-xs ${isImproving ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(trend).toFixed(1)}%
                        </span>
                      </div>
                    )}
                    offset={35}
                  />
                );
              }
              return null;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Chart Footer with Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Stages</div>
          <div className="text-lg font-bold text-red-600">
            {data.filter(d => d.dropoff > criticalThreshold).length}
          </div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Best Performing</div>
          <div className="text-lg font-bold text-green-600">
            {data.reduce((min, d) => d.dropoff < min ? d.dropoff : min, Infinity).toFixed(1)}%
          </div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Impact</div>
          <div className="text-lg font-bold text-orange-600">
            {data.reduce((sum, d) => sum + d.dropoff, 0).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}
