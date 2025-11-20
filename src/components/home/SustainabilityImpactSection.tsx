'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { 
  Leaf, 
  Droplets, 
  Zap, 
  Recycle, 
  Award,
  TrendingDown,
  Trees,
  Wind,
  Factory
} from 'lucide-react'

// Animated Counter Component
function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix
      }
    })
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

// Circular Progress Meter Component
function CircularMeter({ 
  percentage, 
  label, 
  icon: Icon, 
  color,
  delay = 0 
}: { 
  percentage: number
  label: string
  icon: any
  color: string
  delay?: number
}) {
  const circumference = 2 * Math.PI * 70
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setIsVisible(true), delay)
    }
  }, [isInView, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-40 h-40 mb-4">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            className="fill-none stroke-white/10"
            strokeWidth="12"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            className={`fill-none ${color}`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset: isVisible ? circumference - (percentage / 100) * circumference : circumference 
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className={`w-8 h-8 mb-2 ${color.replace('stroke-', 'text-')}`} />
          <span className="text-3xl font-bold text-white">
            {isVisible ? percentage : 0}%
          </span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-white text-center">{label}</h3>
    </motion.div>
  )
}

// Certification Badge Component
function CertificationBadge({ 
  name, 
  year, 
  icon: Icon,
  delay = 0 
}: { 
  name: string
  year: string
  icon: any
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-[#76193A]/50 transition-all duration-300">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#76193A]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#76193A] to-[#a02952] flex items-center justify-center">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-white font-semibold text-sm">{name}</h4>
          <p className="text-white/60 text-xs">{year}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Impact Stat Card
function ImpactStatCard({ 
  value, 
  unit,
  label, 
  icon: Icon,
  trend,
  delay = 0 
}: { 
  value: number
  unit: string
  label: string
  icon: any
  trend: number
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="group"
    >
      <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#76193A]/50 transition-all duration-300 h-full">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#76193A]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#76193A] to-[#a02952] flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm font-semibold">{trend}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-white">
                <AnimatedCounter value={value} />
              </span>
              <span className="text-xl text-white/60">{unit}</span>
            </div>
            <p className="text-white/70 text-sm">{label}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function SustainabilityImpactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const impactMeters = [
    { percentage: 87, label: 'Carbon Reduction', icon: Wind, color: 'stroke-green-500' },
    { percentage: 92, label: 'Water Conservation', icon: Droplets, color: 'stroke-blue-500' },
    { percentage: 78, label: 'Renewable Energy', icon: Zap, color: 'stroke-yellow-500' },
    { percentage: 95, label: 'Waste Recycling', icon: Recycle, color: 'stroke-purple-500' },
  ]

  const impactStats = [
    { value: 45000, unit: 'tons', label: 'CO₂ Emissions Reduced Annually', icon: Wind, trend: 23 },
    { value: 12500, unit: 'm³', label: 'Water Recycled Per Month', icon: Droplets, trend: 18 },
    { value: 8500, unit: 'MWh', label: 'Renewable Energy Generated', icon: Zap, trend: 31 },
    { value: 89, unit: '%', label: 'Industrial Waste Recycled', icon: Factory, trend: 15 },
  ]

  const certifications = [
    { name: 'ISO 14001', year: 'Certified 2020', icon: Award },
    { name: 'ISO 50001', year: 'Energy Management', icon: Zap },
    { name: 'Carbon Neutral', year: 'Target 2030', icon: Leaf },
    { name: 'Green Industry', year: 'Awarded 2022', icon: Trees },
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-[#1a0a14] to-slate-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-[#76193A]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-[#76193A]/20 px-4 py-2 rounded-full border border-green-500/30">
              <Leaf className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Sustainability Impact</span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Environmental
            <span className="block mt-2 bg-gradient-to-r from-green-400 via-emerald-400 to-[#76193A] bg-clip-text text-transparent">
              Commitment
            </span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Leading the industry with innovative sustainability practices and measurable environmental impact
          </p>
        </motion.div>

        {/* Circular Progress Meters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {impactMeters.map((meter, index) => (
            <CircularMeter
              key={meter.label}
              {...meter}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Impact Statistics */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold text-white mb-8 text-center"
          >
            Measurable Impact
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <ImpactStatCard
                key={stat.label}
                {...stat}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl font-bold text-white mb-8 text-center"
          >
            Environmental Certifications
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <CertificationBadge
                key={cert.name}
                {...cert}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h4 className="text-2xl font-bold text-white mb-3">
              Together Towards a Greener Future
            </h4>
            <p className="text-white/70 mb-6 max-w-2xl">
              Our commitment to sustainability isn&apos;t just a goal—it&apos;s a responsibility we take seriously every single day
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25"
            >
              View Sustainability Report
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
