'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react'
import ResumeModal from './ResumeModal'

const jobs = [
  {
    title: 'Senior Software Engineer',
    department: 'AI & Engineering',
    location: 'Tehran, Iran',
    type: 'Full-time',
    description: 'Join our AI team to build cutting-edge solutions',
    image: '/images/1_bigstock-Ai-Car-Fix-Technology-Ai-Fix-471835423.jpg',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Tehran, Iran',
    type: 'Full-time',
    description: 'Lead our marketing initiatives across all business domains',
    image: '/images/2.jpg',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    title: 'Fintech Specialist',
    department: 'Investment & Fintech',
    location: 'Tehran, Iran',
    type: 'Full-time',
    description: 'Drive digital financial transformation and fintech innovation',
    image: '/images/IMG_Mst_Invest_Wealth_Manage.jpg',
    gradient: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'Production Manager',
    department: 'Manufacturing',
    location: 'Tehran, Iran',
    type: 'Full-time',
    description: 'Oversee manufacturing operations and quality control',
    image: '/images/1.jpg',
    gradient: 'from-amber-600 to-orange-600',
  },
  {
    title: 'Sales Executive',
    department: 'Trade & Export',
    location: 'Tehran, Iran',
    type: 'Full-time',
    description: 'Drive international sales and client relationships',
    image: '/images/4.jpg',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'Project Engineer',
    department: 'Construction',
    location: 'Tehran, Iran',
    type: 'Full-time',
    description: 'Manage construction projects from planning to completion',
    image: '/images/DJI_0006.JPG',
    gradient: 'from-orange-600 to-red-600',
  },
]

export default function JobListings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string>('')

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle)
    setIsModalOpen(true)
  }

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
          >
            Join Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4"
          >
            Open Positions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Find your next opportunity and grow with us
          </motion.p>
        </div>

        {/* Grid Layout - از چپ به راست */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {jobs.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={job.image}
                  alt={job.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${job.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                
                {/* Department Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full border border-white/30">
                  <span className="text-white font-bold text-sm flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {job.department}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
                  {job.description}
                </p>

                {/* Details */}
                <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {job.type}
                  </div>
                </div>

                {/* Apply Button */}
                <button 
                  onClick={() => handleApplyClick(job.title)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${job.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob}
      />
    </section>
  )
}
