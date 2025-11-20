'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Sun, Zap, Battery, TrendingUp, Leaf, Award, ChevronRight, Sparkles } from 'lucide-react'

const energyStats = [
  { icon: Sun, value: '500+', label: 'MW Solar Capacity', color: 'from-yellow-400 to-orange-500' },
  { icon: Battery, value: '98%', label: 'Efficiency Rate', color: 'from-green-400 to-emerald-600' },
  { icon: TrendingUp, value: '250K+', label: 'Tons CO₂ Reduced', color: 'from-blue-400 to-cyan-500' },
  { icon: Award, value: '15+', label: 'Industry Awards', color: 'from-purple-400 to-pink-500' },
]

const solarFeatures = [
  {
    title: 'Advanced Photovoltaic Technology',
    description: 'Cutting-edge monocrystalline and polycrystalline solar cells with industry-leading conversion efficiency up to 22.8%',
    icon: Sparkles,
    gradient: 'from-amber-500 via-orange-500 to-red-500',
  },
  {
    title: 'Smart Energy Management',
    description: 'AI-powered systems that optimize energy production, storage, and distribution in real-time',
    icon: Zap,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
  },
  {
    title: 'Sustainable Manufacturing',
    description: 'Carbon-neutral production facilities using renewable energy and eco-friendly materials',
    icon: Leaf,
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
  },
]

export default function RenewableEnergySection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-yellow-200/30 to-orange-300/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-cyan-300/30 rounded-full blur-3xl"
        />
        
        {/* Floating Solar Panel Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="grid grid-cols-8 md:grid-cols-12 gap-4 h-full p-8">
            {Array.from({ length: 96 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-sm"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full mb-6 border border-yellow-500/30"
          >
            <Sun className="w-5 h-5 text-yellow-600 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-yellow-700 to-orange-700 bg-clip-text text-transparent">
              Renewable Energy Innovation
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Solar Energy
            </span>
            <br />
            <span className="text-gray-900">Pioneers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Leading the revolution in photovoltaic technology with advanced solar cells,
            sustainable energy solutions, and smart power management systems
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
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                  }}
                />
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

        {/* Solar Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {solarFeatures.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredCard === index
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group cursor-pointer"
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0.6 : 0,
                    scale: isHovered ? 1.1 : 1,
                  }}
                  className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-2xl transition-all duration-500`}
                />
                
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  {/* Icon Container with Animated Background */}
                  <div className="relative mb-6">
                    <motion.div
                      animate={{
                        rotate: isHovered ? 360 : 0,
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.8 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    {/* Orbiting Dots */}
                    {isHovered && (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className={`w-24 h-24 border-2 border-dashed rounded-full opacity-30 bg-gradient-to-r ${feature.gradient}`} />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className={`w-32 h-32 border border-dotted rounded-full opacity-20 bg-gradient-to-r ${feature.gradient}`} />
                        </motion.div>
                      </>
                    )}
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text"
                    style={{
                      backgroundImage: isHovered ? `linear-gradient(to right, var(--tw-gradient-stops))` : undefined,
                    }}
                  >
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                      Learn More
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Solar Cell Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf24_1px,transparent_1px),linear-gradient(to_bottom,#fbbf24_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Solar Cell Grid Animation */}
              <div className="relative">
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? {
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1, 0.8],
                      } : {}}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="aspect-square bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-lg shadow-lg"
                      style={{
                        boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
                      }}
                    >
                      <div className="w-full h-full bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white opacity-60" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Energy Flow Lines */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute -right-4 top-1/2 transform -translate-y-1/2"
                >
                  <div className="flex flex-col gap-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          x: [0, 20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="h-1 w-12 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: Content */}
              <div className="text-white space-y-6">
                <h3 className="text-4xl md:text-5xl font-heading font-bold">
                  Next-Generation
                  <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    Solar Cell Technology
                  </span>
                </h3>

                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Maximum Efficiency</h4>
                      <p className="text-sm">Advanced monocrystalline silicon with anti-reflective coating and optimized light absorption</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Battery className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Long-lasting Performance</h4>
                      <p className="text-sm">25+ year warranty with minimal degradation and consistent power output</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Eco-Friendly Manufacturing</h4>
                      <p className="text-sm">Sustainable production with recycled materials and zero carbon emissions</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
                >
                  <span>Explore Our Solar Solutions</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
