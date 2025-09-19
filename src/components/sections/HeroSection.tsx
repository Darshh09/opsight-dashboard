'use client';

import { motion, useTransform, useInView } from 'framer-motion';
import { useRef, memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Play, Rocket, Crown } from 'lucide-react';
import ModernButton from '@/components/ui/ModernButton';

interface HeroSectionProps {
  scrollYProgress: import('framer-motion').MotionValue<number>;
}

const HeroSection = memo(function HeroSection({ scrollYProgress }: HeroSectionProps) {
  const router = useRouter();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2 text-blue-300 text-sm font-medium"
          >
            <Crown className="w-4 h-4" />
            <span>Custom AI-Powered Dashboards</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            AI-Powered Dashboards
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            That Unlock Growth
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            I build AI-powered dashboards & growth tools tailored to your business.
            Stop guessing, start growing with data-driven insights.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <ModernButton
              onClick={handleBookCall}
              variant="primary"
              size="lg"
              icon={<Rocket className="w-5 h-5" />}
              iconPosition="left"
            >
              Book Free Pilot Build
            </ModernButton>

            <ModernButton
              onClick={handleViewDemo}
              variant="outline"
              size="lg"
              icon={<Play className="w-5 h-5" />}
              iconPosition="left"
              className="border-white/30 text-white hover:bg-white hover:text-gray-900"
            >
              See Example Dashboards
            </ModernButton>
          </motion.div>

          {/* Try Dashboard Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-4"
          >
            <ModernButton
              onClick={handleTryDashboard}
              variant="ghost"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="text-blue-300 hover:text-white"
            >
              Try Interactive Dashboard
            </ModernButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Dashboards Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$2M+</div>
              <div className="text-gray-300">Revenue Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24h</div>
              <div className="text-gray-300">Average Build Time</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
});

export default HeroSection;
