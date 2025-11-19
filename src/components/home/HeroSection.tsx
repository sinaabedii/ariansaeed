'use client'

import { useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    title: 'Arian Saeed Group',
    subtitle: 'Global Expertise In Production And Supply',
    description: 'We produce everything with Western European technology, especially Germany, offering the best wood fiber compressed products at the highest quality level in the world',
    image: '/images/1.jpg',
  },
  {
    id: 2,
    title: '7,000 Years of Heritage',
    subtitle: 'The History of Carpentry in Iran',
    description: 'The history of carpentry and joinery in Iran dates back to seven thousand years ago, the first recorded industry that is significant and valuable for all of us',
    image: '/images/2.jpg',
  },
  {
    id: 3,
    title: 'Export Excellence',
    subtitle: 'Serving Global Markets',
    description: 'Everything that Sina MDF produces has desirable, healthy and world-class characteristics for international customers',
    image: '/images/3.jpg',
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
          className="relative z-10 container mx-auto px-4 h-full flex items-center"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-primary/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                {memoizedSlides[currentSlide].subtitle}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight"
            >
              {memoizedSlides[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-white/90 mb-8 leading-relaxed"
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
                className="px-8 py-4 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Our Domains
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-semibold transition-all"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white transition-all flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white transition-all flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {memoizedSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
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
