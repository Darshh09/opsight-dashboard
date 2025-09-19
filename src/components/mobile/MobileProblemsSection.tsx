'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import {
  TrendingDown,
  Users,
  XCircle,
  Brain,
  Clock,
  AlertTriangle
} from 'lucide-react';

const MobileProblemsSection = memo(function MobileProblemsSection() {
  const problemsRef = useRef(null);
  const problemsInView = useInView(problemsRef, { once: true });

  const problems = [
    {
      problem: "Blind to Revenue Trends",
      description: "You don&apos;t know if your business is really growing or declining until it&apos;s too late → lose $$$",
      icon: TrendingDown,
      color: "from-red-500 to-pink-500"
    },
    {
      problem: "High Customer Churn",
      description: "Customers are leaving, but you don&apos;t know why or when",
      icon: Users,
      color: "from-orange-500 to-red-500"
    },
    {
      problem: "Failed Payments",
      description: "You lose revenue from unnoticed failed transactions",
      icon: XCircle,
      color: "from-pink-500 to-rose-500"
    },
    {
      problem: "No Growth Insights",
      description: "You&apos;re making decisions on gut feeling, not data",
      icon: Brain,
      color: "from-purple-500 to-indigo-500"
    },
    {
      problem: "Manual Reporting",
      description: "You waste hours creating reports instead of scaling",
      icon: Clock,
      color: "from-blue-500 to-cyan-500"
    },
    {
      problem: "Reactive, Not Proactive",
      description: "You only find issues after they&apos;ve hurt your business",
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section ref={problemsRef} className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={problemsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Are These Your
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Struggles?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Every business faces these challenges. The difference is how quickly you identify and solve them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <motion.div
                key={problem.problem}
                initial={{ opacity: 0, y: 30 }}
                animate={problemsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ y: -2, scale: 1.02 }}
                className="group bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${problem.color} flex items-center justify-center flex-shrink-0`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {problem.problem}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={problemsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 sm:p-8 border border-red-200 dark:border-red-800">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
              Ready to Turn These Problems Into Growth?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
              Let&apos;s build a custom dashboard that gives you the insights you need to make data-driven decisions.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a
                href="#process"
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                See How We Solve This
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export { MobileProblemsSection };
