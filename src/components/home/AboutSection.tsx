'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Target, Eye } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering exceptional quality in every project and product.',
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'Leading the industry with cutting-edge solutions and technologies.',
  },
  {
    icon: Eye,
    title: 'Vision',
    description: 'Building a sustainable future through responsible business practices.',
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              About Arian Saeed Holding
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Building Excellence Across Multiple Industries
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Arian Saeed Holding is a diversified multi-industry conglomerate with a strong presence 
              in cellulose products, MDF manufacturing, agriculture, construction, AI & engineering, 
              financial investment, and international trade.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With over 25 years of experience, we have established ourselves as a trusted leader in 
              our sectors, consistently delivering innovative solutions and sustainable growth for our 
              stakeholders and communities.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-64 rounded-2xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
                  alt="Business Meeting"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative h-64 rounded-2xl overflow-hidden mt-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
                  alt="Office Space"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative h-64 rounded-2xl overflow-hidden -mt-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070"
                  alt="Team Work"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative h-64 rounded-2xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070"
                  alt="Innovation"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 z-10"
            >
              <div className="text-4xl font-bold text-primary">25+</div>
              <div className="text-sm text-gray-600">Years of Excellence</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
