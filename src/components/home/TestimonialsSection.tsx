'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamically import modal for better code splitting
const TestimonialModal = dynamic(() => import('./TestimonialModal'), {
  ssr: false,
  loading: () => null
})

const testimonials = [
  {
    id: 1,
    name: 'Michael Chen',
    position: 'CEO, Global Furniture Co.',
    company: 'United States',
    image: '/images/_SMH3265.jpg',
    rating: 5,
    text: 'Arian Saeed\'s MDF products have consistently exceeded our quality expectations. Their commitment to using German technology is evident in every shipment.',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    position: 'Procurement Director',
    company: 'European Design Ltd.',
    image: '/images/DSC00426.JPG',
    rating: 5,
    text: 'Working with Arian Saeed has been a game-changer for our business. Their export services are seamless and the product quality is world-class.',
  },
  {
    id: 3,
    name: 'Ahmed Al-Rashid',
    position: 'General Manager',
    company: 'Middle East Construction',
    image: '/images/1.jpg',
    rating: 5,
    text: 'The professionalism and innovation shown by Arian Saeed is remarkable. Their diverse business domains make them a reliable partner.',
  },
  {
    id: 4,
    name: 'Emma Schmidt',
    position: 'Head of Sustainability',
    company: 'Green Building Initiative',
    image: '/images/2.jpg',
    rating: 5,
    text: 'Their commitment to sustainability while maintaining production excellence is impressive. True leaders in the industry.',
  },
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
          >
            Client Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4"
          >
            What Our Partners Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6"
          >
            Trusted by global leaders across multiple industries
          </motion.p>
          
          {/* Add Testimonial Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>Share Your Experience</span>
            </button>
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Background Decoration */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Quote className="w-10 h-10 text-primary" />
            </div>

            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
              {/* Image */}
              <motion.div
                key={`image-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto md:mx-0"
              >
                <div className="relative w-40 h-40 md:w-48 md:h-48">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    fill
                    sizes="(max-width: 768px) 160px, 192px"
                    quality={85}
                    loading="lazy"
                    className="object-cover rounded-2xl"
                  />
                  {/* Rating Badge */}
                  <div className="absolute -bottom-3 -right-3 bg-primary text-white px-3 py-2 rounded-xl shadow-lg flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{testimonials[currentIndex].rating}.0</span>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                key={`content-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  &quot;{testimonials[currentIndex].text}&quot;
                </p>

                {/* Author */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-primary font-semibold">
                    {testimonials[currentIndex].position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={prev}
                className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary rounded-xl transition-colors group"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary rounded-xl transition-colors group"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Modal - Code Split */}
        <TestimonialModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </section>
  )
}
