'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO, TechVision Inc.',
    company: 'TechVision Inc.',
    image: '/images/3.jpg',
    content: 'Arian Saeed Holding transformed our business with their strategic vision and innovative approach. Their investment and guidance helped us scale from a startup to a market leader.',
    rating: 5,
    project: 'Digital Transformation Initiative',
    result: '300% revenue growth',
    industry: 'Technology'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Founder, GreenEnergy Solutions',
    company: 'GreenEnergy Solutions',
    image: '/images/4.jpg',
    content: 'The partnership with Arian Saeed has been transformative. Their deep industry knowledge and global network opened doors we never thought possible.',
    rating: 5,
    project: 'Renewable Energy Expansion',
    result: '50+ new markets entered',
    industry: 'Energy'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    position: 'Director, HealthTech Innovations',
    company: 'HealthTech Innovations',
    image: '/images/DJI_0006.JPG',
    content: 'Working with Arian Saeed Holding has been exceptional. Their commitment to excellence and innovation aligns perfectly with our mission to revolutionize healthcare.',
    rating: 5,
    project: 'AI-Powered Healthcare Platform',
    result: '1M+ patients served',
    industry: 'Healthcare'
  },
  {
    id: 4,
    name: 'David Park',
    position: 'Managing Director, FinanceFlow',
    company: 'FinanceFlow',
    image: '/images/DSC_0030.JPG',
    content: 'The strategic guidance and financial expertise provided by Arian Saeed enabled us to navigate complex market challenges and emerge stronger than ever.',
    rating: 5,
    project: 'Fintech Platform Development',
    result: '$100M+ transactions processed',
    industry: 'Finance'
  }
]

export default function SuccessStoriesSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our strategic partnerships and innovative solutions have transformed businesses across industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Featured Testimonial */}
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 shadow-lg">
              <Quote className="w-12 h-12 text-primary mb-6" />
              
              <blockquote className="text-lg text-gray-700 mb-8 leading-relaxed">
                &ldquo;{testimonials[activeTestimonial].content}&rdquo;
              </blockquote>

              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    fill
                    sizes="64px"
                    quality={85}
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {testimonials[activeTestimonial].position}
                  </p>
                  <p className="text-primary text-sm font-medium">
                    {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Project</div>
                  <div className="font-semibold text-gray-900">
                    {testimonials[activeTestimonial].project}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Result</div>
                  <div className="font-semibold text-primary">
                    {testimonials[activeTestimonial].result}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial List */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveTestimonial(index)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                  activeTestimonial === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      quality={85}
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      activeTestimonial === index ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${
                      activeTestimonial === index ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      {testimonial.company}
                    </p>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                      activeTestimonial === index 
                        ? 'bg-white/20 text-white' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {testimonial.industry}
                    </div>
                  </div>
                  <ArrowRight className={`w-5 h-5 ${
                    activeTestimonial === index ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
            Start Your Success Story
          </button>
        </motion.div>
      </div>
    </section>
  )
}
