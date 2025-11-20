'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, FileText, User, Mail, Phone, Briefcase, MapPin, Award, CheckCircle2 } from 'lucide-react'
import { useState, useRef } from 'react'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle?: string
}

export default function ResumeModal({ isOpen, onClose, jobTitle }: ResumeModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: jobTitle || '',
    location: '',
    experience: '',
    coverLetter: '',
  })
  
  const [fileName, setFileName] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: jobTitle || '',
        location: '',
        experience: '',
        coverLetter: '',
      })
      setFileName('')
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative bg-white rounded-xl sm:rounded-3xl shadow-2xl max-w-3xl w-full my-1 sm:my-8 overflow-hidden max-h-[98vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success State */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-3 sm:p-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <div className="w-14 h-14 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-3 sm:mb-6 shadow-lg">
                        <CheckCircle2 className="w-7 h-7 sm:w-12 sm:h-12 text-white" />
                      </div>
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-3 text-center"
                    >
                      Resume Submitted!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xs sm:text-base text-gray-600 text-center max-w-md px-4"
                    >
                      Thank you! Our HR team will review your application soon.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-700 p-3 sm:p-6 md:p-8 text-white overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative">
                  <button
                    onClick={onClose}
                    className="absolute top-0 right-0 p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-4">
                    <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Briefcase className="w-4 h-4 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-2xl md:text-3xl font-heading font-bold leading-tight">Submit Resume</h2>
                      {jobTitle && (
                        <p className="text-white/90 text-[10px] sm:text-sm mt-0.5 sm:mt-1 line-clamp-1">Applying for: {jobTitle}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-white/90 text-[10px] sm:text-sm leading-snug">
                    Join Arian Saeed family
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-3 sm:p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-2 sm:gap-4 md:gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        Full Name *
                      </div>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-2.5 py-1.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        Email Address *
                      </div>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-2.5 py-1.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        Phone Number *
                      </div>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-2.5 py-1.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="+98 912 345 6789"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        Desired Position *
                      </div>
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="w-full px-2.5 py-1.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g., Software Engineer"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        Location *
                      </div>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-2.5 py-1.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Tehran, Iran"
                    />
                  </div>
                  {/* Years of Experience */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        Years of Experience *
                      </div>
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full px-2.5 py-1.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="mt-2 sm:mt-4 md:mt-6">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      Cover Letter
                    </div>
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-2.5 py-1.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Tell us why you're a great fit..."
                  />
                </div>

                {/* File Upload */}
                <div className="mt-2 sm:mt-4 md:mt-6">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Upload className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      Upload Resume/CV *
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-2.5 py-2.5 sm:px-4 sm:py-4 rounded-lg sm:rounded-xl border-2 border-dashed border-gray-300 hover:border-primary transition-colors flex flex-col items-center justify-center gap-1 sm:gap-2 bg-gray-50 hover:bg-primary/5"
                    >
                      {fileName ? (
                        <>
                          <FileText className="w-5 h-5 sm:w-8 sm:h-8 text-primary" />
                          <span className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-full px-2">{fileName}</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">Click to change</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 sm:w-8 sm:h-8 text-gray-400" />
                          <span className="text-xs sm:text-sm font-medium text-gray-600">
                            Upload resume
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500">PDF, DOC, DOCX</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-3 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 sm:px-6 sm:py-3 md:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 sm:px-6 sm:py-3 md:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span className="text-sm sm:text-base">Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Submit Application</span>
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
