'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ArticlesHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80"
          alt="Articles and Insights"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-700/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-heading font-bold mb-6"
        >
          Articles & <span className="text-white/90">Insights</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl max-w-2xl mx-auto"
        >
          Stay informed with our latest insights, industry analysis, and thought leadership on business innovation and market trends.
        </motion.p>
      </div>
    </section>
  )
}
