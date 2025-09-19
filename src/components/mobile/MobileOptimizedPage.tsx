'use client';

import { useState, lazy, Suspense, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Brain, X } from 'lucide-react';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { MobileHeroSection } from './MobileHeroSection';
import { MobileProblemsSection } from './MobileProblemsSection';
import { MobileProcessSection } from './MobileProcessSection';

// Lazy load heavy components only when needed
const FullDashboardPreview = lazy(() => import('@/components/demos/FullDashboardPreview'));

const MobileOptimizedPage = memo(function MobileOptimizedPage() {
  const router = useRouter();
  const [showDashboardPreview, setShowDashboardPreview] = useState(false);
  const { scrollYProgress } = useScroll();

  // Parallax transforms - reduced for mobile
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Simplified animated background for mobile */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
        />
        {/* Reduced background animations for mobile */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [180, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl"
          />
        </div>
      </div>

      {/* Mobile-optimized navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <Brain className="h-4 w-4 text-white" />
              </motion.div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                OpsSight
              </span>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/demo')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
              >
                Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm"
              >
                Try
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium"
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile-optimized sections */}
      <MobileHeroSection scrollYProgress={scrollYProgress} />
      <MobileProblemsSection />
      <MobileProcessSection />

      {/* Services Section - Mobile Optimized */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Path</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Flexible pricing options to fit your needs and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Pilot Build',
                price: 'Free',
                description: 'Perfect for testing',
                features: ['1 Dashboard', 'Basic Analytics', '2-3 Day Delivery'],
                popular: false,
                cta: 'Start Free Pilot'
              },
              {
                name: 'Custom Build',
                price: '$999',
                description: 'End-to-end solution',
                features: ['Full Dashboard', 'AI Insights', 'Source Code', '30-Day Support'],
                popular: true,
                cta: 'Book Call'
              },
              {
                name: 'Ongoing Support',
                price: '$499/mo',
                description: 'Maintenance & updates',
                features: ['Dashboard Maintenance', 'New Features', 'Dedicated Support'],
                popular: false,
                cta: 'Contact Us'
              }
            ].map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border ${
                  service.popular ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.name}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.price}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6 text-sm">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/auth/signup')}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      service.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {service.cta}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses already using custom dashboards to drive growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth/signup')}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl"
              >
                Start Free Pilot
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/dashboard')}
                className="border-2 border-white text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Try Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Modal - Mobile Optimized */}
      {showDashboardPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowDashboardPreview(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Suspense fallback={<LoadingSkeleton />}>
              <FullDashboardPreview />
            </Suspense>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowDashboardPreview(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg z-20"
              aria-label="Close dashboard preview"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
});

export default MobileOptimizedPage;
