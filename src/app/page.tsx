'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, lazy, Suspense, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  IconBrain,
  IconChartBar,
  IconCheck,
  IconUsers,
  IconTrendingUp,
  IconPlayerPlay,
  IconMail,
  IconPhone,
  IconRocket,
  IconCurrencyDollar,
  IconBrandGithub,
  IconBrandLinkedin,
  IconExternalLink,
  IconCode,
  IconDatabase,
  IconX,
  IconCrown,
  IconTrendingDown,
  IconClock,
  IconAlertTriangle
} from '@tabler/icons-react';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import AdvancedNavbar from '@/components/ui/AdvancedNavbar';
import ModernButton from '@/components/ui/ModernButton';
import { HoverBorderGradient } from '@/components/ui/HoverBorderGradient';
import { AceternityLogo } from '@/components/ui/AceternityLogo';
import { HoverEffect } from '@/components/ui/HoverEffect';
import { InfiniteMovingCards } from '@/components/ui/InfiniteMovingCards';
import HeroSection from '@/components/sections/HeroSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CompetitiveAdvantages from '@/components/sections/CompetitiveAdvantages';

// Lazy load heavy components
const FullDashboardPreview = lazy(() => import('@/components/demos/FullDashboardPreview'));

export default function LandingPage() {
  const router = useRouter();
  const [showDashboardPreview, setShowDashboardPreview] = useState(false);
  const { scrollYProgress } = useScroll();
  const servicesRef = useRef(null);
  const useCasesRef = useRef(null);
  const aboutRef = useRef(null);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Opsight",
    "description": "AI-powered business analytics dashboard that transforms your business data into actionable insights with real-time KPIs, custom visualizations, and automated reporting.",
    "url": "https://opsight.darshitdev.in",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free pilot dashboard delivered in 48 hours"
    },
    "creator": {
      "@type": "Person",
      "name": "Darshit Shukla",
      "url": "https://opsight.darshitdev.in"
    },
    "featureList": [
      "Real-time business analytics",
      "AI-powered insights",
      "Custom dashboard development",
      "Stripe analytics integration",
      "HubSpot integration",
      "Google Analytics dashboard",
      "Automated reporting",
      "KPI monitoring",
      "Data visualization",
      "Business intelligence"
    ],
    "screenshot": "https://opsight.darshitdev.in/og-image.png",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  const servicesInView = useInView(servicesRef, { once: true });
  const useCasesInView = useInView(useCasesRef, { once: true });
  const aboutInView = useInView(aboutRef, { once: true });

  // Removed unused parallax transforms

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
      color: 'border-gray-700',
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
      color: 'border-blue-400 ring-2 ring-blue-400',
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
      color: 'border-purple-400',
      delay: 0.3
    }
  ];

  const useCases = [
    {
      title: 'SaaS Startups',
      description: 'Track MRR, churn, payments, and growth metrics',
      icon: IconTrendingUp,
      color: 'from-blue-500 to-cyan-500',
      features: ['MRR Tracking', 'Churn Analysis', 'Payment Monitoring', 'Growth Metrics']
    },
    {
      title: 'E-Commerce',
      description: 'Monitor product sales, failed orders, and customer cohorts',
      icon: IconChartBar,
      color: 'from-green-500 to-emerald-500',
      features: ['Sales Analytics', 'Order Tracking', 'Customer Cohorts', 'Inventory Insights']
    },
    {
      title: 'Agencies',
      description: 'Automate client reporting and custom dashboards',
      icon: IconUsers,
      color: 'from-purple-500 to-pink-500',
      features: ['Client Dashboards', 'Automated Reports', 'Multi-Client Views', 'White-label Options']
    }
  ];

  const testimonials = [
    {
      quote: "Darshit built us a custom dashboard that unified all our analytics. We went from juggling 4 different tools to having everything in one place. Our team saves 10+ hours per week on reporting.",
      name: "Sarah Chen",
      title: "CEO, TechFlow SaaS"
    },
    {
      quote: "The AI insights are incredible. It actually explains why our churn spiked last month - it was a payment gateway issue in India. We fixed it within hours instead of weeks.",
      name: "Marcus Rodriguez",
      title: "Founder, GrowthLab"
    },
    {
      quote: "As an agency, we needed white-label dashboards for our clients. Darshit delivered exactly what we needed. Our clients love the professional look and real-time data.",
      name: "Emily Watson",
      title: "Director, Digital Marketing Pro"
    },
    {
      quote: "The free pilot was a game-changer. We could see the value immediately before committing. Darshit's approach is refreshing - no sales pressure, just results.",
      name: "David Kim",
      title: "CTO, E-commerce Plus"
    },
    {
      quote: "Finally, a dashboard that shows revenue, funnels, and traffic together. We can see the complete customer journey and make data-driven decisions. Worth every penny.",
      name: "Lisa Thompson",
      title: "VP Marketing, StartupXYZ"
    },
    {
      quote: "Darshit's technical expertise is unmatched. He integrated 6 different data sources seamlessly. The dashboard updates in real-time and never breaks.",
      name: "Alex Johnson",
      title: "Head of Analytics, DataCorp"
    },
    {
      quote: "The investor-ready reports are a lifesaver. We can generate professional PDFs in seconds for our board meetings. Our investors are impressed with the data quality.",
      name: "Rachel Green",
      title: "CFO, ScaleUp Ventures"
    },
    {
      quote: "We tried Tableau, Power BI, and Looker. None could do what Opsight does - unify everything with AI insights. Darshit solved our analytics fragmentation problem.",
      name: "Michael Brown",
      title: "Head of Product, CloudTech"
    }
  ];

  return (
    <main className="min-h-screen text-white overflow-hidden">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Navigation */}
      <AdvancedNavbar />

      {/* Hero Section */}
      <HeroSection scrollYProgress={scrollYProgress} />

      {/* SEO Content Section - Hidden but readable by search engines */}
      <section className="sr-only">
        <h2>About Opsight Business Analytics Dashboard</h2>
        <p>
          Opsight is a cutting-edge AI-powered business analytics dashboard designed to transform raw business data into actionable insights.
          Our platform specializes in creating custom analytics solutions for SaaS companies, e-commerce businesses, and enterprise organizations.
        </p>

        <h3>Key Features of Our Analytics Platform</h3>
        <ul>
          <li>Real-time KPI monitoring and business intelligence dashboards</li>
          <li>Custom data visualization and automated reporting systems</li>
          <li>Integration with popular business tools like Stripe, HubSpot, and Google Analytics</li>
          <li>AI-powered insights and predictive analytics for data-driven decision making</li>
          <li>Mobile-responsive dashboard design for on-the-go business monitoring</li>
          <li>Free pilot dashboard delivered within 48 hours of project initiation</li>
        </ul>

        <h3>Industries We Serve</h3>
        <p>
          Our business analytics solutions are perfect for SaaS startups, e-commerce platforms,
          enterprise companies, marketing agencies, and any business looking to leverage data for growth.
          We help businesses understand their customer behavior, track revenue metrics, monitor conversion rates,
          and optimize their operations through comprehensive data analysis.
        </p>

        <h3>Why Choose Opsight for Your Business Analytics Needs</h3>
        <p>
          Unlike generic dashboard tools, Opsight provides personalized analytics solutions tailored to your specific business requirements.
          Our team of data scientists and business intelligence experts work closely with you to understand your unique challenges
          and create dashboards that provide meaningful insights for your business growth.
        </p>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-24">
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
              className="inline-flex items-center px-4 py-2 bg-red-900/20 text-red-300 rounded-full text-sm font-medium mb-6"
            >
              <IconX className="h-4 w-4 mr-2" />
              Are These Your Struggles?
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Stop Losing Money on
              <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Hidden Problems
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              These common issues cost businesses thousands every month. Don&apos;t let them drain your revenue.
            </p>
          </motion.div>

          <HoverEffect
            items={[
              {
                title: "Blind to Revenue Trends",
                description: "You don't know if your business is really growing or declining until it's too late → lose $$$",
                link: "#problems",
                icon: IconTrendingDown,
                color: "from-red-500 to-pink-500"
              },
              {
                title: "High Customer Churn",
                description: "Customers are leaving, but you don't know why or when",
                link: "#problems",
                icon: IconUsers,
                color: "from-orange-500 to-red-500"
              },
              {
                title: "Failed Payments",
                description: "You lose revenue from unnoticed failed transactions",
                link: "#problems",
                icon: IconX,
                color: "from-pink-500 to-rose-500"
              },
              {
                title: "No Growth Insights",
                description: "You're making decisions on gut feeling, not data",
                link: "#problems",
                icon: IconBrain,
                color: "from-purple-500 to-indigo-500"
              },
              {
                title: "Manual Reporting",
                description: "You waste hours creating reports instead of scaling",
                link: "#problems",
                icon: IconClock,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Reactive, Not Proactive",
                description: "You only find issues after they've hurt your business",
                link: "#problems",
                icon: IconAlertTriangle,
                color: "from-yellow-500 to-orange-500"
              }
            ]}
            className="max-w-7xl mx-auto"
          />
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* Competitive Advantages Section */}
      <CompetitiveAdvantages />

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
              className="inline-flex items-center px-4 py-2 bg-green-900/20 text-green-300 rounded-full text-sm font-medium mb-6"
            >
              <IconCurrencyDollar className="h-4 w-4 mr-2" />
              Choose Your Path
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Service Packages
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                For Every Need
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
                className={`relative  rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${service.color} ${
                  service.popular ? 'ring-4 ring-blue-400/20' : ''
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
                      <IconCrown className="h-4 w-4 inline mr-1" />
                      Most Popular
                    </div>
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-white">{service.price}</span>
                    {service.period !== 'one-time' && (
                      <span className="text-gray-400">/{service.period}</span>
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
                        <IconCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                      </motion.div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <ModernButton
                  onClick={() => router.push('/auth/signup')}
                  variant={service.popular ? 'gradient' : 'primary'}
                  size="lg"
                  className="w-full mt-6"
                  icon={service.popular ? <IconCrown className="h-5 w-5" /> : <IconRocket className="h-5 w-5" />}
                >
                  {service.cta}
                </ModernButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section ref={useCasesRef} id="use-cases" className="py-24 ">
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
              className="inline-flex items-center px-4 py-2 bg-blue-900/20 text-blue-300 rounded-full text-sm font-medium mb-6"
            >
              <IconUsers className="h-4 w-4 mr-2" />
              Who I Work With
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Perfect For
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                These Businesses
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Custom dashboards tailored to your industry and business model.
            </p>
          </motion.div>

          <HoverEffect
            items={useCases.map(useCase => ({
              title: useCase.title,
              description: useCase.description,
              link: "#use-cases",
              icon: useCase.icon,
              color: useCase.color,
              features: useCase.features
            }))}
            className="max-w-7xl mx-auto"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 ">
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
              className="inline-flex items-center px-4 py-2 bg-green-900/20 text-green-300 rounded-full text-sm font-medium mb-6"
            >
              <IconCheck className="h-4 w-4 mr-2" />
              Client Success Stories
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              What Our Clients
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real feedback from businesses that transformed their analytics with Opsight.
            </p>
          </motion.div>

          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="[--duration:60s]"
          />
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
              <IconCode className="h-4 w-4 mr-2" />
              About the Builder
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Hi, I&apos;m Darshit 👋
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
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
                <h3 className="text-2xl font-bold text-white">My Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: IconCode, label: 'Next.js & React' },
                    { icon: IconDatabase, label: 'Node.js & APIs' },
                    { icon: IconChartBar, label: 'Data Analytics' },
                    { icon: IconBrain, label: 'AI Integration' }
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-3 p-4 bg-gray-800 rounded-xl shadow-lg"
                    >
                      <skill.icon className="h-6 w-6 text-blue-600" />
                      <span className="text-gray-300 font-medium">{skill.label}</span>
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
              <div className=" rounded-3xl p-8 border border-blue-200 dark:border-blue-800">
                <h3 className="text-2xl font-bold text-white mb-4">Let&apos;s Connect</h3>
                <div className="space-y-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://github.com/Darshh09"
          target="_blank"
          rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <IconBrandGithub className="h-6 w-6 text-gray-300" />
                    <span className="text-gray-300">GitHub Portfolio</span>
                    <IconExternalLink className="h-4 w-4 text-gray-400" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://linkedin.com/in/darshitshukla"
          target="_blank"
          rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <IconBrandLinkedin className="h-6 w-6 text-blue-600" />
                    <span className="text-gray-300">LinkedIn Profile</span>
                    <IconExternalLink className="h-4 w-4 text-gray-400" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="mailto:darshitshukla1777@gmail.com"
                    className="flex items-center space-x-3 p-3 bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <IconMail className="h-6 w-6 text-green-600" />
                    <span className="text-gray-300">darshitshukla1777@gmail.com</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Try the Dashboard Section */}
      <section className="py-24 ">
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
              className="inline-flex items-center px-4 py-2 bg-green-900/20 text-green-300 rounded-full text-sm font-medium mb-6"
            >
              <IconPlayerPlay className="h-4 w-4 mr-2" />
              Interactive Demo
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Experience the Full
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Dashboard Platform
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Experience the actual dashboard with real data and features. Navigate through all sections, explore analytics, and see the pilot version in action.
            </p>

            <div className="m-8 flex justify-center text-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-black text-white flex items-center space-x-3 px-10 py-5 font-bold text-lg"
                onClick={() => router.push('/dashboard')}
              >
                <AceternityLogo />
                <span>Try Free Dashboard</span>
              </HoverBorderGradient>
            </div>
          </motion.div>

          {/* Dashboard Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                title: 'Real-time Analytics',
                description: 'Live data updates and KPIs',
                icon: IconChartBar,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'AI-Powered Insights',
                description: 'Smart recommendations and predictions',
                icon: IconBrain,
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Custom Reports',
                description: 'Export and schedule reports',
                icon: IconTrendingUp,
                color: 'from-green-500 to-emerald-500'
              },
              {
                title: 'Team Collaboration',
                description: 'Share and collaborate with your team',
                icon: IconUsers,
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
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 " />
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
              <IconRocket className="h-4 w-4 mr-2" />
              Ready to Transform Your SaaS?
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Let&apos;s Build Your
              <span className="block">Custom Dashboard 🚀</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Ready to transform your business with AI-powered insights? Let&apos;s start with a free pilot build.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <ModernButton
                onClick={() => router.push('/auth/signup')}
                variant="primary"
                size="lg"
                icon={<IconRocket className="h-6 w-6" />}
                className="font-bold"
              >
                Start Free Pilot
              </ModernButton>

              <ModernButton
                onClick={() => router.push('/dashboard')}
                variant="outline"
                size="lg"
                icon={<IconPlayerPlay className="h-6 w-6" />}
                className="font-bold"
              >
                Try Live Dashboard
              </ModernButton>
            </div>

            <p className="text-white/80 text-sm mt-6">
              Try the live dashboard • Experience real features • Get your custom build
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="text-white py-16">
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
                  <IconBrain className="h-6 w-6 text-white" />
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
                {['Services', 'Process', 'About', 'Contact'].map((item) => (
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
                {['Pilot Build', 'Custom Dashboard', 'Ongoing Support', 'Consulting'].map((item) => (
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
                  <IconMail className="h-4 w-4" />
                  <span>darshitshukla1777@gmail.com</span>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <IconPhone className="h-4 w-4" />
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
            <p>&copy; 2025 Darshit Shukla. All rights reserved.</p>
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
            <Suspense fallback={<LoadingSkeleton />}>
              <FullDashboardPreview />
            </Suspense>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowDashboardPreview(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg z-20"
              aria-label="Close dashboard preview"
            >
              <IconX className="h-6 w-6 text-gray-400" />
            </motion.button>
          </motion.div>
        </div>
      )}
    </main>
  );
}
