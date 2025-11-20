'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Send, User, Briefcase, Building2, MessageSquare, Star, Quote } from 'lucide-react'

interface TestimonialModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    rating: 5,
    text: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Reset form and close modal
    setFormData({ name: '', position: '', company: '', rating: 5, text: '' })
    setIsSubmitting(false)
    onClose()
    
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 md:p-6 lg:p-8 my-4 sm:my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Header */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                  <div className="p-2 sm:p-2.5 md:p-3 bg-primary/10 rounded-lg sm:rounded-xl">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading font-bold text-gray-900 dark:text-white">
                    Share Your Experience
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 ml-[44px] sm:ml-[52px] md:ml-[60px]">
                  Your feedback helps us improve
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
                {/* Name & Position Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                      <span>Position</span>
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      placeholder="CEO, Manager, etc."
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    <span>Company / Country</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    placeholder="Company Name or Country"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    <span>Rating</span>
                  </label>
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingChange(rating)}
                        className="group transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-colors ${
                            rating <= formData.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 sm:ml-3 text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                      {formData.rating}.0
                    </span>
                  </div>
                </div>

                {/* Testimonial Text */}
                <div>
                  <label className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                    <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    <span>Your Testimonial</span>
                  </label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder="Share your experience working with us..."
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formData.text.length} characters
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={onClose}
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
  )
}
