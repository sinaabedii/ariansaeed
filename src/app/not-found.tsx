'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Lock body scroll
    document.body.style.overflow = 'hidden'
    
    return () => {
      // Unlock body scroll on unmount
      document.body.style.overflow = ''
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const quickLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About Us', href: '/about', icon: FileQuestion },
    { name: 'Contact', href: '/contact', icon: Search },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 md:w-80 md:h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[600px] md:h-[600px] bg-gradient-to-br from-primary/3 to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full mx-auto relative z-10"
      >
        <div className="text-center space-y-6 md:space-y-8">
          {/* Icon */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center justify-center"
          >
            <div className="relative">
              {/* Animated Background Circles */}
              <motion.div
                className="absolute inset-0 -m-8 md:-m-12"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-2xl" />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 -m-4 md:-m-6"
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [90, 0, 90],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 to-primary/10 rounded-full blur-xl" />
              </motion.div>

              {/* Main Icon */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 p-6 md:p-8"
              >
                <FileQuestion 
                  className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-primary" 
                  strokeWidth={1.5}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* 404 Text with Gradient */}
          <motion.div variants={itemVariants} className="space-y-3 md:space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold">
              <span className="bg-gradient-to-r from-primary via-primary-600 to-primary-700 bg-clip-text text-transparent drop-shadow-sm">
                404
              </span>
            </h1>
            <div className="h-1 w-20 md:w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
          </motion.div>

          {/* Error Message */}
          <motion.div variants={itemVariants} className="space-y-2 md:space-y-3 px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Oops! Page Not Found
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              The page you&apos;re looking for seems to have wandered off. Let&apos;s get you back on track!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-gradient-to-r from-primary to-primary-600 text-white rounded-full font-semibold text-sm md:text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                <span>Back to Home</span>
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-white text-primary border-2 border-primary/20 rounded-full font-semibold text-sm md:text-base hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Contact Us</span>
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="pt-6 md:pt-8 px-4">
            <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 font-medium">
              Quick Links
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group px-3 md:px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 flex items-center gap-1.5 md:gap-2 shadow-sm hover:shadow"
                    >
                      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500 group-hover:text-primary transition-colors" />
                      <span className="text-xs md:text-sm text-gray-700 group-hover:text-primary font-medium transition-colors">
                        {link.name}
                      </span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.div>

          {/* Footer Message */}
          <motion.div variants={itemVariants} className="pt-4 md:pt-6 px-4">
            <p className="text-xs md:text-sm text-gray-400">
              Error Code: 404 | Arian Saeed Industrial Group
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 md:left-20 w-2 h-2 md:w-3 md:h-3 bg-primary/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 md:right-32 w-2 h-2 md:w-3 md:h-3 bg-primary/30 rounded-full"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-10 md:right-20 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  )
}
