'use client';

import { Crown, Zap, Lock } from 'lucide-react';
import { usePilot } from '@/contexts/PilotContext';

interface PilotStatusBadgeProps {
  className?: string;
  showDetails?: boolean;
}

export default function PilotStatusBadge({ className = '', showDetails = false }: PilotStatusBadgeProps) {
  const { isPilotMode, pilotLimits, usage, upgradeToPremium } = usePilot();

  if (!isPilotMode) {
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white ${className}`}>
        <Crown className="h-3 w-3 mr-1" />
        Premium
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <Zap className="h-3 w-3 mr-1" />
        Pilot Mode
      </div>

      {showDetails && (
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <div className="flex items-center justify-between">
            <span>AI Queries:</span>
            <span className="font-medium">
              {pilotLimits.aiQueriesRemaining - usage.aiQueriesUsed} / {pilotLimits.aiQueriesRemaining}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Alert Rules:</span>
            <span className="font-medium">
              {usage.alertRulesCreated} / {pilotLimits.maxAlertRules}
            </span>
          </div>
          <button
            onClick={upgradeToPremium}
            className="w-full mt-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
}

export function PilotRestrictionBadge({ feature, className = '' }: { feature: string; className?: string }) {
  const { upgradeToPremium } = usePilot();

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white ${className}`}>
      <Lock className="h-3 w-3 mr-1" />
      {feature} - Premium Only
    </div>
  );
}
