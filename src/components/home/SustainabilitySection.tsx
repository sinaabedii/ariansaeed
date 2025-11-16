'use client'

import { motion } from 'framer-motion'
import { Leaf, Recycle, Sun, Droplets, Wind, TreePine, Award, Target } from 'lucide-react'
import Image from 'next/image'

const initiatives = [
  {
    icon: Sun,
    title: 'Renewable Energy',
    description: 'Transitioning to 100% renewable energy across all operations',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80',
    progress: 85,
    target: '2025',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Recycle,
    title: 'Circular Economy',
    description: 'Implementing zero-waste principles and sustainable practices',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80',
    progress: 72,
    target: '2026',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: Droplets,
    title: 'Water Conservation',
    description: 'Advanced water management and conservation technologies',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
    progress: 90,
    target: '2024',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: TreePine,
    title: 'Carbon Neutral',
    description: 'Achieving net-zero carbon emissions through innovation',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    progress: 68,
    target: '2030',
    color: 'from-green-500 to-teal-600'
  }
]

const achievements = [
  {
    icon: Award,
    title: 'Green Building Certified',
    value: '15 Facilities',
    description: 'LEED Platinum certified buildings'
  },
  {
    icon: Leaf,
    title: 'Carbon Footprint Reduced',
    value: '45%',
    description: 'Reduction since 2020'
  },
  {
    icon: Wind,
    title: 'Clean Energy Generated',
    value: '50MW',
    description: 'From renewable sources'
  },
  {
    icon: Target,
    title: 'Sustainability Goals',
    value: '12/15',
    description: 'UN SDGs actively supported'
  }
]

export default function SustainabilitySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Our Commitment to <span className="text-green-600">the Environment</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to making a difference in society is embedded in everything we do. We are committed to managing our firm in ways that are socially responsible and environmentally sustainable.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-96 rounded-3xl overflow-hidden mb-16"
        >
          <Image
            src="https://images.unsplash.com/photo-1569163139394-de44cb6c4a3b?w=1200&q=80"
            alt="Sustainable Future"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/70" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Acting Responsibly
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg max-w-2xl mx-auto"
              >
                As a participant in the United Nations Global Compact, we support and respect the Ten Principles on human rights, environment, labor, and anti-corruption. We bring this commitment to life through our Values, our Code of Professional Conduct, and our policies related to the environment, our supply chain, our people, and our professional standards.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Sustainability Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={initiative.image}
                  alt={initiative.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${initiative.color} opacity-80`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <initiative.icon className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg rounded-full px-3 py-1">
                  <span className="text-white text-xs font-medium">Target: {initiative.target}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {initiative.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {initiative.description}
                </p>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{initiative.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${initiative.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className={`h-2 rounded-full bg-gradient-to-r ${initiative.color}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white mb-16"
        >
          <h3 className="text-3xl font-heading font-bold text-center mb-12">
            Our Environmental Impact
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2">
                  {achievement.value}
                </div>
                <div className="font-semibold mb-1">
                  {achievement.title}
                </div>
                <div className="text-white/80 text-sm">
                  {achievement.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Sustainability Journey
            </h3>
            <p className="text-gray-600 mb-6">
              Partner with us to create innovative solutions that benefit both business and the environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300">
                View Sustainability Report
              </button>
              <button className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300">
                Partner With Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
