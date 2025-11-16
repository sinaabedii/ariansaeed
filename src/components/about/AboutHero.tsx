'use client'

import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-heading font-bold mb-6"
        >
          About Arian Saeed Holding
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl max-w-3xl mx-auto"
        >
          Building a sustainable future through innovation, excellence, and commitment to our communities
        </motion.p>
      </div>
    </section>
  )
}
