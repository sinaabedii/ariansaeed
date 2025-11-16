'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const milestones = [
  { year: '1982', title: 'Foundation', description: 'Arian Saeed Industrial Group Inc. (ASIGI) was established as a value-driven company' },
  { year: '1990s', title: 'Wood Industry Pioneer', description: 'Became a leading provider of wood-based panels and cellulose products with Western European technology' },
  { year: '2000s', title: 'Expansion & Diversification', description: 'Expanded into petrochemicals, construction, and multiple industries, adding numerous businesses to the group' },
  { year: '2010s', title: 'Technology Innovation', description: 'Pioneered in acquiring new technologies from around the world to Iran, establishing as a leading provider in Middle East' },
  { year: '2015', title: 'AI & Engineering', description: 'Launched AI division and advanced engineering services' },
  { year: 'Today', title: '32 Companies Strong', description: 'Operating 32 companies with 1,500 highly educated and young employees across diverse industries' },
]

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600">42+ years of growth, innovation, and excellence since 1982</p>
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
