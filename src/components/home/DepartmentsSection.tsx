'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Factory, 
  FlaskConical, 
  Cpu, 
  TrendingUp, 
  Ship, 
  Building2, 
  Leaf,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { DEPARTMENTS } from '@/lib/constants'

const iconMap = {
  Factory,
  FlaskConical,
  Cpu,
  TrendingUp,
  Ship,
  Building2,
  Leaf,
}

export default function DepartmentsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Gradient Orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${
              i === 0 ? 'rgba(99, 102, 241, 0.4)' : 
              i === 1 ? 'rgba(168, 85, 247, 0.4)' : 
              'rgba(236, 72, 153, 0.4)'
            }, transparent)`,
            width: `${400 + i * 100}px`,
            height: `${400 + i * 100}px`,
            left: `${i * 30}%`,
            top: `${i * 25}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-white font-semibold">Our Structure</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Seven Strategic{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-400">
              Departments
            </span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Organized excellence across diverse industries, driving innovation and growth through specialized expertise
          </p>

          <Link 
            href="/departments"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
          >
            <span>Explore All Departments</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Departments Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {DEPARTMENTS.map((department, index) => {
            const Icon = iconMap[department.icon as keyof typeof iconMap]
            const isLarge = index === 0 || index === 3
            
            return (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative rounded-3xl overflow-hidden ${
                  isLarge ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <Link href="/departments" className="block h-full">
                  <div className={`relative bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/30 transition-all duration-500 rounded-3xl overflow-hidden h-full ${
                    isLarge ? 'min-h-[400px]' : 'min-h-[200px]'
                  }`}>
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={department.image}
                        alt={department.name}
                        fill
                        className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${department.gradient} opacity-40 group-hover:opacity-50 transition-opacity`} />
                    </div>

                    {/* Content */}
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      {/* Icon and Title */}
                      <div>
                        <div className={`inline-flex items-center justify-center ${
                          isLarge ? 'w-16 h-16 mb-4' : 'w-12 h-12 mb-3'
                        } bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                          <Icon className={`${isLarge ? 'w-8 h-8' : 'w-6 h-6'} text-white`} strokeWidth={2} />
                        </div>
                        
                        <h3 className={`font-heading font-bold text-white mb-2 group-hover:text-primary-200 transition-colors ${
                          isLarge ? 'text-2xl md:text-3xl' : 'text-xl'
                        }`}>
                          {department.name}
                        </h3>
                        
                        {isLarge && (
                          <p className="text-white/80 mb-4 line-clamp-2">
                            {department.description}
                          </p>
                        )}
                      </div>

                      {/* Stats */}
                      <div className={`grid ${isLarge ? 'grid-cols-2 gap-3' : 'grid-cols-1 gap-2'}`}>
                        {Object.entries(department.stats).slice(0, isLarge ? 4 : 2).map(([key, value], i) => (
                          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20">
                            <div className={`font-bold text-white ${isLarge ? 'text-lg' : 'text-sm'}`}>
                              {value}
                            </div>
                            <div className={`text-white/70 capitalize ${isLarge ? 'text-xs' : 'text-[10px]'}`}>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4 px-8 py-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="flex-1 text-left">
              <h4 className="text-xl font-bold text-white mb-1">
                Discover Our Complete Structure
              </h4>
              <p className="text-white/70">
                Learn more about each department and their subsidiary companies
              </p>
            </div>
            <Link 
              href="/departments"
              className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg group"
            >
              <span className="flex items-center gap-2">
                View Details
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
