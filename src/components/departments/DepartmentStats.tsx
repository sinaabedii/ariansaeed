'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Factory, Globe, TrendingUp, Award, Zap } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '1,800+',
    label: 'Total Employees',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Factory,
    value: '24',
    label: 'Production Lines',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Globe,
    value: '15+',
    label: 'Countries',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: TrendingUp,
    value: '$500M+',
    label: 'Portfolio Value',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Award,
    value: '42+',
    label: 'Years Experience',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    icon: Zap,
    value: '100MW',
    label: 'Energy Capacity',
    gradient: 'from-green-500 to-emerald-500',
  },
]

export default function DepartmentStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Driving Growth Across Industries
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combined strength and expertise of our departments creating lasting value
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`relative w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>

              {/* Content */}
              <div className="relative">
                <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
