'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Sun, Zap, Leaf, TrendingUp, Award, 
  ChevronRight, Sparkles
} from 'lucide-react'
import energyAnimation from '@/json/energy.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const energyStats = [
  { icon: Leaf, value: '2M+', label: 'Trees Planted', color: 'from-green-400 to-emerald-500' },
  { icon: Sun, value: '50 MW', label: 'Solar Projects', color: 'from-yellow-400 to-orange-500' },
]

const energyTypes = [
  {
    title: 'Reforestation Programs',
    subtitle: 'Building Green Lungs',
    description: 'Planting millions of saplings across regions to combat climate change and restore natural habitats. Our comprehensive tree-planting initiatives create sustainable forests for future generations.',
    icon: Leaf,
    gradient: 'from-green-400 via-emerald-500 to-teal-500',
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
    features: [
      'Educational Programs',
      'Green Infrastructure',
      'Circular Economy',
      'Zero-Waste Goals',
    ],
  },
]

export default function RenewableEnergyHub() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-yellow-200/30 to-orange-300/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-cyan-300/30 rounded-full blur-3xl"
        />
        
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
        <div className="grid grid-cols-2  gap-6 mb-20">
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

        {/* Integrated Content with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl mb-20"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf24_1px,transparent_1px),linear-gradient(to_bottom,#fbbf24_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12">
            {/* Left: Lottie Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                {/* Animated Background Gradient */}
                <motion.div
                  animate={{
                    background: [
                      'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                      'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                      'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                      'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                    ],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0"
                />
                
                {/* Lottie Animation Container */}
                <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm rounded-xl flex items-center justify-center p-8">
                  <div className="w-full h-full relative">
                    <Lottie
                      animationData={energyAnimation}
                      loop={true}
                      className="w-full h-full drop-shadow-2xl"
                      style={{
                        filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.5))',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Three Initiatives Combined */}
            <div className="text-white space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="mb-8"
              >
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                  Sustainable Future Initiatives
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Combining reforestation, solar energy, and sustainable development for a greener tomorrow
                </p>
              </motion.div>

              {/* Three Initiatives */}
              <div className="space-y-6">
                {energyTypes.map((type, index) => {
                  const Icon = type.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.15 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xl font-bold mb-1">{type.title}</h4>
                          <p className="text-sm text-gray-400 mb-3">{type.subtitle}</p>
                          <p className="text-sm text-gray-300 leading-relaxed mb-4">{type.description}</p>

                          

                          {/* Features */}
                          <div className="grid grid-cols-2 gap-2">
                            {type.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${type.gradient}`} />
                                <span className="text-xs text-gray-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
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
