'use client';

import { motion, useTransform, useInView } from 'framer-motion';
import { useRef, memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Play, Rocket, Crown } from 'lucide-react';

interface MobileHeroSectionProps {
  scrollYProgress: import('framer-motion').MotionValue<number>;
}

const MobileHeroSection = memo(function MobileHeroSection({ scrollYProgress }: MobileHeroSectionProps) {
  const router = useRouter();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  // Reduced parallax for mobile
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleBookCall = useCallback(() => {
    router.push('/auth/signup');
  }, [router]);

  const handleViewDemo = useCallback(() => {
    router.push('/demo');
  }, [router]);

  const handleTryDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <motion.section
      ref={heroRef}
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-14"
    >
      {/* Simplified background for mobile */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-3 py-1.5 text-blue-300 text-xs font-medium"
          >
            <Crown className="w-3 h-3" />
            <span>Custom AI-Powered Dashboards</span>
          </motion.div>

          {/* Main headline - Mobile optimized */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Custom Dashboards
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              That Drive Growth
            </span>
          </motion.h1>

          {/* Subheadline - Mobile optimized */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed px-4"
          >
            I build AI-powered dashboards & growth tools tailored to your business.
            Stop guessing, start growing with data-driven insights.
          </motion.p>

          {/* CTA Buttons - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col items-center space-y-4 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookCall}
              className="w-full max-w-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Rocket className="w-4 h-4" />
              <span>Book Free Pilot Build</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewDemo}
              className="w-full max-w-sm border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>See Example Dashboards</span>
            </motion.button>
          </motion.div>

          {/* Try Dashboard Button - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTryDashboard}
              className="text-blue-300 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              Try Interactive Dashboard →
            </motion.button>
          </motion.div>

          {/* Stats - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 pt-8 max-w-sm mx-auto"
          >
            <div className="text-center">
              <div className="text-xl font-bold text-white mb-1">50+</div>
              <div className="text-xs text-gray-300">Dashboards</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white mb-1">$2M+</div>
              <div className="text-xs text-gray-300">Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white mb-1">24h</div>
              <div className="text-xs text-gray-300">Build Time</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - Mobile optimized */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full mt-1"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
});

export { MobileHeroSection };
