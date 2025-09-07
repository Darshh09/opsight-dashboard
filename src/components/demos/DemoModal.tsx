'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SaaSDashboardDemo from './SaaSDashboardDemo';
import EcommerceDashboardDemo from './EcommerceDashboardDemo';
import AgencyDashboardDemo from './AgencyDashboardDemo';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoType: 'saas' | 'ecommerce' | 'agency' | null;
}

export default function DemoModal({ isOpen, onClose, demoType }: DemoModalProps) {
  const renderDemo = () => {
    switch (demoType) {
      case 'saas':
        return <SaaSDashboardDemo />;
      case 'ecommerce':
        return <EcommerceDashboardDemo />;
      case 'agency':
        return <AgencyDashboardDemo />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (demoType) {
      case 'saas':
        return 'SaaS Revenue & Churn Dashboard';
      case 'ecommerce':
        return 'E-Commerce Sales & Retention Dashboard';
      case 'agency':
        return 'Agency Client Reporting Dashboard';
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{getTitle()}</h2>
                  <p className="text-gray-600 dark:text-gray-400">Interactive dashboard preview</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Demo Content */}
            <div className="p-6">
              {renderDemo()}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-t border-gray-200 dark:border-gray-700 px-6 py-4 rounded-b-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-center sm:text-left">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Ready to get your own custom dashboard?
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This is just a preview - your dashboard will be tailored to your specific business needs.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Close Preview
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onClose();
                      window.location.href = '/auth/signup';
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get My Dashboard
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
