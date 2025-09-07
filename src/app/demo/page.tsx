'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import DemoModal from '@/components/demos/DemoModal';
import {
  Brain,
  BarChart3,
  ArrowRight,
  Sparkles,
  Check,
  Star,
  Users,
  TrendingUp,
  TrendingDown,
  Zap,
  Lock,
  Crown,
  Play,
  ChevronRight,
  Mail,
  Phone,
  MessageSquare,
  Rocket,
  Target,
  Globe,
  Award,
  Clock,
  DollarSign,
  XCircle,
  AlertTriangle,
  Calendar,
  Github,
  Linkedin,
  ExternalLink,
  Eye,
  Code,
  Database,
  Settings,
  ArrowLeft,
  Shield
} from 'lucide-react';

export default function DemoPage() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const examplesRef = useRef(null);
  const featuresRef = useRef(null);
  const [selectedDemo, setSelectedDemo] = useState<'saas' | 'ecommerce' | 'agency' | null>(null);

  const heroInView = useInView(heroRef, { once: true });
  const examplesInView = useInView(examplesRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const exampleDashboards = [
    {
      title: 'SaaS Revenue & Churn Dashboard',
      description: 'Track MRR, churn rate, customer lifetime value, and growth metrics in real-time.',
      features: ['MRR Tracking', 'Churn Analysis', 'Customer Cohorts', 'Growth Metrics'],
      color: 'from-blue-500 to-cyan-500',
      demoType: 'saas' as const,
      delay: 0.1
    },
    {
      title: 'E-Commerce Sales & Retention Dashboard',
      description: 'Monitor product sales, failed orders, customer behavior, and inventory insights.',
      features: ['Sales Analytics', 'Order Tracking', 'Customer Cohorts', 'Inventory Insights'],
      color: 'from-green-500 to-emerald-500',
      demoType: 'ecommerce' as const,
      delay: 0.2
    },
    {
      title: 'Agency Client Reporting Automation',
      description: 'Automated client dashboards with multi-client views and white-label options.',
      features: ['Client Dashboards', 'Automated Reports', 'Multi-Client Views', 'White-label Options'],
      color: 'from-purple-500 to-pink-500',
      demoType: 'agency' as const,
      delay: 0.3
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get intelligent business recommendations powered by GPT-4. Analyze patterns, predict trends, and make data-driven decisions automatically.',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Monitor your business metrics with beautiful, interactive dashboards. Track revenue, growth, and customer behavior in real-time.',
      color: 'from-green-500 to-emerald-500',
      delay: 0.2
    },
    {
      icon: Shield,
      title: 'Smart Alerts',
      description: 'Never miss critical changes with intelligent notification system. Get alerts via email, Slack, or SMS when metrics cross thresholds.',
      color: 'from-purple-500 to-pink-500',
      delay: 0.3
    },
    {
      icon: TrendingUp,
      title: 'Growth Optimization',
      description: 'Identify opportunities and optimize your funnel. Reduce churn, increase conversions, and scale faster with actionable insights.',
      color: 'from-orange-500 to-red-500',
      delay: 0.4
    },
    {
      icon: Users,
      title: 'Customer Intelligence',
      description: 'Understand your customers better with behavioral analytics and segmentation insights. Predict churn and optimize retention.',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.5
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      description: 'Set up automated processes for lead scoring, customer onboarding, and retention campaigns. Save time and increase efficiency.',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.6
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header/Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0 flex items-center"
            >
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">OpsSight</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/auth/signup')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Your Free Pilot
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-32 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
              </motion.div>
              Example Dashboards
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
            >
              See What's Possible
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              >
                With Custom Dashboards
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Explore these example dashboards to see how custom AI-powered analytics can transform your business insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl flex items-center space-x-3 group"
              >
                <Rocket className="h-5 w-5 group-hover:animate-bounce" />
                <span>Get Your Free Pilot Build</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-2xl text-lg font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center space-x-3 group"
              >
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Learn More</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Example Dashboards Section */}
      <section ref={examplesRef} className="py-24 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={examplesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={examplesInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Real Examples
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Example Dashboard
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Showcases
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how different businesses use custom dashboards to drive growth and make better decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {exampleDashboards.map((dashboard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={examplesInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.8, delay: dashboard.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden"
              >
                {/* Dashboard Preview */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-20 h-20 bg-gradient-to-br ${dashboard.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <BarChart3 className="h-10 w-10 text-white" />
                  </motion.div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedDemo(dashboard.demoType)}
                      className="bg-white/90 text-gray-900 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
                    >
                      <Eye className="h-5 w-5" />
                      <span>View Interactive Demo</span>
                    </motion.button>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {dashboard.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {dashboard.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {dashboard.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/auth/signup')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Get This Dashboard</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={featuresInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6"
            >
              <Target className="h-4 w-4 mr-2" />
              Powerful Features
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need to
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Scale Faster
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Powerful features designed to help businesses grow faster and make better decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={featuresInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"
        />

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Ready to Get Started?
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Let's Build Your
              <span className="block">Custom Dashboard 🚀</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Ready to transform your business with AI-powered insights? Let's start with a free pilot build.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth/signup')}
                className="bg-white text-blue-600 px-12 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl flex items-center space-x-3 group"
              >
                <Rocket className="h-6 w-6 group-hover:animate-bounce" />
                <span>Start Free Pilot</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center space-x-3 group"
              >
                <Calendar className="h-6 w-6" />
                <span>Book Free Call</span>
              </motion.button>
            </div>

            <p className="text-white/80 text-sm mt-6">
              Free pilot dashboard • No technical knowledge required • 2-3 day delivery
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Modal */}
      <DemoModal
        isOpen={selectedDemo !== null}
        onClose={() => setSelectedDemo(null)}
        demoType={selectedDemo}
      />
    </div>
  );
}
