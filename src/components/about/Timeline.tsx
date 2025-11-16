'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const milestones = [
  { year: '1999', title: 'Foundation', description: 'Arian Saeed Holding was established' },
  { year: '2005', title: 'Expansion', description: 'Expanded into MDF manufacturing' },
  { year: '2010', title: 'Diversification', description: 'Entered agriculture and construction sectors' },
  { year: '2015', title: 'Innovation', description: 'Launched AI & Engineering division' },
  { year: '2020', title: 'Global Reach', description: 'Expanded to 15+ countries worldwide' },
  { year: '2024', title: 'Sustainable Future', description: 'Committed to carbon neutrality by 2030' },
]

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600">25+ years of growth and innovation</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-center mb-12 last:mb-0"
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'order-2 pl-8'}`}>
                <div className="inline-block bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-primary mb-2">{milestone.year}</h3>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
              
              <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10" />
              
              {index !== milestones.length - 1 && (
                <div className="absolute left-1/2 top-8 w-0.5 h-full bg-gray-300 -z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
