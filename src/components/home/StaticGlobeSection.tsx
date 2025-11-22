'use client'

import { motion } from 'framer-motion'
import { MapPin, Building2, Users, Globe, Zap, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const partnerCountries = [
  {
    city: 'Tehran',
    country: 'Iran',
    status: 'Headquarters',
    image: '/images/counteries/iran-tehran.jpg',
    description: 'Main operations center',
    position: { top: '45%', left: '58%' }
  },
  {
    city: 'Istanbul',
    country: 'Turkey',
    status: 'Active Partnership',
    image: '/images/counteries/Turkey.jpg',
    description: 'Strategic partnerships',
    position: { top: '40%', left: '48%' }
  },
  {
    city: 'Dubai',
    country: 'UAE',
    status: 'Regional Hub',
    image: '/images/counteries/Dubai.jpg',
    description: 'Middle East hub',
    position: { top: '50%', left: '60%' }
  },
  {
    city: 'Muscat',
    country: 'Oman',
    status: 'Active Projects',
    image: '/images/counteries/oman.webp',
    description: 'Infrastructure',
    position: { top: '52%', left: '61%' }
  },
  {
    city: 'Berlin',
    country: 'Germany',
    status: 'Strategic Alliance',
    image: '/images/counteries/germany.webp',
    description: 'Technology partner',
    position: { top: '36%', left: '44%' }
  },
  {
    city: 'Paris',
    country: 'France',
    status: 'Business Partnership',
    image: '/images/counteries/France.webp',
    description: 'Trade operations',
    position: { top: '38%', left: '42%' }
  },
  {
    city: 'Beijing',
    country: 'China',
    status: 'Strategic Partnership',
    image: '/images/counteries/China.jpg',
    description: 'Major supplier',
    position: { top: '42%', left: '75%' }
  },
  {
    city: 'Moscow',
    country: 'Russia',
    status: 'Strategic Projects',
    image: '/images/counteries/russia.jpg',
    description: 'Industrial collaborations',
    position: { top: '32%', left: '52%' }
  },
  {
    city: 'Dushanbe',
    country: 'Tajikistan',
    status: 'Development Projects',
    image: '/images/counteries/tajikistan.jpg',
    description: 'Infrastructure',
    position: { top: '40%', left: '62%' }
  },
  {
    city: 'Baghdad',
    country: 'Iraq',
    status: 'Active Projects',
    image: '/images/counteries/iraq.jpg',
    description: 'Construction projects',
    position: { top: '48%', left: '54%' }
  },
  {
    city: 'Damascus',
    country: 'Syria',
    status: 'Reconstruction',
    image: '/images/counteries/Damascus.webp',
    description: 'Reconstruction',
    position: { top: '46%', left: '52%' }
  },
  {
    city: 'Beirut',
    country: 'Lebanon',
    status: 'Active Partnership',
    image: '/images/counteries/syria.jpg',
    description: 'Business development',
    position: { top: '47%', left: '51%' }
  }
]

const stats = [
  { icon: Globe, label: 'Partner Countries', value: '12' },
  { icon: Building2, label: 'Active Projects', value: '50+' },
  { icon: Users, label: 'International Team', value: '20+' },
  { icon: MapPin, label: 'Global Reach', value: '3 Continents' }
]

export default function StaticGlobeSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 sm:mb-4 md:mb-6">
            Global <span className="text-white/80">Partners</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2">
            Everything that Sina MDF produces has desirable, healthy and world-class characteristics. Our international supply is very prosperous and developing, with products shared across markets worldwide.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* World Map with Markers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
            {/* World Map Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                <image href="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg" width="1000" height="500" opacity="0.6" />
              </svg>
            </div>

            {/* Animated Grid Overlay */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />

            {/* Country Markers */}
            {partnerCountries.map((country, index) => (
              <motion.div
                key={country.city}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="absolute group cursor-pointer"
                style={{
                  top: country.position.top,
                  left: country.position.left,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Marker Pulse */}
                <div className="absolute inset-0 animate-ping">
                  <div className="w-8 h-8 bg-primary rounded-full opacity-30" />
                </div>
                
                {/* Marker */}
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="relative z-10 w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                >
                  <MapPin className="w-4 h-4 text-white" />
                </motion.div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white text-gray-900 px-3 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm">
                    <div className="font-bold">{country.city}, {country.country}</div>
                    <div className="text-xs text-gray-600">{country.status}</div>
                  </div>
                  <div className="w-2 h-2 bg-white rotate-45 absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1" />
                </div>
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {partnerCountries.map((country, index) => {
                if (index === 0) return null // Skip headquarters
                const headquarters = partnerCountries[0]
                const x1 = headquarters.position.left
                const y1 = headquarters.position.top
                const x2 = country.position.left
                const y2 = country.position.top
                
                return (
                  <motion.line
                    key={`line-${index}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                  />
                )
              })}
            </svg>

            {/* Info Bar */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-around gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Operations</div>
                      <div className="text-sm font-bold text-gray-900">24/7</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Projects</div>
                      <div className="text-sm font-bold text-gray-900">50+</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Countries</div>
                      <div className="text-sm font-bold text-gray-900">12</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Growth</div>
                      <div className="text-sm font-bold text-gray-900">+25%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Country Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6"
        >
          {partnerCountries.map((country, index) => (
            <motion.div
              key={country.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all">
                <div className="relative h-24 sm:h-28 md:h-32 overflow-hidden">
                  <Image
                    src={country.image}
                    alt={country.country}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-white font-bold text-xs sm:text-sm">{country.city}</div>
                    <div className="text-white/80 text-[10px] sm:text-xs">{country.country}</div>
                  </div>
                </div>
                <div className="p-2 sm:p-3">
                  <div className="text-white/70 text-[10px] sm:text-xs">{country.status}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
