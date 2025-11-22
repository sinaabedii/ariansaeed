'use client'

import { motion } from 'framer-motion'
import { MapPin, Building2, Users, Globe, Zap, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Import fallback component
import GlobeFallback from '@/components/3d/GlobeFallback'

// Dynamically import Globe3D to avoid SSR issues
const Globe3D = dynamic(() => import('@/components/3d/Globe3D'), {
  ssr: false,
  loading: () => <GlobeFallback />
})

const partnerCountries = [
  {
    city: 'Tehran',
    country: 'Iran',
    status: 'Headquarters',
    image: '/images/counteries/iran-tehran.jpg',
    description: 'Main operations center'
  },
  {
    city: 'Istanbul',
    country: 'Turkey',
    status: 'Active Partnership',
    image: '/images/counteries/Turkey.jpg',
    description: 'Strategic partnerships and trade operations'
  },
  {
    city: 'Dubai',
    country: 'UAE',
    status: 'Regional Hub',
    image: '/images/counteries/Dubai.jpg',
    description: 'Middle East business hub'
  },
  {
    city: 'Muscat',
    country: 'Oman',
    status: 'Active Projects',
    image: '/images/counteries/oman.webp',
    description: 'Infrastructure development'
  },
  {
    city: 'Berlin',
    country: 'Germany',
    status: 'Strategic Alliance',
    image: '/images/counteries/germany.webp',
    description: 'Technology partnerships'
  },
  {
    city: 'Beijing',
    country: 'China',
    status: 'Major Collaborations',
    image: '/images/counteries/china.jpg',
    description: 'Manufacturing partnerships'
  },
  {
    city: 'Baku',
    country: 'Azerbaijan',
    status: 'Active Partnership',
    image: '/images/counteries/azerbaijan.jpg',
    description: 'Energy sector projects'
  },
  {
    city: 'Moscow',
    country: 'Russia',
    status: 'Strategic Projects',
    image: '/images/counteries/russia.jpg',
    description: 'Industrial collaborations'
  },
  {
    city: 'Dushanbe',
    country: 'Tajikistan',
    status: 'Development Projects',
    image: '/images/counteries/tajikistan.jpg',
    description: 'Infrastructure development'
  },
  {
    city: 'Baghdad',
    country: 'Iraq',
    status: 'Active Projects',
    image: '/images/counteries/iraq.jpg',
    description: 'Construction projects'
  },
  {
    city: 'Damascus',
    country: 'Syria',
    status: 'Reconstruction',
    image: '/images/counteries/Damascus.webp',
    description: 'Reconstruction projects'
  },
  {
    city: 'Beirut',
    country: 'Lebanon',
    status: 'Active Partnership',
    image: '/images/counteries/syria.jpg',
    description: 'Business development'
  }
]

const stats = [
  { icon: Globe, label: 'Partner Countries', value: '12' },
  { icon: Building2, label: 'Active Projects', value: '50+' },
  { icon: Users, label: 'International Team', value: '20+' },
  { icon: MapPin, label: 'Global Reach', value: '3 Continents' }
]

export default function GlobalPresenceSection() {
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
            Everything that Sina MDF produces has desirable, healthy and world-class characteristics. Our international supply is very prosperous and developing, with products shared across markets worldwide. Thousands of production staff trained by European experts ensure optimal production and supply.
          </p>
        </motion.div>

        {/* Stats - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center px-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* 3D Interactive Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <div className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
            {/* Decorative elements - hidden on mobile */}
            <div className="hidden md:block absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
            <div className="hidden md:block absolute top-8 right-8 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="hidden md:block absolute bottom-12 left-8 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* 3D Globe Component */}
            <Globe3D className="w-full h-full" />
            
            {/* Mobile & Tablet info bar - Very compact */}
            <div className="lg:hidden absolute bottom-2 left-2 right-2 z-10">
              <div className="bg-white/90 backdrop-blur-md rounded shadow-md border border-gray-200 p-1.5 sm:p-2">
                <div className="flex items-center justify-around gap-1 sm:gap-1.5">
                  {/* Operations */}
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-sm bg-yellow-100 flex items-center justify-center">
                      <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-[10px] font-bold text-gray-900 leading-tight">24/7</div>
                      <div className="text-[7px] sm:text-[8px] text-gray-600 leading-tight">Ops</div>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className="h-5 sm:h-6 w-px bg-gray-300"></div>
                  
                  {/* Growth */}
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-sm bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-[10px] font-bold text-gray-900 leading-tight">+25%</div>
                      <div className="text-[7px] sm:text-[8px] text-gray-600 leading-tight">Growth</div>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className="h-5 sm:h-6 w-px bg-gray-300"></div>
                  
                  {/* Countries */}
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-sm bg-blue-100 flex items-center justify-center">
                      <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-[10px] font-bold text-gray-900 leading-tight">12+</div>
                      <div className="text-[7px] sm:text-[8px] text-gray-600 leading-tight">Cnts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partner Countries Grid - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {partnerCountries.map((country, index) => (
            <motion.div 
              key={country.city} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              viewport={{ once: true }}
              className={`group bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 hover:bg-white/15 transition-all duration-300 ${
                country.status === 'Headquarters' 
                  ? 'border-2 border-green-500/50 hover:border-green-500/70 ring-2 ring-green-500/20' 
                  : 'border border-white/5 hover:border-white/20'
              }`}
            >
              <div className="relative w-full h-28 sm:h-32 md:h-36 lg:h-40 rounded-lg overflow-hidden mb-2 sm:mb-3 md:mb-4">
                <Image
                  src={country.image}
                  alt={country.country}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-1.5 sm:bottom-2 md:bottom-3 left-1.5 sm:left-2 md:left-3 text-white">
                  <div className="text-xs sm:text-sm md:text-base font-bold flex items-center gap-1">
                    {country.country}
                    {country.status === 'Headquarters' && <span className="text-[10px] sm:text-xs">🏢</span>}
                  </div>
                  <div className="text-[10px] sm:text-xs opacity-90">{country.city}</div>
                </div>
                {country.status === 'Headquarters' && (
                  <div className="absolute top-1.5 sm:top-2 md:top-3 right-1.5 sm:right-2 md:right-3 bg-green-500 text-white text-[9px] sm:text-[10px] md:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    HQ
                  </div>
                )}
              </div>
              
              <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                <h3 className="font-semibold text-xs sm:text-sm md:text-base text-white group-hover:text-white/90 transition-colors line-clamp-2">
                  {country.description}
                </h3>
                
                <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                  <div className="flex items-center space-x-1 sm:space-x-1.5 text-white/70 min-w-0 flex-1">
                    <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs md:text-sm truncate">{country.status}</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-1.5 text-white/70 flex-shrink-0">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                      {country.status === 'Headquarters' ? 'Base' : 'Partner'}
                    </span>
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 pt-1.5 sm:pt-2 border-t border-white/10">
                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse flex-shrink-0 ${
                    country.status === 'Headquarters' ? 'bg-green-600' : 'bg-green-400'
                  }`} />
                  <span className="text-[10px] sm:text-xs text-white/60 truncate">
                    {country.status === 'Headquarters' ? 'Main Center' : 'Active'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
