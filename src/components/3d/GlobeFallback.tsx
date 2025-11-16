'use client'

import { motion } from 'framer-motion'
import { Globe, MapPin, Loader } from 'lucide-react'

export default function GlobeFallback() {
  return (
    <div className="w-full h-full bg-transparent flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>
      
      {/* Rotating gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(118, 25, 58, 0.5) 0%, transparent 50%),
                           radial-gradient(circle at 70% 70%, rgba(118, 25, 58, 0.3) 0%, transparent 50%)`,
        }} />
      </motion.div>
      
      {/* Loading animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        {/* Spinning Globe Icon */}
        <motion.div
          animate={{ 
            rotateY: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mb-6"
        >
          <Globe className="w-16 h-16 md:w-20 md:h-20 text-primary-300" />
        </motion.div>
        
        {/* Loading Text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-4"
        >
          <h3 className="text-lg md:text-xl font-semibold mb-1">Loading Globe...</h3>
          <p className="text-xs md:text-sm text-white/60">Preparing 3D Earth visualization</p>
        </motion.div>
        
        {/* Progress Bar */}
        <div className="w-48 md:w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        </div>
        
        {/* Info Icons */}
        <div className="flex items-center justify-center space-x-3 md:space-x-4 text-xs md:text-sm text-white/50">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>11 Countries</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="flex items-center space-x-1.5">
            <Loader className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>High Quality</span>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )
}
