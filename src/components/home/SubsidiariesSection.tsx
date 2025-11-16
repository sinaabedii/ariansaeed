'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { SUBSIDIARY_COMPANIES } from '@/lib/constants'
import { ExternalLink, X } from 'lucide-react'

export default function SubsidiariesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedCompany, setSelectedCompany] = useState<typeof SUBSIDIARY_COMPANIES[0] | null>(null)

  return (
    <>
      <section ref={ref} className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: `${300 + i * 200}px`,
                height: `${300 + i * 200}px`,
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-lg text-white rounded-full text-sm font-semibold mb-4"
            >
              Our Companies
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading font-bold mb-4"
            >
              Subsidiary Companies
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/80 max-w-2xl mx-auto"
            >
              Leading companies under the Arian Saeed Holding umbrella
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {SUBSIDIARY_COMPANIES.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedCompany(company)}
                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/10 hover:border-white/30"
              >
                <div className="aspect-square flex items-center justify-center mb-3">
                  <div className="text-5xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                    {company.name.split(' ')[0].charAt(0)}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-center text-white/90 group-hover:text-white transition-colors">
                  {company.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCompany && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCompany(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-lg w-full relative"
          >
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">
                  {selectedCompany.name.split(' ')[0].charAt(0)}
                </span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                {selectedCompany.name}
              </h3>
              <p className="text-gray-600">
                {selectedCompany.description}
              </p>
            </div>

            <a
              href={selectedCompany.website}
              className="flex items-center justify-center space-x-2 w-full py-3 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
