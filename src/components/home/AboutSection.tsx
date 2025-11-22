'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Target, Eye } from 'lucide-react'
import Image from 'next/image'

const features = [
  {
    icon: Award,
    title: 'Western Technology',
    description: 'We produce everything with technology from Western Europe, especially Germany.',
  },
  {
    icon: Target,
    title: 'World-Class Quality',
    description: 'Offering the best wood fiber compressed products at the highest quality level in the world.',
  },
  {
    icon: Eye,
    title: 'Global Supply',
    description: 'International supply is very prosperous and developing across multiple regions.',
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              About Arian Saeed Industrial Group Inc.
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
              Seven Thousand Years of Wood Industry Heritage
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
              The history of carpentry and joinery in Iran dates back to seven thousand years ago and is 
              perhaps the first recorded industry in the history of Iran that is significant and valuable 
              for all of us. This long history of wood industry in the country and the world shows the 
              importance of wood and wood accessories in the life of all of us.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-7 md:mb-8 leading-relaxed">
              Arian Saeed Industrial Group Inc. (ASIGI), regarded as a value-driven company, was established 
              in 1982 and throughout the years, has expanded into several different industries. Today with 32 
              companies active in different subjects, we have 1.5 thousand highly educated and young employees.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center px-2"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transform hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-48 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden"
              >
                <Image
                  src="/images/DJI_0006.JPG"
                  alt="Business Meeting"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  quality={85}
                  loading="lazy"
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative h-48 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden mt-6 sm:mt-8"
              >
                <Image
                  src="/images/1O0A6342.JPG"
                  alt="Office Space"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  quality={85}
                  loading="lazy"
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative h-48 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden -mt-6 sm:-mt-8"
              >
                <Image
                  src="/images/DSC_0030.JPG"
                  alt="Team Work"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  quality={85}
                  loading="lazy"
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative h-48 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden"
              >
                <Image
                  src="/images/_SMH3265.jpg"
                  alt="Innovation"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  quality={85}
                  loading="lazy"
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 md:-bottom-6 md:-left-6 bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-5 md:p-6 z-10"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">42+</div>
              <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Years Since 1982</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
