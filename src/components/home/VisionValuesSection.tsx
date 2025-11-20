'use client'

import { motion } from 'framer-motion'
import { Cog, Zap, Shield, TreePine, Users, Globe2, Factory, Sparkles } from 'lucide-react'
import Image from 'next/image'

const values = [
  {
    icon: Cog,
    title: 'German Technology',
    description: 'Production powered by cutting-edge Western European technology, especially from Germany, ensuring world-class quality in every panel.',
    image: '/images/1.jpg',
    gradient: 'from-slate-600 to-slate-800',
    number: '01',
    stat: '99.9% Quality'
  },
  {
    icon: Factory,
    title: '12 Production Lines',
    description: 'Six cellulose factories with 12 production lines, backed by two chemical factories ensuring optimal production capacity.',
    image: '/images/2.jpg',
    gradient: 'from-blue-600 to-cyan-600',
    number: '02',
    stat: '24/7 Operations'
  },
  {
    icon: TreePine,
    title: 'Sustainable Wood',
    description: '7,000 years of Iranian carpentry heritage combined with modern environmental protection and sustainable arboriculture practices.',
    image: '/images/3.jpg',
    gradient: 'from-green-600 to-emerald-600',
    number: '03',
    stat: 'Eco-Certified'
  },
  {
    icon: Shield,
    title: 'Premium Durability',
    description: 'Robust and strong MDF products built to withstand time, delivering unmatched reliability for construction and furniture applications.',
    image: '/images/4.jpg',
    gradient: 'from-orange-600 to-red-600',
    number: '04',
    stat: '50+ Years Life'
  },
  {
    icon: Globe2,
    title: 'Global Export',
    description: 'Prosperous international supply to diverse markets worldwide with Sina MDF products meeting world-class standards.',
    image: '/images/1O0A6321.JPG',
    gradient: 'from-purple-600 to-indigo-600',
    number: '05',
    stat: '50+ Countries'
  },
  {
    icon: Users,
    title: '1,500 Expert Team',
    description: 'Highly educated production staff trained by European experts, bringing decades of knowledge and precision to every product.',
    image: '/images/1O0A6342.JPG',
    gradient: 'from-pink-600 to-rose-600',
    number: '06',
    stat: 'EU Trained'
  },
  {
    icon: Zap,
    title: 'Rapid Delivery',
    description: 'Express logistics and efficient supply chain ensuring fast delivery of products to meet customer needs promptly.',
    image: '/images/DSC_0030.JPG',
    gradient: 'from-yellow-600 to-amber-600',
    number: '07',
    stat: '48H Delivery'
  },
  {
    icon: Sparkles,
    title: 'Cost-Effective',
    description: 'Economic solutions providing the best value without compromising on quality, supported by efficient production processes.',
    image: '/images/_SMH3265.jpg',
    gradient: 'from-teal-600 to-cyan-600',
    number: '08',
    stat: 'Best Value'
  }
]

export default function VisionValuesSection() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Particles - Optimized count */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full backdrop-blur-lg">
              <span className="text-primary font-semibold">Why Choose ASIGI?</span>
            </div>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 sm:mb-5 md:mb-6">
            Excellence in <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Every Detail</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto leading-relaxed px-4">
            42 years of innovation, 12 production lines, and 1,500 expert professionals delivering world-class MDF products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl hover:shadow-primary/20">
                
                {/* Number Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-xs sm:text-sm">{value.number}</span>
                  </div>
                </div>

                {/* Stat Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20"
                >
                  <div className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-lg rounded-full border border-white/30">
                    <span className="text-white text-[10px] sm:text-xs font-semibold whitespace-nowrap">{value.stat}</span>
                  </div>
                </motion.div>

                {/* Image Section with Icon */}
                <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={80}
                    loading="lazy"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-90 group-hover:opacity-80 transition-opacity duration-500`} />
                  
                  {/* Icon with Animation */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center border border-white/30 shadow-2xl">
                      <value.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  </motion.div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                
                {/* Content Section */}
                <div className="p-4 sm:p-5 md:p-6 relative">
                  {/* Decorative Line */}
                  <div className={`h-0.5 sm:h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r ${value.gradient} mb-3 sm:mb-4 group-hover:w-full transition-all duration-500`} />
                  
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-white text-xs sm:text-sm leading-relaxed">
                    {value.description}
                  </p>

                  {/* Hover Indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-2 mt-3 sm:mt-4 text-primary"
                  >
                    <span className="text-xs sm:text-sm font-semibold">Learn More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Glow Effect on Hover */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-14 md:mt-16"
        >
          <p className="text-white mb-4 sm:mb-6 text-sm sm:text-base">Trusted by thousands of customers worldwide</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-primary/50 transition-all text-sm sm:text-base"
            >
              View Products
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-white/10 backdrop-blur-lg text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all text-sm sm:text-base"
            >
              Contact Sales
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
