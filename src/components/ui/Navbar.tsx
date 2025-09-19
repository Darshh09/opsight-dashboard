'use client';

import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  IconBrain,
  IconMenu2,
  IconX,
  IconChartBar,
  IconRocket,
  IconEye,
  IconUser,
  IconChevronDown,
  IconArrowRight
} from '@tabler/icons-react';
import AnimatedButton from './AnimatedButton';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Update scrolled state based on scroll position
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  const navItems = [
    { name: 'Problems', href: '#problems', icon: IconChartBar },
    { name: 'Process', href: '#process', icon: IconRocket },
    { name: 'Services', href: '#services', icon: IconUser },
    { name: 'About', href: '#about', icon: IconUser }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <IconBrain className="h-6 w-6 text-white" />
            </motion.div>
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              OpsSight
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 relative group"
              >
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{item.name}</span>
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
         {/*  <div className="hidden lg:flex items-center space-x-4">
            <AnimatedButton
              onClick={() => router.push('/demo')}
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <IconEye className="h-4 w-4" />
              <span>See Examples</span>
            </AnimatedButton>

            <AnimatedButton
              onClick={() => router.push('/dashboard')}
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
            >
              <IconRocket className="h-4 w-4" />
              <span>Try Dashboard</span>
            </AnimatedButton>

            <AnimatedButton
              onClick={() => router.push('/auth/signup')}
              variant="gradient"
              size="md"
            >
              <IconRocket className="h-4 w-4" />
              <span>Get Free Pilot</span>
              <IconArrowRight className="h-4 w-4" />
            </AnimatedButton>
          </div> */}

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-800/50"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{item.name}</span>
                <IconChevronDown className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            ))}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
             {/*  <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  y: isOpen ? 0 : 20
                }}
                transition={{ delay: 0.4 }}
              >
                <AnimatedButton
                  onClick={() => router.push('/demo')}
                  variant="ghost"
                  size="md"
                  className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <IconEye className="h-5 w-5" />
                  <span>See Examples</span>
                </AnimatedButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  y: isOpen ? 0 : 20
                }}
                transition={{ delay: 0.5 }}
              >
                <AnimatedButton
                  onClick={() => router.push('/dashboard')}
                  variant="ghost"
                  size="md"
                  className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                >
                  <IconRocket className="h-5 w-5" />
                  <span>Try Dashboard</span>
                </AnimatedButton>
              </motion.div> */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  y: isOpen ? 0 : 20
                }}
                transition={{ delay: 0.6 }}
              >
                <AnimatedButton
                  onClick={() => router.push('/auth/signup')}
                  variant="gradient"
                  size="md"
                  className="w-full"
                >
                  <IconRocket className="h-5 w-5" />
                  <span>Get Free Pilot</span>
                  <IconArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
