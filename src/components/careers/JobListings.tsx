'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Clock, Briefcase } from 'lucide-react'

const jobs = [
  {
    title: 'Senior Software Engineer',
    department: 'AI & Engineering',
    location: 'Tehran, Iran',
    type: 'Full-time',
    description: 'Join our AI team to build cutting-edge solutions',
  },
  {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Tehran, Iran',
    type: 'Full-time',
    description: 'Lead our marketing initiatives across all business domains',
  },
  {
    title: 'Financial Analyst',
    department: 'Investment',
    location: 'Tehran, Iran',
    type: 'Full-time',
    description: 'Analyze investment opportunities and market trends',
  },
]

export default function JobListings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">Open Positions</h2>
          <p className="text-lg text-gray-600">Find your next opportunity</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {job.department}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors whitespace-nowrap">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
