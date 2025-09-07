'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PilotContextType {
  isPilotMode: boolean;
  pilotLimits: {
    aiQueriesRemaining: number;
    maxAlertRules: number;
    maxCsvFileSize: number; // in MB
    maxDataRetention: number; // in days
  };
  usage: {
    aiQueriesUsed: number;
    alertRulesCreated: number;
    csvFilesUploaded: number;
  };
  upgradeToPremium: () => void;
  useAiQuery: () => boolean;
  canCreateAlert: () => boolean;
  canUploadCsv: (fileSize: number) => boolean;
}

const PilotContext = createContext<PilotContextType | undefined>(undefined);

export const usePilot = () => {
  const context = useContext(PilotContext);
  if (context === undefined) {
    throw new Error('usePilot must be used within a PilotProvider');
  }
  return context;
};

interface PilotProviderProps {
  children: React.ReactNode;
}

export const PilotProvider: React.FC<PilotProviderProps> = ({ children }) => {
  const [isPilotMode] = useState(true); // Set to true for pilot mode
  const [pilotLimits] = useState({
    aiQueriesRemaining: 10, // 10 free AI queries
    maxAlertRules: 2, // 2 free alert rules
    maxCsvFileSize: 5, // 5MB max file size
    maxDataRetention: 30, // 30 days data retention
  });

  const [usage, setUsage] = useState({
    aiQueriesUsed: 0,
    alertRulesCreated: 0,
    csvFilesUploaded: 0,
  });

  // Load usage from localStorage on mount
  useEffect(() => {
    const savedUsage = localStorage.getItem('pilot-usage');
    if (savedUsage) {
      setUsage(JSON.parse(savedUsage));
    }
  }, []);

  // Save usage to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pilot-usage', JSON.stringify(usage));
  }, [usage]);

  const upgradeToPremium = () => {
    // This will be handled by the UpgradeModal component
    // For now, we'll show a simple alert
    alert('Upgrade to Premium to unlock all features! Contact sales@opssight.com');
  };

  const useAiQuery = (): boolean => {
    if (!isPilotMode) return true;

    if (usage.aiQueriesUsed >= pilotLimits.aiQueriesRemaining) {
      return false;
    }

    setUsage(prev => ({
      ...prev,
      aiQueriesUsed: prev.aiQueriesUsed + 1
    }));

    return true;
  };

  const canCreateAlert = (): boolean => {
    if (!isPilotMode) return true;
    return usage.alertRulesCreated < pilotLimits.maxAlertRules;
  };

  const canUploadCsv = (fileSize: number): boolean => {
    if (!isPilotMode) return true;
    const fileSizeMB = fileSize / (1024 * 1024);
    return fileSizeMB <= pilotLimits.maxCsvFileSize;
  };

  const value: PilotContextType = {
    isPilotMode,
    pilotLimits,
    usage,
    upgradeToPremium,
    useAiQuery,
    canCreateAlert,
    canUploadCsv,
  };

  return (
    <PilotContext.Provider value={value}>
      {children}
    </PilotContext.Provider>
  );
};
