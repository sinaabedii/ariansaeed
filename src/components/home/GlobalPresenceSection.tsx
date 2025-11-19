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
  { icon: Users, label: 'International Team', value: '1,200+' },
  { icon: MapPin, label: 'Global Reach', value: '3 Continents' }
]

export default function GlobalPresenceSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6">
            Export <span className="text-white/80">Services</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Everything that Sina MDF produces has desirable, healthy and world-class characteristics. Our international supply is very prosperous and developing, with products shared across markets worldwide. Thousands of production staff trained by European experts ensure optimal production and supply.
          </p>
        </motion.div>

        {/* Stats - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-white/70 px-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* 3D Interactive Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
            {/* Decorative elements - hidden on mobile */}
            <div className="hidden md:block absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
            <div className="hidden md:block absolute top-8 right-8 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="hidden md:block absolute bottom-12 left-8 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* 3D Globe Component */}
            <Globe3D className="w-full h-full" />
            
            {/* Floating info panels - responsive */}
            <div className="hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 flex-col space-y-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-3 text-white text-sm"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="font-medium">Real-time Operations</span>
                </div>
                <div className="text-white/70 text-xs">24/7 Global Coverage</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-3 text-white text-sm"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="font-medium">Growth Rate</span>
                </div>
                <div className="text-white/70 text-xs">+25% YoY Expansion</div>
              </motion.div>
            </div>
            
            {/* Mobile info bar */}
            <div className="md:hidden absolute bottom-3 left-3 right-3 flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-lg px-3 py-2 text-white text-xs">
              <div className="flex items-center space-x-1.5">
                <Zap className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                <span className="font-medium truncate">24/7 Operations</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <TrendingUp className="w-3 h-3 text-green-400 flex-shrink-0" />
                <span className="font-medium">+25% Growth</span>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16"
        >
          {partnerCountries.map((country, index) => (
            <motion.div 
              key={country.city} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              viewport={{ once: true }}
              className={`group bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300 ${
                country.status === 'Headquarters' 
                  ? 'border-2 border-green-500/50 hover:border-green-500/70 ring-2 ring-green-500/20' 
                  : 'border border-white/5 hover:border-white/20'
              }`}
            >
              <div className="relative w-full h-32 md:h-40 rounded-lg md:rounded-xl overflow-hidden mb-3 md:mb-4">
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
                <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 text-white">
                  <div className="text-sm md:text-base font-bold flex items-center gap-1">
                    {country.country}
                    {country.status === 'Headquarters' && <span className="text-xs">🏢</span>}
                  </div>
                  <div className="text-xs opacity-90">{country.city}</div>
                </div>
                {country.status === 'Headquarters' && (
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-green-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
                    HQ
                  </div>
                )}
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <h3 className="font-semibold text-sm md:text-base text-white group-hover:text-white/90 transition-colors line-clamp-2">
                  {country.description}
                </h3>
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-1.5 md:space-x-2 text-white/70 min-w-0">
                    <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="text-xs md:text-sm truncate">{country.status}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 md:space-x-2 text-white/70">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="text-xs md:text-sm whitespace-nowrap">
                      {country.status === 'Headquarters' ? 'Main Base' : 'Partner'}
                    </span>
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse flex-shrink-0 ${
                    country.status === 'Headquarters' ? 'bg-green-600' : 'bg-green-400'
                  }`} />
                  <span className="text-xs text-white/60 truncate">
                    {country.status === 'Headquarters' ? 'Main Operations Center' : 'Active Collaboration'}
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
