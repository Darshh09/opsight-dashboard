'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  IconCheck,
  IconX
} from '@tabler/icons-react';


export default function CompetitiveAdvantages() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });


  const competitorComparison = [
    {
      feature: "Unified Growth Dashboard",
      opsight: true,
      baremetrics: false,
      mixpanel: false,
      ga4: false
    },
    {
      feature: "AI-Powered Insights",
      opsight: true,
      baremetrics: false,
      mixpanel: false,
      ga4: false
    },
    {
      feature: "All Integrations in One",
      opsight: true,
      baremetrics: false,
      mixpanel: false,
      ga4: false
    },
    {
      feature: "Real-time AI Alerts",
      opsight: true,
      baremetrics: false,
      mixpanel: false,
      ga4: false
    },
    {
      feature: "Investor-Ready Reports",
      opsight: true,
      baremetrics: false,
      mixpanel: false,
      ga4: false
    },
    {
      feature: "Modular Flexibility",
      opsight: true,
      baremetrics: false,
      mixpanel: false,
      ga4: false
    },
    {
      feature: "Free Pilot Build",
      opsight: true,
      baremetrics: false,
      mixpanel: false,
      ga4: false
    },
    {
      feature: "Transparency & Trust",
      opsight: true,
      baremetrics: false,
      mixpanel: false,
      ga4: false
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Opsight</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stop juggling between Baremetrics, Mixpanel, and GA4. Opsight unifies all your growth analytics
            into one intelligent dashboard with AI-powered insights.
          </p>
        </motion.div>


        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-700/50">
            <h3 className="text-2xl font-bold text-white text-center">
              Feature Comparison
            </h3>
            <p className="text-gray-400 text-center mt-2">
              See how Opsight compares to the competition
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-400">
                    Opsight
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">
                    Baremetrics
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">
                    Mixpanel
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">
                    GA4
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-gray-700/30 ${
                      index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-200">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.opsight ? (
                        <IconCheck className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <IconX className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.baremetrics ? (
                        <IconCheck className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <IconX className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.mixpanel ? (
                        <IconCheck className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <IconX className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.ga4 ? (
                        <IconCheck className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <IconX className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Unify Your Analytics?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Stop switching between 3+ tools. Get all your growth metrics in one place with
              AI-powered insights that actually explain what&apos;s happening.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Start Free Pilot
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-gray-500 hover:text-white transition-all duration-300"
              >
                View Live Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
