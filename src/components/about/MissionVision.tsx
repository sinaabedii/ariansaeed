'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Eye, Award } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To help create positive, enduring change in the world by empowering our people to give back to their communities, operating our firm in socially responsible and environmentally sustainable ways, and working with clients to intentionally address societal challenges.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To be a leading provider of world-class products and services across multiple industries, pioneering in acquiring new technologies and establishing ourselves as a trusted partner in Middle Eastern countries.',
  },
  {
    icon: Award,
    title: 'Our Values',
    description: 'As a participant in the UN Global Compact, we support the Ten Principles on human rights, environment, labor, and anti-corruption. Our values are reflected in our Code of Professional Conduct and our commitment to excellence.',
  },
]

export default function MissionVision() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-xl transition-shadow"
            >
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <value.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
