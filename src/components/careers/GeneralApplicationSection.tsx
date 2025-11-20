'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Upload, Users, Sparkles, TrendingUp, Award, Send } from 'lucide-react'
import ResumeModal from './ResumeModal'

const perks = [
  {
    icon: Users,
    title: 'Join 1,200+ Professionals',
    description: 'Be part of a diverse, talented team',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Continuous learning & development',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Award,
    title: 'Industry Leader',
    description: 'Work with top-tier companies',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Sparkles,
    title: 'Innovation Focus',
    description: 'Shape the future with technology',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function GeneralApplicationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-full mb-6 border border-primary/20">
              <Upload className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                General Application
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              <span className="text-gray-900">Don't See Your</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Perfect Role?
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Submit your resume and we'll keep you in mind for future opportunities that match your skills and aspirations
            </p>
          </motion.div>

          {/* Perks Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {perks.map((perk, index) => {
              const Icon = perk.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${perk.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-300`} />
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 h-full">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${perk.color} mb-4 shadow-md`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {perk.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-600 to-primary-700 rounded-3xl" />
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  x: [0, -100, 0],
                  y: [0, 50, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"
              />
            </div>

            {/* Content */}
            <div className="relative p-12 text-center text-white">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-6"
              >
                <Upload className="w-10 h-10" />
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to Make an Impact?
              </h3>
              
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Upload your resume and tell us about your experience, skills, and career goals. 
                We're always looking for talented individuals to join our growing family.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-white text-primary rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                >
                  <Upload className="w-5 h-5" />
                  <span>Submit Your Resume</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                </motion.button>

                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>We typically respond within 48 hours</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold mb-1">1,200+</div>
                  <div className="text-white/80 text-sm">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">32</div>
                  <div className="text-white/80 text-sm">Companies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">15+</div>
                  <div className="text-white/80 text-sm">Industries</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              By submitting your application, you agree to our{' '}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
              {' '}and{' '}
              <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        jobTitle=""
      />
    </section>
  )
}
