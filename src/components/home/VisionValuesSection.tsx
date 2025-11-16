'use client'

import { motion } from 'framer-motion'
import { Eye, Target, Heart, Lightbulb, Users, Award } from 'lucide-react'
import Image from 'next/image'

const values = [
  {
    icon: Target,
    title: 'Express',
    description: 'Fast and efficient delivery of products and services to meet customer needs promptly.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    icon: Award,
    title: 'Economy',
    description: 'Cost-effective solutions that provide the best value without compromising on quality.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    icon: Heart,
    title: 'Strong',
    description: 'Robust and durable products built to withstand the test of time and deliver reliability.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    gradient: 'from-red-500 to-pink-600'
  },
  {
    icon: Lightbulb,
    title: 'Environment-Friendly',
    description: 'Sustainable practices that protect the environment and support arboriculture.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: Eye,
    title: 'Customer-Oriented',
    description: 'Focused on understanding and exceeding customer expectations in every interaction.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    gradient: 'from-indigo-500 to-blue-600'
  },
  {
    icon: Target,
    title: 'Focused on the Future',
    description: 'Forward-thinking approach with continuous innovation and strategic planning.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    icon: Lightbulb,
    title: 'Innovative and Creative',
    description: 'Pioneering new solutions and creative approaches that transform industries.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    icon: Users,
    title: 'Powered by Talented Employees',
    description: 'Our 1,500 highly educated and young employees are our greatest asset.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    gradient: 'from-cyan-500 to-blue-600'
  }
]

export default function VisionValuesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Our <span className="text-primary">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering excellence through our core strengths and commitment to quality, innovation, and sustainability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-80`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <value.icon className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
