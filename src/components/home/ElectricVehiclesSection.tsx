'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import { 
  Car, Zap, Leaf, Battery, TrendingDown, Award, 
  Shield, Globe2, Sparkles, ChevronRight, Check,
  Gauge, Timer, Droplet
} from 'lucide-react'
import evAnimation from '@/json/Electric vehicle charging animation.json'

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const evStats = [
  { icon: Car, value: '500+', label: 'EVs Delivered', color: 'from-green-400 to-emerald-500' },
  { icon: Battery, value: '0', label: 'Emissions', color: 'from-blue-400 to-cyan-500', suffix: 'g/km' },
  { icon: Leaf, value: '85%', label: 'Less Pollution', color: 'from-teal-400 to-green-500' },
  { icon: TrendingDown, value: '60%', label: 'Lower Costs', color: 'from-amber-400 to-yellow-500' },
]

const vehicleTypes = [
  {
    title: 'Pure Electric (BEV)',
    subtitle: 'Zero Emissions Mobility',
    description: 'Fully electric vehicles powered by advanced lithium-ion batteries. Experience silent, smooth driving with zero tailpipe emissions and minimal maintenance.',
    icon: Zap,
    gradient: 'from-blue-400 via-cyan-500 to-teal-500',
    range: '400-600 km',
    charging: '30 min fast',
    features: [
      'Zero CO₂ Emissions',
      '400-600 km Range',
      'Fast Charging Ready',
      'Instant Torque',
    ],
  },
  {
    title: 'Plug-in Hybrid (PHEV)',
    subtitle: 'Flexible Power Solutions',
    description: 'Best of both worlds combining electric motor and gasoline engine. Drive electric for daily commutes and use fuel for longer trips without range anxiety.',
    icon: Battery,
    gradient: 'from-green-400 via-emerald-500 to-teal-500',
    range: '50-80 km EV',
    charging: '2-4 hours',
    features: [
      'Dual Power Systems',
      'Extended Range',
      'Fuel Efficiency',
      'Lower Emissions',
    ],
  },
  {
    title: 'Hybrid (HEV)',
    subtitle: 'Efficient Technology',
    description: 'Self-charging hybrid technology that optimizes fuel consumption. The electric motor assists the engine to reduce emissions and improve efficiency.',
    icon: Leaf,
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    range: 'Unlimited',
    charging: 'Self-charging',
    features: [
      'No Plug Required',
      'Regenerative Braking',
      '40% Fuel Savings',
      'Smooth Performance',
    ],
  },
]

const environmentalBenefits = [
  {
    icon: Leaf,
    title: 'Clean Air',
    description: 'Zero tailpipe emissions reduce urban air pollution',
    stat: '100%',
    label: 'Emission Free',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingDown,
    title: 'Lower Carbon',
    description: 'Significantly reduced carbon footprint per kilometer',
    stat: '85%',
    label: 'Less CO₂',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Droplet,
    title: 'Energy Efficient',
    description: 'Electric motors are 3x more efficient than combustion',
    stat: '90%+',
    label: 'Efficiency',
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: Globe2,
    title: 'Sustainable',
    description: 'Renewable energy integration for cleaner transport',
    stat: '100%',
    label: 'Renewable Ready',
    color: 'from-emerald-500 to-teal-500',
  },
]

const bydAdvantages = [
  {
    icon: Award,
    title: 'Global EV Leader',
    description: 'World\'s largest EV manufacturer with proven technology',
  },
  {
    icon: Battery,
    title: 'Blade Battery',
    description: 'Revolutionary LFP battery technology - safer and longer lasting',
  },
  {
    icon: Shield,
    title: 'Comprehensive Warranty',
    description: '8-year battery warranty and complete after-sales support',
  },
  {
    icon: Gauge,
    title: 'Performance',
    description: '0-100 km/h in seconds with instant electric acceleration',
  },
  {
    icon: Timer,
    title: 'Fast Charging',
    description: '80% charge in 30 minutes with DC fast charging',
  },
  {
    icon: Sparkles,
    title: 'Smart Technology',
    description: 'Advanced driver assistance and intelligent connectivity',
  },
]

export default function ElectricVehiclesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeType, setActiveType] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-teal-500/20 backdrop-blur-sm rounded-full mb-6 border border-green-500/30"
          >
            <Car className="w-5 h-5 text-green-600 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-green-700 via-blue-700 to-teal-700 bg-clip-text text-transparent">
              Clean Mobility Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Electric & Hybrid
            </span>
            <br />
            <span className="text-gray-900">Vehicles</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Drive the future with BYD electric and hybrid vehicles - combining zero emissions, cutting-edge technology, and exceptional performance for a cleaner tomorrow
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {evStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}{stat.suffix || ''}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Animation + Vehicle Types */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-lg">
              <Lottie
                animationData={evAnimation}
                loop={true}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Vehicle Type Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4 mb-6">
              {vehicleTypes.map((type, index) => (
                <button
                  key={index}
                  onClick={() => setActiveType(index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    activeType === index
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.gradient} flex items-center justify-center flex-shrink-0`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">{type.title}</div>
                      <div className="text-sm text-gray-600">{type.subtitle}</div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${activeType === index ? 'rotate-90' : ''}`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Active Type Details */}
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${vehicleTypes[activeType].gradient} text-white text-sm font-semibold mb-4`}>
                {vehicleTypes[activeType].subtitle}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {vehicleTypes[activeType].description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Range</div>
                  <div className="font-bold text-gray-900">{vehicleTypes[activeType].range}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Charging</div>
                  <div className="font-bold text-gray-900">{vehicleTypes[activeType].charging}</div>
                </div>
              </div>
              <div className="space-y-2">
                {vehicleTypes[activeType].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Environmental Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Environmental Impact
            </h3>
            <p className="text-lg text-gray-600">
              Every electric kilometer driven is a step towards cleaner air and a healthier planet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {environmentalBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + 0.1 * index }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{benefit.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                      {benefit.stat}
                    </span>
                    <span className="text-sm text-gray-600">{benefit.label}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* BYD Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 rounded-3xl p-8 md:p-12 text-white mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm font-semibold mb-4">
              Why Choose BYD
            </div>
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Leading the EV Revolution
            </h3>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              BYD combines decades of battery expertise with innovative automotive engineering
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bydAdvantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.1 + 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{advantage.title}</h4>
                  <p className="text-white/70 text-sm">{advantage.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-500 via-blue-500 to-teal-500 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Car className="w-8 h-8" />
                <Zap className="w-8 h-8" />
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Experience the Future of Mobility
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Test drive a BYD electric or hybrid vehicle today and discover the perfect blend of performance, technology, and sustainability.
              </p>
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-green-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Schedule Test Drive
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  View Models
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
