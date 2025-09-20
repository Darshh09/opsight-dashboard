'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import { Calendar, BarChart3, Rocket, ArrowRight } from 'lucide-react';
import { PerformanceCard } from '@/components/ui/PerformanceCard';
import { PerformanceButton } from '@/components/ui/PerformanceButton';
import { AnimatedWorkflow } from '@/components/ui/AnimatedWorkflow';

const ProcessSection = memo(function ProcessSection() {
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
    <section ref={processRef} id="process" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How We Work Together
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smooth Workflow
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From initial consultation to full deployment, watch our process unfold with smooth animations.
          </p>
        </motion.div>

        

        {/* Animated Workflow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={processInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative rounded-3xl p-6 h-105  border border-gray-700 backdrop-blur-sm"
        >
          <AnimatedWorkflow />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-400 mb-6">
              Book your free pilot call and get a custom dashboard in 2-3 days.
            </p>
            <PerformanceButton
              href="/auth/signup"
              variant="primary"
              size="lg"
              className="group"
            >
              Start Free Pilot Build
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </PerformanceButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default ProcessSection;
