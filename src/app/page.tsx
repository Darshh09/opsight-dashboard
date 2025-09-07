'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Brain,
  BarChart3,
  Shield,
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
  X
} from 'lucide-react';
import FullDashboardPreview from '@/components/demos/FullDashboardPreview';

export default function LandingPage() {
  const router = useRouter();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showDashboardPreview, setShowDashboardPreview] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const problemsRef = useRef(null);
  const processRef = useRef(null);
  const servicesRef = useRef(null);
  const useCasesRef = useRef(null);
  const aboutRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const problemsInView = useInView(problemsRef, { once: true });
  const processInView = useInView(processRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true });
  const useCasesInView = useInView(useCasesRef, { once: true });
  const aboutInView = useInView(aboutRef, { once: true });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const problems = [
    {
      problem: "Blind to Revenue Trends",
      description: "You don't know if your business is really growing or declining until it's too late → lose $$$",
      icon: TrendingDown,
      color: "from-red-500 to-pink-500"
    },
    {
      problem: "High Customer Churn",
      description: "Customers are leaving, but you don't know why or when",
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
      description: "You're making decisions on gut feeling, not data",
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
      description: "You only find issues after they've hurt your business",
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const services = [
    {
      name: 'Pilot Build',
      price: 'Free',
      period: 'one-time',
      description: 'Perfect for testing the waters',
      features: [
        '1 Small Dashboard',
        'Basic Analytics',
        'Limited Data Sources',
        'Proof of Concept',
        'Email Support',
        '2-3 Day Delivery'
      ],
      popular: false,
      cta: 'Start Free Pilot',
      color: 'border-gray-200',
      delay: 0.1
    },
    {
      name: 'Custom Build',
      price: '$999',
      period: 'one-time',
      description: 'End-to-end tailored dashboard',
      features: [
        'Full Custom Dashboard',
        'Multiple Integrations',
        'Advanced Analytics',
        'AI-Powered Insights',
        'Slack/Email Alerts',
        'Source Code Included',
        '2-Week Delivery',
        '30-Day Support'
      ],
      popular: true,
      cta: 'Book Discovery Call',
      color: 'border-blue-500 ring-2 ring-blue-500',
      delay: 0.2
    },
    {
      name: 'Ongoing Support',
      price: '$499',
      period: 'month',
      description: 'Maintenance & new features',
      features: [
        'Dashboard Maintenance',
        'New Feature Development',
        'Data Source Updates',
        'Performance Optimization',
        'Dedicated Support',
        'Monthly Reports',
        'Priority Updates',
        'Custom Integrations'
      ],
      popular: false,
      cta: 'Contact for Ongoing Work',
      color: 'border-purple-500',
      delay: 0.3
    }
  ];

  const useCases = [
    {
      title: 'SaaS Startups',
      description: 'Track MRR, churn, payments, and growth metrics',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      features: ['MRR Tracking', 'Churn Analysis', 'Payment Monitoring', 'Growth Metrics']
    },
    {
      title: 'E-Commerce',
      description: 'Monitor product sales, failed orders, and customer cohorts',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      features: ['Sales Analytics', 'Order Tracking', 'Customer Cohorts', 'Inventory Insights']
    },
    {
      title: 'Agencies',
      description: 'Automate client reporting and custom dashboards',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      features: ['Client Dashboards', 'Automated Reports', 'Multi-Client Views', 'White-label Options']
    }
  ];

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
      color: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      step: "3",
      title: "Scale Your Growth",
      description: "Upgrade to a custom build with alerts, analytics, and AI insights",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      delay: 0.3
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
        />
        <div className="absolute inset-0">
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
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"
          />
        </div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <Brain className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                OpsSight
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Problems', href: '#problems' },
                { name: 'Process', href: '#process' },
                { name: 'Services', href: '#services' },
                { name: 'About', href: '#about' }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative group cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/demo')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                📊 See Examples
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                🚀 Try Dashboard
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                🚀 Get Free Pilot
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={heroInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-8 border border-blue-200 dark:border-blue-800"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                </motion.div>
Custom AI-Powered Dashboards for SaaS, E-commerce & Agencies
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
              >
                Custom Dashboards
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                >
                  That Drive Growth
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                I build AI-powered dashboards & growth tools tailored to your business. Stop guessing, start growing with data-driven insights.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl flex items-center space-x-3 group"
              >
                <Rocket className="h-5 w-5 group-hover:animate-bounce" />
                <span>🚀 Book Free Pilot Build</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300"
                >
                  <Play className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                </motion.div>
                <span className="text-lg font-medium">📊 See Example Dashboards</span>
              </motion.button>
            </motion.div>

            {/* Pilot Client CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 max-w-4xl mx-auto border border-blue-200 dark:border-blue-800"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={heroInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  🚀 Currently looking for 3 pilot clients!
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Early clients get a free dashboard build
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Be the first to experience custom AI-powered dashboards tailored to your business
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/auth/signup')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Be the first – Apply for Pilot Build
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section ref={problemsRef} id="problems" className="py-24 bg-gradient-to-b from-transparent to-red-50 dark:to-red-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={problemsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={problemsInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mb-6"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Are These Your Struggles?
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Common Business
              <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Pain Points
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Most businesses face these challenges. Custom dashboards solve them all.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={problemsInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <item.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {item.problem}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section ref={processRef} id="process" className="py-24 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={processInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6"
            >
              <Rocket className="h-4 w-4 mr-2" />
              How We Work Together
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              In 3 Simple Steps
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                To Your Custom Dashboard
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From initial call to deployed dashboard. No complex setup, no technical headaches.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={processInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.8, delay: item.delay }}
                className="relative text-center"
              >
                {/* Connection Line */}
                {index < 2 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={processInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: item.delay + 0.3 }}
                    className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-x-1/2 z-0"
                  />
                )}

                <motion.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <item.icon className="h-10 w-10 text-white" />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={processInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: item.delay + 0.2, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  >
                    {item.step}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/auth/signup')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl flex items-center space-x-3 mx-auto group"
            >
              <Rocket className="h-6 w-6 group-hover:animate-bounce" />
              <span>Start Free Pilot Build</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
              Free pilot dashboard in 2-3 days • No technical knowledge required
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={servicesInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Choose Your Path
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Service Packages
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                For Every Need
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From free pilot builds to full custom solutions. Transparent pricing, no hidden fees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={servicesInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.8, delay: service.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${service.color} ${
                  service.popular ? 'ring-4 ring-blue-500/20' : ''
                }`}
              >
                {service.popular && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={servicesInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: service.delay + 0.3, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg">
                      <Crown className="h-4 w-4 inline mr-1" />
                      Most Popular
                    </div>
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{service.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">{service.price}</span>
                    {service.period !== 'one-time' && (
                      <span className="text-gray-600 dark:text-gray-400">/{service.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={servicesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: service.delay + 0.1 + featureIndex * 0.05 }}
                      className="flex items-center space-x-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      </motion.div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/auth/signup')}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                    service.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {service.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section ref={useCasesRef} id="use-cases" className="py-24 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={useCasesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={useCasesInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6"
            >
              <Users className="h-4 w-4 mr-2" />
              Who I Work With
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Perfect For
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                These Businesses
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Custom dashboards tailored to your industry and business model.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={useCasesInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 bg-gradient-to-br ${useCase.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <useCase.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {useCase.description}
                </p>
                <div className="space-y-2">
                  {useCase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section ref={aboutRef} id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={aboutInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6"
            >
              <Code className="h-4 w-4 mr-2" />
              About the Builder
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm Darshit 👋
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              I specialize in building AI-powered dashboards & SaaS tools. With experience in Next.js, Node.js, microservices, and analytics, I help businesses unlock growth with real-time insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Code, label: 'Next.js & React' },
                    { icon: Database, label: 'Node.js & APIs' },
                    { icon: BarChart3, label: 'Data Analytics' },
                    { icon: Brain, label: 'AI Integration' }
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                    >
                      <skill.icon className="h-6 w-6 text-blue-600" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-blue-200 dark:border-blue-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Let's Connect</h3>
                <div className="space-y-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://github.com/Darshh09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Github className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    <span className="text-gray-700 dark:text-gray-300">GitHub Portfolio</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://linkedin.com/in/darshitshukla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Linkedin className="h-6 w-6 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">LinkedIn Profile</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="mailto:darshitshukla1777@gmail.com"
                    className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Mail className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300">darshitshukla1777@gmail.com</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Try the Dashboard Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6"
            >
              <Play className="h-4 w-4 mr-2" />
              Interactive Demo
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Experience the Full
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Dashboard Platform
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Experience the actual dashboard with real data and features. Navigate through all sections, explore analytics, and see the pilot version in action.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/dashboard')}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-2xl flex items-center space-x-3 mx-auto group"
            >
              <Play className="h-6 w-6 group-hover:animate-pulse" />
              <span>Try Live Dashboard</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Dashboard Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                title: 'Real-time Analytics',
                description: 'Live data updates and KPIs',
                icon: BarChart3,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'AI-Powered Insights',
                description: 'Smart recommendations and predictions',
                icon: Brain,
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Custom Reports',
                description: 'Export and schedule reports',
                icon: TrendingUp,
                color: 'from-green-500 to-emerald-500'
              },
              {
                title: 'Team Collaboration',
                description: 'Share and collaborate with your team',
                icon: Users,
                color: 'from-orange-500 to-red-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
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
              className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 border border-white/30"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Ready to Transform Your SaaS?
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
                onClick={() => router.push('/dashboard')}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center space-x-3 group"
              >
                <Play className="h-6 w-6" />
                <span>Try Live Dashboard</span>
              </motion.button>
            </div>

            <p className="text-white/80 text-sm mt-6">
              Try the live dashboard • Experience real features • Get your custom build
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 mb-6 cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                >
                  <Brain className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold">OpsSight</span>
              </motion.div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Custom AI-powered dashboards & growth tools tailored to your business. Built by Darshit.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-3 text-gray-400">
                {['Services', 'Process', 'About', 'Contact'].map((item, index) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5, color: "#ffffff" }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3 text-gray-400">
                {['Pilot Build', 'Custom Dashboard', 'Ongoing Support', 'Consulting'].map((item, index) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5, color: "#ffffff" }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href="#services" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <Mail className="h-4 w-4" />
                        <span>darshitshukla1777@gmail.com</span>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <Phone className="h-4 w-4" />
                  <span>+91 9131371800</span>
                </motion.li>
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          >
                    <p>&copy; 2024 Darshit Shukla. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      {/* Dashboard Preview Modal */}
      {showDashboardPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowDashboardPreview(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl max-h-[95vh] overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <FullDashboardPreview />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowDashboardPreview(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg z-20"
              aria-label="Close dashboard preview"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
