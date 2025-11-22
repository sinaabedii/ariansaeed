'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Sun, Zap, Battery, Wind, Droplets, Leaf, TrendingUp, Award, 
  ChevronRight, Sparkles, Activity, ThermometerSun, Factory
} from 'lucide-react'
import energyAnimation from '@/json/energy.json'

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const energyStats = [
  { icon: Leaf, value: '2M+', label: 'Trees Planted', color: 'from-green-400 to-emerald-500' },
  { icon: Sun, value: '50+', label: 'Solar Projects', color: 'from-yellow-400 to-orange-500' },
  { icon: Sparkles, value: '250K+', label: 'Tons CO₂ Saved', color: 'from-teal-400 to-cyan-500' },
  { icon: TrendingUp, value: '100+', label: 'Green Initiatives', color: 'from-blue-400 to-green-500' },
]

const energyTypes = [
  {
    title: 'Reforestation Programs',
    subtitle: 'Building Green Lungs',
    description: 'Planting millions of saplings across regions to combat climate change and restore natural habitats. Our comprehensive tree-planting initiatives create sustainable forests for future generations.',
    icon: Leaf,
    gradient: 'from-green-400 via-emerald-500 to-teal-500',
    stats: { trees: '2M+', area: '5,000+ hectares', survival: '92%' },
    features: [
      'Native Species Focus',
      'Community Involvement',
      'Long-term Monitoring',
      'Carbon Offset Certified',
    ],
  },
  {
    title: 'Solar Power Projects',
    subtitle: 'Clean Energy Generation',
    description: 'Developing large-scale solar installations and rooftop solutions for homes and businesses. Our solar projects deliver reliable clean energy while reducing carbon footprint.',
    icon: Sun,
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    stats: { projects: '50+', capacity: '100+ MW', homes: '20,000+' },
    features: [
      'Residential & Commercial',
      'Grid-Tied Systems',
      'Energy Independence',
      'Cost-Effective Solutions',
    ],
  },
  {
    title: 'Sustainable Development',
    subtitle: 'Green Future Vision',
    description: 'Comprehensive environmental programs combining renewable energy, reforestation, and community education to build a sustainable future for all.',
    icon: Sparkles,
    gradient: 'from-blue-400 via-green-500 to-emerald-500',
    stats: { initiatives: '100+', communities: '50+', impact: 'National' },
    features: [
      'Educational Programs',
      'Green Infrastructure',
      'Circular Economy',
      'Zero-Waste Goals',
    ],
  },
]

const technologies = [
  {
    icon: Leaf,
    title: 'Tree Planting',
    description: 'Large-scale reforestation with native species',
    stat: '2M+',
    label: 'Saplings Planted',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Sun,
    title: 'Solar Projects',
    description: 'Clean energy installations across communities',
    stat: '50+',
    label: 'Active Projects',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Sparkles,
    title: 'Carbon Offsetting',
    description: 'Reducing environmental impact through green initiatives',
    stat: '250K+',
    label: 'Tons CO₂ Saved',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    title: 'Green Growth',
    description: 'Sustainable expansion with environmental focus',
    stat: '100+',
    label: 'Eco Initiatives',
    color: 'from-blue-500 to-green-500',
  },
]

export default function RenewableEnergyHub() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeType, setActiveType] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-yellow-200/30 to-orange-300/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-cyan-300/30 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500/20 via-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-full mb-6 border border-green-500/30"
          >
            <Zap className="w-5 h-5 text-green-600 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 bg-clip-text text-transparent">
              Green Future Initiatives
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Green Future
            </span>
            <br />
            <span className="text-gray-900">Building Tomorrow</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Creating a sustainable future through massive reforestation, solar energy projects, and environmental initiatives
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {energyStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl`} />
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Energy Types Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {energyTypes.map((type, index) => {
              const Icon = type.icon
              const isActive = activeType === index
              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveType(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-full font-semibold transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg`
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{type.title}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Active Energy Type Content */}
          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl"
          >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf24_1px,transparent_1px),linear-gradient(to_bottom,#fbbf24_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Visual with Lottie Animation */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    animate={{
                      background: [
                        'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                        'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                        'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                        'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                      ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0"
                  />
                  
                  {/* Lottie Animation Container */}
                  <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm rounded-xl flex items-center justify-center p-8">
                    <div className="w-full h-full relative">
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${energyTypes[activeType].gradient} opacity-20 blur-3xl animate-pulse`} />
                      
                      {/* Lottie Animation */}
                      <Lottie
                        animationData={energyAnimation}
                        loop={true}
                        className="w-full h-full drop-shadow-2xl"
                        style={{
                          filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.5))',
                        }}
                      />
                      
                      {/* Overlay Icon for Visual Enhancement */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        {React.createElement(energyTypes[activeType].icon, {
                          className: 'w-24 h-24 md:w-32 md:h-32 text-white/20',
                          strokeWidth: 1,
                        })}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Overlay */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                  {Object.entries(energyTypes[activeType].stats).map(([key, value], idx) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="bg-white rounded-xl px-4 py-2 shadow-lg"
                    >
                      <div className="text-xs text-gray-500 uppercase">{key}</div>
                      <div className="text-lg font-bold text-gray-900">{value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Content */}
              <div className="text-white space-y-6 mt-12 md:mt-0">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2"
                  >
                    {energyTypes[activeType].subtitle}
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-heading font-bold mb-4"
                  >
                    {energyTypes[activeType].title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    {energyTypes[activeType].description}
                  </motion.p>
                </div>

                {/* Features List */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {energyTypes[activeType].features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${energyTypes[activeType].gradient}`} />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-6 px-8 py-4 bg-gradient-to-r ${energyTypes[activeType].gradient} rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group`}
                >
                  <span>Explore Solutions</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Green Impact
            </h3>
            <p className="text-lg text-gray-600">
              Measurable environmental achievements building a sustainable tomorrow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`} />
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${tech.color} mb-4 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {tech.title}
                    </h4>

                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {tech.description}
                    </p>

                    <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                      <div>
                        <div className={`text-2xl font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                          {tech.stat}
                        </div>
                        <div className="text-xs text-gray-500">{tech.label}</div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-2 h-2 rounded-full bg-gradient-to-br ${tech.color}`}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Leaf className="w-8 h-8" />
                <TrendingUp className="w-8 h-8" />
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Join Our Green Future Movement
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Together we plant trees, generate clean solar energy, and build a sustainable world for future generations.
              </p>
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-green-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Request Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
                >
                  Download Brochure
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
