'use client';

import { useState } from 'react';
import { TrendingDown, Users, UserPlus, CreditCard, CheckCircle } from 'lucide-react';

interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
  color: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface FunnelChartProps {
  data: FunnelStage[];
  className?: string;
}

export default function FunnelChart({ data, className = '' }: FunnelChartProps) {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  return (
    <div className={className}>
      <div className="space-y-6">
        {data.map((stage, index) => {
          const Icon = stage.icon;
          const isHovered = hoveredStage === index;

          return (
            <div
              key={stage.stage}
              className="relative group"
              onMouseEnter={() => setHoveredStage(index)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              {/* Stage header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`} style={{ backgroundColor: stage.color + '20' }}>
                    <Icon className={`h-5 w-5 transition-colors duration-300`} style={{ color: stage.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {stage.stage}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stage.count.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stage.percentage}%
                  </div>
                </div>
              </div>

              {/* Funnel bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-12 overflow-hidden">
                  <div
                    className="h-12 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                    style={{
                      width: `${stage.percentage}%`,
                      background: `linear-gradient(90deg, ${stage.color} 0%, ${stage.color}dd 100%)`
                    }}
                  >
                    {/* Animated shimmer effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ${
                      isHovered ? 'translate-x-full' : '-translate-x-full'
                    }`}></div>
                  </div>
                </div>

                {/* Drop-off indicator */}
                {index < data.length - 1 && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isHovered ? 'scale-125' : 'scale-100'
                    }`} style={{ backgroundColor: stage.color + '20' }}>
                      <TrendingDown className="h-4 w-4" style={{ color: stage.color }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Hover details */}
              {isHovered && (
                <div className="absolute top-full left-0 right-0 mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {stage.percentage}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Count</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {stage.count.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {index < data.length - 1 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Drop-off to next stage: {((stage.count - data[index + 1].count) / stage.count * 100).toFixed(1)}%
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary metrics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Visits</div>
              <div className="text-xl font-bold text-blue-900 dark:text-blue-100">
                {data[0]?.count.toLocaleString() || 0}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-green-600 dark:text-green-400">Final Conversion</div>
              <div className="text-xl font-bold text-green-900 dark:text-green-100">
                {data[data.length - 1]?.percentage.toFixed(1) || 0}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-purple-600 dark:text-purple-400">Revenue Potential</div>
              <div className="text-xl font-bold text-purple-900 dark:text-purple-100">
                ${(data[data.length - 1]?.count * 299).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
