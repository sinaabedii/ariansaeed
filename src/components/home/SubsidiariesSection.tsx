'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules'
import { SUBSIDIARY_COMPANIES } from '@/lib/constants'
import { ExternalLink, X } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

export default function SubsidiariesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedCompany, setSelectedCompany] = useState<typeof SUBSIDIARY_COMPANIES[0] | null>(null)

  return (
    <>
      <section ref={ref} className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: `${300 + i * 200}px`,
                height: `${300 + i * 200}px`,
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-6 py-2 bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-lg text-white rounded-full text-sm font-semibold mb-4 border border-primary/30"
            >
              Our Companies
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
            >
              Subsidiary Companies
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              Leading companies under the Arian Saeed Holding umbrella
            </motion.p>
          </div>

          {/* Swiper Slider */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 15,
                stretch: 0,
                depth: 200,
                modifier: 1.5,
                slideShadows: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              loop={true}
              speed={800}
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              className="!pb-16"
            >
              {SUBSIDIARY_COMPANIES.map((company) => (
                <SwiperSlide key={company.id} className="!h-auto">
                  <motion.div
                    onClick={() => setSelectedCompany(company)}
                    className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer border border-white/10 hover:border-primary/50 h-full flex flex-col"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    
                    {/* Logo Container */}
                    <div className="relative aspect-square w-full mb-6 rounded-2xl bg-white/95 backdrop-blur-sm p-6 flex items-center justify-center overflow-hidden group-hover:bg-white transition-colors duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        sizes="(max-width: 768px) 200px, (max-width: 1024px) 150px, 200px"
                        quality={90}
                        loading="lazy"
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Company Info */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors mb-2 text-center">
                        {company.name}
                      </h3>
                      <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors text-center">
                        {company.description}
                      </p>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Styling */}
            <style jsx global>{`
              .swiper-button-next,
              .swiper-button-prev {
                color: white !important;
                background: rgba(255, 255, 255, 0.1) !important;
                backdrop-filter: blur(10px) !important;
                width: 50px !important;
                height: 50px !important;
                border-radius: 50% !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                transition: all 0.3s ease !important;
              }
              
              .swiper-button-next:hover,
              .swiper-button-prev:hover {
                background: rgba(255, 255, 255, 0.2) !important;
                border-color: rgba(255, 255, 255, 0.4) !important;
                transform: scale(1.1) !important;
              }
              
              .swiper-button-next:after,
              .swiper-button-prev:after {
                font-size: 20px !important;
              }
              
              .swiper-pagination-bullet {
                background: white !important;
                opacity: 0.3 !important;
                width: 10px !important;
                height: 10px !important;
                transition: all 0.3s ease !important;
              }
              
              .swiper-pagination-bullet-active {
                opacity: 1 !important;
                width: 30px !important;
                border-radius: 5px !important;
                background: linear-gradient(to right, #4F46E5, #7C3AED) !important;
              }
            `}</style>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Modal */}
      {selectedCompany && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedCompany(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl"
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all hover:rotate-90 duration-300"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center mb-6">
              <div className="relative w-32 h-32 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6 overflow-hidden">
                <Image
                  src={selectedCompany.logo}
                  alt={selectedCompany.name}
                  fill
                  sizes="128px"
                  quality={90}
                  className="object-contain p-6"
                />
              </div>
              <h3 className="text-3xl font-heading font-bold text-gray-900 mb-3">
                {selectedCompany.name}
              </h3>
              <p className="text-gray-600 text-lg">
                {selectedCompany.description}
              </p>
            </div>

            <a
              href={selectedCompany.website}
              className="flex items-center justify-center space-x-2 w-full py-4 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
