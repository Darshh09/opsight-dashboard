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
import { PerformanceCard } from '@/components/ui/PerformanceCard';

const ProblemsSection = memo(function ProblemsSection() {
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
    <section ref={problemsRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={problemsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Are These Your
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Struggles?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Every business faces these challenges. The difference is how quickly you identify and solve them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <motion.div
                key={problem.problem}
                initial={{ opacity: 0, y: 30 }}
                animate={problemsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <PerformanceCard
                  className="p-6 h-full hover:shadow-xl transition-all duration-300"
                  hover={true}
                  delay={index * 0.1}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${problem.color} flex items-center justify-center flex-shrink-0`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {problem.problem}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </PerformanceCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={problemsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Turn These Problems Into Growth?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Let&apos;s build a custom dashboard that gives you the insights you need to make data-driven decisions.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="#process"
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
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

export default ProblemsSection;
