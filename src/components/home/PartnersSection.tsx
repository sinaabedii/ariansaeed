'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, Globe2, Handshake, Award } from 'lucide-react'

const partners = [
  { id: 1, name: 'Siemens', logo: 'S', color: 'from-teal-500 to-cyan-600' },
  { id: 2, name: 'IKEA', logo: 'I', color: 'from-blue-500 to-blue-700' },
  { id: 3, name: 'BMW Group', logo: 'B', color: 'from-gray-700 to-gray-900' },
  { id: 4, name: 'Volkswagen', logo: 'V', color: 'from-blue-600 to-blue-800' },
  { id: 5, name: 'Bosch', logo: 'BO', color: 'from-red-500 to-red-700' },
  { id: 6, name: 'BASF', logo: 'BA', color: 'from-orange-500 to-orange-700' },
  { id: 7, name: 'Mercedes-Benz', logo: 'M', color: 'from-gray-600 to-gray-800' },
  { id: 8, name: 'Henkel', logo: 'H', color: 'from-purple-500 to-purple-700' },
]

const stats = [
  { icon: Building2, value: '500+', label: 'Global Partners' },
  { icon: Globe2, value: '50+', label: 'Countries' },
  { icon: Handshake, value: '1000+', label: 'Projects Completed' },
  { icon: Award, value: '25+', label: 'Industry Awards' },
]

export default function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
          >
            Trusted Partnerships
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4"
          >
            Our Global Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Collaborating with world-leading companies to deliver excellence
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Partners Carousel - Infinite Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: [0, -1920],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex space-x-8"
            >
              {/* Double the array for seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <motion.div
                  key={`${partner.id}-${index}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex-shrink-0 w-48 h-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-6">
                    {/* Logo Placeholder */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${partner.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl font-bold text-white">
                        {partner.logo}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                      {partner.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Interested in becoming a partner?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Handshake className="w-5 h-5" />
            <span>Partner With Us</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
