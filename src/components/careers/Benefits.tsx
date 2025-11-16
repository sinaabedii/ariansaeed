'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Zap, TrendingUp, Users } from 'lucide-react'

const benefits = [
  { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programs' },
  { icon: Zap, title: 'Growth Opportunities', description: 'Continuous learning and career development' },
  { icon: TrendingUp, title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
  { icon: Users, title: 'Great Culture', description: 'Collaborative and inclusive work environment' },
]

export default function Benefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">Why Join Us?</h2>
          <p className="text-lg text-gray-600">Great benefits and a supportive culture</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
