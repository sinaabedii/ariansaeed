'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { 
  Factory, 
  FlaskConical, 
  Cpu, 
  TrendingUp, 
  Ship, 
  Building2, 
  Leaf,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react'
import { DEPARTMENTS, SUBSIDIARY_COMPANIES } from '@/lib/constants'

const iconMap = {
  Factory,
  FlaskConical,
  Cpu,
  TrendingUp,
  Ship,
  Building2,
  Leaf,
}

export default function DepartmentsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedDepartment, setSelectedDepartment] = useState<typeof DEPARTMENTS[0] | null>(null)

  return (
    <>
      <section ref={ref} className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Strategic Divisions
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              Explore Our Departments
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Seven specialized departments, each leading innovation in their respective industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTMENTS.map((department, index) => {
              const Icon = iconMap[department.icon as keyof typeof iconMap]
              const departmentCompanies = SUBSIDIARY_COMPANIES.filter(company => 
                department.companies.includes(company.id)
              )

              return (
                <motion.div
                  key={department.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedDepartment(department)}
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={department.image}
                      alt={department.name}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${department.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 w-14 h-14 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/30">
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>

                    {/* Company Count Badge */}
                    <div className="absolute bottom-4 left-4 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full border border-white/30">
                      <span className="text-white font-bold text-sm">
                        {departmentCompanies.length} Companies
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {department.name}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {department.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {Object.entries(department.stats).slice(0, 4).map(([key, value], i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-3 group-hover:bg-primary/5 transition-colors">
                          <div className="text-lg font-bold text-gray-900">{value}</div>
                          <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>

                    {/* View Details Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-semibold text-gray-600 group-hover:text-primary transition-colors">
                        View Details
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${department.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Department Detail Modal */}
      {selectedDepartment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedDepartment(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative shadow-2xl max-h-[95vh] overflow-hidden flex flex-col"
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDepartment(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all hover:rotate-90 duration-300 z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>

            {/* Header with Image */}
            <div className="relative h-32 sm:h-36 md:h-40 rounded-t-2xl sm:rounded-t-3xl overflow-hidden flex-shrink-0">
              <Image
                src={selectedDepartment.image}
                alt={selectedDepartment.name}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedDepartment.gradient} opacity-70`} />
              
              <div className="absolute inset-0 flex items-center justify-center text-center px-3 py-4 sm:px-4 sm:py-5">
                <div>
                  {(() => {
                    const Icon = iconMap[selectedDepartment.icon as keyof typeof iconMap]
                    return (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-white/30">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" strokeWidth={2} />
                      </div>
                    )
                  })()}
                  <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-white mb-1 sm:mb-2">
                    {selectedDepartment.name}
                  </h2>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-xl mx-auto line-clamp-2">
                    {selectedDepartment.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 overflow-y-auto flex-1">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
                {Object.entries(selectedDepartment.stats).map(([key, value], i) => (
                  <div key={i} className={`bg-gradient-to-br ${selectedDepartment.gradient} px-3 py-3 sm:px-4 sm:py-3 rounded-xl text-white`}>
                    <div className="text-base sm:text-lg md:text-xl font-bold mb-0.5">{value}</div>
                    <div className="text-[10px] sm:text-xs opacity-90 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-4 sm:mb-5">
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold text-gray-900 mb-2 sm:mb-3">Key Features</h3>
                <div className="grid grid-cols-1 gap-2">
                  {selectedDepartment.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors">
                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br ${selectedDepartment.gradient}`} />
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subsidiary Companies */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">
                  Subsidiary Companies ({SUBSIDIARY_COMPANIES.filter(c => selectedDepartment.companies.includes(c.id)).length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {SUBSIDIARY_COMPANIES
                    .filter(company => selectedDepartment.companies.includes(company.id))
                    .map((company) => (
                      <div
                        key={company.id}
                        className="group bg-gray-50 rounded-xl p-2 sm:p-3 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                      >
                        <div className="relative aspect-square bg-white rounded-lg mb-1.5 sm:mb-2 overflow-hidden">
                          <Image
                            src={company.logo}
                            alt={company.name}
                            fill
                            className="object-contain p-1.5 sm:p-2"
                          />
                        </div>
                        <h4 className="font-bold text-gray-900 text-[10px] sm:text-xs mb-0.5 text-center group-hover:text-primary transition-colors line-clamp-1">
                          {company.name}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] text-gray-600 text-center line-clamp-2">
                          {company.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
