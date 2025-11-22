'use client'

import { useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    title: 'Solar Panels',
    subtitle: 'Renewable Energy Solutions',
    description: 'High‑efficiency solar systems to cut energy costs for homes, buildings, and businesses.',
    image: '/images/solarpark-limbach-dorf-Xpert.Digital-png.png',
  },
  {
    id: 2,
    title: 'Factory Energy Panels',
    subtitle: 'Industrial Efficiency',
    description: 'Integrated energy and automation for production lines to reduce consumption and boost uptime.',
    image: '/images/c2_up6Glpn.jpg',
  },
  {
    id: 3,
    title: 'Artificial Intelligence',
    subtitle: 'Smart Automation',
    description: 'Analytics and computer vision that improve decisions, quality, and speed across operations.',
    image: '/images/1_bigstock-Ai-Car-Fix-Technology-Ai-Fix-471835423.jpg',
  },
  {
    id: 4,
    title: 'Investment & Finance',
    subtitle: 'Sustainable Growth',
    description: 'Portfolio management and project financing focused on stable returns and long‑term value.',
    image: '/images/IMG_Mst_Invest_Wealth_Manage.jpg',
  },
  {
    id: 5,
    title: 'BYD Automotive Business',
    subtitle: 'Clean Mobility',
    description: 'Sales and after‑sales services for BYD EVs, delivering reliable and eco‑friendly transport.',
    image: '/images/1053127.jpg',
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Memoize slides to prevent unnecessary re-renders
  const memoizedSlides = useMemo(() => slides, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000) // Longer interval for subtle transitions

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images Layer - Smooth Crossfade */}
      <div className="absolute inset-0">
        {memoizedSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={false}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.05,
            }}
            transition={{
              opacity: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
              scale: { duration: 8, ease: "linear" },
            }}
            className="absolute inset-0"
            style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
          >
            {/* Background Image with Ken Burns Effect - Using Next Image for optimization */}
            <motion.div
              animate={{
                scale: index === currentSlide ? [1, 1.08] : 1,
              }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                quality={85}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          
          {/* Optimized Particle Effect - Reduced count for better performance */}
          <div className="absolute inset-0 opacity-30 hidden md:block">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          </motion.div>
        ))}
      </div>

      {/* Content Layer - Always on Top */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex items-center"
        >
          <div className="max-w-3xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-3 sm:mb-4"
            >
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/90 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-semibold">
                {memoizedSlides[currentSlide].subtitle}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight"
            >
              {memoizedSlides[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed"
            >
              {memoizedSlides[currentSlide].description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#domains"
                className="px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Explore Our Domains
              </a>
              <a
                href="/contact"
                className="px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-semibold transition-all text-sm sm:text-base"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Mobile: bottom, Desktop: sides */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 bottom-4 sm:bottom-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white transition-all flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute left-14 sm:left-20 md:left-auto md:right-8 bottom-4 sm:bottom-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white transition-all flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators - Mobile optimized */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
        {memoizedSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-6 sm:w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-8 z-20 text-white/70 hidden lg:block"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white/70 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
