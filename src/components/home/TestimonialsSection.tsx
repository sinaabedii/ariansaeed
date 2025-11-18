'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight, Plus, X, Send, User, Briefcase, Building2, MessageSquare } from 'lucide-react'
import Image from 'next/image'

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
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    rating: 5,
    text: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Reset form and close modal
    setFormData({ name: '', position: '', company: '', rating: 5, text: '' })
    setIsSubmitting(false)
    setIsModalOpen(false)
    
    // Show success message (you can add a toast notification here)
    alert('Thank you for your feedback! Your testimonial has been submitted.')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating })
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

        {/* Modal for Adding Testimonial */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              
              {/* Modal */}
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 my-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>

                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <MessageSquare className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
                        Share Your Experience
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 ml-[60px]">
                      Your feedback helps us improve and inspires others
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Position Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          <User className="w-4 h-4 text-primary" />
                          <span>Full Name</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          <Briefcase className="w-4 h-4 text-primary" />
                          <span>Position</span>
                        </label>
                        <input
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          required
                          placeholder="CEO, Manager, etc."
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span>Company / Country</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        placeholder="Company Name or Country"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        <Star className="w-4 h-4 text-primary" />
                        <span>Rating</span>
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleRatingChange(rating)}
                            className="group transition-transform hover:scale-110 active:scale-95"
                          >
                            <Star
                              className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${
                                rating <= formData.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-3 text-lg font-bold text-gray-900 dark:text-white">
                          {formData.rating}.0
                        </span>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <Quote className="w-4 h-4 text-primary" />
                        <span>Your Testimonial</span>
                      </label>
                      <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Share your experience working with us..."
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-gray-900 dark:text-white placeholder-gray-400"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formData.text.length} characters
                      </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Submit Testimonial</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
