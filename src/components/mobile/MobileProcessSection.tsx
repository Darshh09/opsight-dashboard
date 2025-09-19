'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import { Calendar, BarChart3, Rocket, ArrowRight } from 'lucide-react';

const MobileProcessSection = memo(function MobileProcessSection() {
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true });

  const processSteps = [
    {
      step: "1",
      title: "Book a Free Pilot Call",
      description: "Share your tools (Stripe, Shopify, GA, HubSpot, etc.) and business goals",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      step: "2",
      title: "Get a Mini-Dashboard",
      description: "I build a free pilot dashboard with key insights in 2-3 days",
      icon: BarChart3,
      color: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      step: "3",
      title: "Scale Your Growth",
      description: "Upgrade to a custom build with alerts, analytics, and AI insights",
      icon: Rocket,
      color: "from-purple-500 to-pink-500",
      delay: 0.3
    }
  ];

  return (
    <section ref={processRef} id="process" className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How We Work Together in
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> 3 Steps</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A proven process that gets you from problem to solution in days, not months.
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: step.delay,
                  ease: "easeOut"
                }}
                className="relative"
              >
                {/* Connection line for mobile */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={processInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.5, delay: step.delay + 0.3 }}
                    className="hidden sm:block absolute top-12 left-6 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 z-0"
                  />
                )}

                <motion.div
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="relative bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 z-10"
                >
                  {/* Step number */}
                  <motion.div
                    className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 360
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {step.step}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center`}
                    whileHover={{
                      scale: 1.1,
                      y: -2
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow for mobile */}
                  {index < processSteps.length - 1 && (
                    <div className="sm:hidden flex justify-center mt-4">
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 sm:p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
              Book your free pilot call and get a custom dashboard in 2-3 days.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a
                href="/auth/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 text-sm sm:text-base"
              >
                <span>Start Free Pilot Build</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export { MobileProcessSection };
