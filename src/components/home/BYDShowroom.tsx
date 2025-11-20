'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { 
  Car, 
  Zap, 
  Battery, 
  Gauge,
  Leaf,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Circle,
  Award,
  TrendingUp,
  Clock,
  Shield,
  Eye,
  Maximize2,
  RotateCw,
  Play,
  Camera,
  Navigation,
  Radio,
  Volume2,
  Wind,
  Cpu,
  Wifi
} from 'lucide-react'

const BYD_MODELS = [
  {
    id: 1,
    name: 'BYD Seal',
    category: 'Sedan',
    price: '۱,۲۵۰,۰۰۰,۰۰۰',
    range: '700',
    acceleration: '3.8',
    power: '530',
    battery: '82.5',
    image: '/cars/seal.jpg',
    colors: ['#1a1a2e', '#ffffff', '#c41e3a', '#4a5568'],
    features: ['AWD', 'Autopilot', 'Premium Interior', 'Fast Charge'],
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 2,
    name: 'BYD Tang',
    category: 'SUV',
    price: '۱,۸۵۰,۰۰۰,۰۰۰',
    range: '635',
    acceleration: '4.4',
    power: '517',
    battery: '108.8',
    image: '/cars/tang.jpg',
    colors: ['#000000', '#8b4513', '#4169e1', '#708090'],
    features: ['7-Seater', '4WD', 'Luxury', 'Panoramic Roof'],
    gradient: 'from-orange-600 to-red-500'
  },
  {
    id: 3,
    name: 'BYD Atto 3',
    category: 'Compact SUV',
    price: '۹۸۰,۰۰۰,۰۰۰',
    range: '420',
    acceleration: '7.3',
    power: '204',
    battery: '60.48',
    image: '/cars/atto3.jpg',
    colors: ['#ffffff', '#2c3e50', '#e74c3c', '#16a085'],
    features: ['Smart Tech', 'Eco Mode', 'City Friendly', 'Safe'],
    gradient: 'from-green-600 to-emerald-500'
  },
  {
    id: 4,
    name: 'BYD Han',
    category: 'Luxury Sedan',
    price: '۱,۹۵۰,۰۰۰,۰۰۰',
    range: '610',
    acceleration: '3.9',
    power: '517',
    battery: '85.4',
    image: '/cars/han.jpg',
    colors: ['#1c1c1c', '#f5f5f5', '#8b0000', '#4682b4'],
    features: ['Executive', 'Long Range', 'Premium Sound', 'AI Assistant'],
    gradient: 'from-purple-600 to-pink-500'
  }
]

export default function BYDShowroom() {
  const [selectedCar, setSelectedCar] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [isCharging, setIsCharging] = useState(false)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [viewMode, setViewMode] = useState<'exterior' | 'interior' | '360'>('exterior')
  const [showHotspots, setShowHotspots] = useState(true)
  const [rotation, setRotation] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])
  
  const sectionRef = useRef(null)
  const carRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  const currentCar = BYD_MODELS[selectedCar]

  // Mouse move handler for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carRef.current) return
    const rect = carRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  // Auto rotation for 360 view
  useEffect(() => {
    if (viewMode === '360' && isRotating) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360)
      }, 30)
      return () => clearInterval(interval)
    }
  }, [viewMode, isRotating])
  
  const nextCar = () => {
    setSelectedCar((prev) => (prev + 1) % BYD_MODELS.length)
    setSelectedColor(0)
  }
  
  const prevCar = () => {
    setSelectedCar((prev) => (prev - 1 + BYD_MODELS.length) % BYD_MODELS.length)
    setSelectedColor(0)
  }

  const startCharging = () => {
    setIsCharging(true)
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsCharging(false)
          return 100
        }
        return prev + 1
      })
    }, 50)
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-[#76193A]/20 via-purple-500/10 to-transparent rounded-full blur-3xl"
        />
        
        {/* Electric Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-6"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-xl px-6 py-3 rounded-full border border-blue-400/40 shadow-lg shadow-blue-500/20">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Zap className="w-6 h-6 text-blue-400 fill-blue-400" />
                </motion.div>
                <span className="text-blue-400 font-bold tracking-wide text-lg">BYD Electric Vehicles</span>
              </div>
            </div>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Future of
            <span className="block mt-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
              Electric Mobility
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
            Experience the pinnacle of electric vehicle technology with BYD
          </p>
        </motion.div>

        {/* Main Showroom */}
        <div className="max-w-7xl mx-auto">
          {/* Premium Car Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative mb-16 group"
          >
            {/* Multi-layer Glow */}
            <div className={`absolute -inset-2 bg-gradient-to-r ${currentCar.gradient} rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
            <div className={`absolute -inset-1 bg-gradient-to-r ${currentCar.gradient} rounded-[3rem] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-3xl rounded-[3rem] border-2 border-white/30 shadow-2xl overflow-hidden">
              {/* Top Control Bar */}
              <div className="absolute top-0 inset-x-0 z-30 p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode('exterior')}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                        viewMode === 'exterior'
                          ? 'bg-white/20 text-white border-2 border-white/40'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Eye className="w-4 h-4 inline mr-2" />
                      Exterior
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode('interior')}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                        viewMode === 'interior'
                          ? 'bg-white/20 text-white border-2 border-white/40'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Camera className="w-4 h-4 inline mr-2" />
                      Interior
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setViewMode('360')
                        setIsRotating(!isRotating)
                      }}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                        viewMode === '360'
                          ? 'bg-white/20 text-white border-2 border-white/40'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <RotateCw className={`w-4 h-4 inline mr-2 ${isRotating ? 'animate-spin' : ''}`} />
                      360°
                    </motion.button>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowHotspots(!showHotspots)}
                    className="px-4 py-2 rounded-xl font-semibold text-sm bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <Maximize2 className="w-4 h-4 inline mr-2" />
                    {showHotspots ? 'Hide' : 'Show'} Features
                  </motion.button>
                </div>
              </div>

              {/* 3D Car Display */}
              <div 
                ref={carRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                  mouseX.set(0)
                  mouseY.set(0)
                }}
                className="relative h-[600px] flex items-center justify-center p-12 pt-24"
                style={{ perspective: '1000px' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCar}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {/* 3D Car with Parallax */}
                    <div className="relative w-full max-w-5xl">
                      <motion.div
                        style={{
                          rotateX: viewMode === 'exterior' ? rotateX : 0,
                          rotateY: viewMode === '360' ? rotation : (viewMode === 'exterior' ? rotateY : 0),
                          transformStyle: 'preserve-3d'
                        }}
                        animate={{
                          y: viewMode === 'exterior' ? [0, -15, 0] : 0,
                          scale: viewMode === 'interior' ? 1.3 : 1
                        }}
                        transition={{
                          y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          },
                          scale: { duration: 0.6 }
                        }}
                        className="relative"
                      >
                        {/* Main Car */}
                        <div className="relative">
                          <Car 
                            className="w-full h-auto text-transparent drop-shadow-2xl"
                            style={{ 
                              stroke: currentCar.colors[selectedColor],
                              strokeWidth: 0.3,
                              filter: `drop-shadow(0 30px 60px ${currentCar.colors[selectedColor]}40)`,
                              transform: 'scale(1.2)'
                            }}
                            size={500}
                          />
                          
                          {/* Reflection Effect */}
                          <motion.div
                            className="absolute inset-x-0 -bottom-20 h-40"
                            style={{
                              background: `linear-gradient(to bottom, ${currentCar.colors[selectedColor]}15 0%, transparent 100%)`,
                              transform: 'scaleY(-0.6)',
                              filter: 'blur(20px)',
                              opacity: 0.5
                            }}
                          />

                          {/* Dynamic Glow */}
                          <motion.div 
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.4, 0.6, 0.4]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity
                            }}
                            className="absolute inset-0 blur-3xl -z-10"
                            style={{
                              background: `radial-gradient(ellipse at center, ${currentCar.colors[selectedColor]}60 0%, transparent 70%)`
                            }}
                          />
                        </div>
                      
                        {/* Interactive Hotspots */}
                        <AnimatePresence>
                          {showHotspots && viewMode === 'exterior' && (
                            <>
                              {/* Front Headlight */}
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1.2 }}
                                className="absolute top-[40%] left-[15%] cursor-pointer group"
                              >
                                <div className="relative">
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.3, 1],
                                      opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity
                                    }}
                                    className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full blur-xl"
                                  />
                                  <div className="relative w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center border-2 border-white/40">
                                    <Zap className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-black/90 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20 whitespace-nowrap">
                                      <p className="text-white text-sm font-semibold">LED Matrix Headlights</p>
                                      <p className="text-white/60 text-xs">Adaptive & Intelligent</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>

                              {/* Battery/Engine */}
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ scale: 1.2 }}
                                className="absolute top-[50%] left-[35%] cursor-pointer group"
                              >
                                <div className="relative">
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.3, 1],
                                      opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: 0.3
                                    }}
                                    className="absolute inset-0 w-8 h-8 bg-green-400 rounded-full blur-xl"
                                  />
                                  <div className="relative w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white/40">
                                    <Battery className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-black/90 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20 whitespace-nowrap">
                                      <p className="text-white text-sm font-semibold">Blade Battery</p>
                                      <p className="text-white/60 text-xs">{currentCar.battery} kWh - Ultra Safe</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>

                              {/* Wheels/Performance */}
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ scale: 1.2 }}
                                className="absolute top-[65%] left-[50%] cursor-pointer group"
                              >
                                <div className="relative">
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.3, 1],
                                      opacity: [0.5, 1, 0.5],
                                      rotate: 360
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: 0.6,
                                      rotate: { duration: 3, ease: "linear", repeat: Infinity }
                                    }}
                                    className="absolute inset-0 w-8 h-8 bg-orange-400 rounded-full blur-xl"
                                  />
                                  <div className="relative w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center border-2 border-white/40">
                                    <Gauge className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-black/90 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20 whitespace-nowrap">
                                      <p className="text-white text-sm font-semibold">Performance Mode</p>
                                      <p className="text-white/60 text-xs">0-100 in {currentCar.acceleration}s</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>

                              {/* Smart Tech */}
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ scale: 1.2 }}
                                className="absolute top-[35%] right-[25%] cursor-pointer group"
                              >
                                <div className="relative">
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.3, 1],
                                      opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: 0.9
                                    }}
                                    className="absolute inset-0 w-8 h-8 bg-purple-400 rounded-full blur-xl"
                                  />
                                  <div className="relative w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center border-2 border-white/40">
                                    <Cpu className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-black/90 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20 whitespace-nowrap">
                                      <p className="text-white text-sm font-semibold">AI Pilot System</p>
                                      <p className="text-white/60 text-xs">Level 2+ Autopilot</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      
                      {/* Enhanced Electric Particles */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0, 0.8, 0],
                            x: [0, (i % 2 === 0 ? 120 : -120)],
                            y: [0, -60 + (i % 3) * 20],
                            scale: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeOut"
                          }}
                          className="absolute pointer-events-none"
                          style={{
                            left: `${10 + i * 8}%`,
                            top: `${40 + (i % 4) * 10}%`,
                            zIndex: i % 2 === 0 ? 10 : 1
                          }}
                        >
                          <Zap 
                            className="text-cyan-400 drop-shadow-lg" 
                            style={{
                              filter: `drop-shadow(0 0 ${4 + i % 3}px cyan)`,
                              width: `${16 + i % 2 * 8}px`,
                              height: `${16 + i % 2 * 8}px`
                            }}
                          />
                        </motion.div>
                      ))}

                      {/* Speed Lines Effect */}
                      {viewMode === 'exterior' && (
                        <>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={`line-${i}`}
                              initial={{ opacity: 0, x: -200 }}
                              animate={{
                                opacity: [0, 0.6, 0],
                                x: [-200, 600],
                                scaleX: [0.5, 1.5, 0.5]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut"
                              }}
                              className="absolute h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                              style={{
                                top: `${35 + i * 5}%`,
                                filter: 'blur(1px)'
                              }}
                            />
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevCar}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-xl"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextCar}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-xl"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Premium Car Info */}
              <div className="relative px-8 py-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 backdrop-blur-sm" />
                
                <div className="relative text-center">
                  <motion.div
                    key={currentCar.name}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6"
                  >
                    <h3 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
                      {currentCar.name}
                    </h3>
                    <div className="inline-flex items-center space-x-3 px-5 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                      <Car className="w-5 h-5 text-white/70" />
                      <span className="text-lg text-white/90 font-semibold">{currentCar.category}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative group mb-8 inline-block"
                  >
                    <div className={`absolute -inset-2 bg-gradient-to-r ${currentCar.gradient} rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl px-8 py-4 rounded-3xl border-2 border-white/30">
                      <div className="text-sm text-white/60 font-medium uppercase tracking-wider mb-1">Starting Price</div>
                      <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${currentCar.gradient} bg-clip-text text-transparent`}>
                        {currentCar.price}
                      </div>
                      <div className="text-sm text-white/50 mt-1">تومان</div>
                    </div>
                  </motion.div>

                  {/* Premium Color Picker */}
                  <div className="mb-6">
                    <p className="text-white/70 text-sm uppercase tracking-wider font-semibold mb-4">Select Color</p>
                    <div className="flex justify-center space-x-4">
                      {currentCar.colors.map((color, index) => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.15, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedColor(index)}
                          className="group relative"
                        >
                          {/* Outer Glow */}
                          {selectedColor === index && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute -inset-2 rounded-full blur-lg"
                              style={{ backgroundColor: color, opacity: 0.6 }}
                            />
                          )}
                          
                          {/* Color Button */}
                          <div className={`relative w-14 h-14 rounded-full transition-all ${
                            selectedColor === index 
                              ? 'ring-4 ring-white ring-offset-4 ring-offset-transparent shadow-2xl' 
                              : 'ring-2 ring-white/20 hover:ring-white/40'
                          }`}
                          style={{ backgroundColor: color }}>
                            {selectedColor === index && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
                              </motion.div>
                            )}
                          </div>
                          
                          {/* Label */}
                          <div className={`mt-2 text-xs font-medium transition-opacity ${
                            selectedColor === index ? 'text-white opacity-100' : 'text-white/40 opacity-0 group-hover:opacity-100'
                          }`}>
                            {index === 0 ? 'Black' : index === 1 ? 'White' : index === 2 ? 'Red' : 'Gray'}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Model Indicators */}
              <div className="flex justify-center items-center space-x-4 pb-8">
                {BYD_MODELS.map((model, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setSelectedCar(index)
                      setSelectedColor(0)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="group relative"
                  >
                    {selectedCar === index && (
                      <motion.div
                        layoutId="activeModel"
                        className={`absolute -inset-3 bg-gradient-to-r ${model.gradient} rounded-full blur-lg opacity-60`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className={`relative w-4 h-4 rounded-full transition-all ${
                      selectedCar === index
                        ? 'bg-white scale-125 ring-4 ring-white/30'
                        : 'bg-white/30 hover:bg-white/60'
                    }`} />
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-black/90 backdrop-blur-xl px-3 py-1 rounded-lg border border-white/20 whitespace-nowrap">
                        <p className="text-white text-xs font-semibold">{model.name}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Specs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: MapPin, label: 'Range', value: `${currentCar.range} km`, color: 'from-green-400 to-emerald-500' },
              { icon: Gauge, label: '0-100 km/h', value: `${currentCar.acceleration}s`, color: 'from-orange-400 to-red-500' },
              { icon: Zap, label: 'Power', value: `${currentCar.power} hp`, color: 'from-yellow-400 to-orange-500' },
              { icon: Battery, label: 'Battery', value: `${currentCar.battery} kWh`, color: 'from-blue-400 to-cyan-500' }
            ].map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="group relative"
              >
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${spec.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity`} />
                
                <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/0 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${spec.color} flex items-center justify-center shadow-lg mx-auto mb-4`}>
                    <spec.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`text-3xl font-black bg-gradient-to-r ${spec.color} bg-clip-text text-transparent mb-2`}>
                    {spec.value}
                  </div>
                  <div className="text-white/70 text-sm font-medium uppercase tracking-wide">{spec.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features & Benefits */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative group"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-8 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Premium Features</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {currentCar.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-2 p-3 bg-white/5 rounded-xl border border-white/10"
                    >
                      <Shield className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <span className="text-white/90 text-sm font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Battery Charging Demo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-green-500/40 to-cyan-500/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-8 border-2 border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">Battery Status</h3>
                      <p className="text-sm text-white/60">Fast charging capability</p>
                    </div>
                  </div>
                  <div className={`text-4xl font-black ${
                    batteryLevel > 80 ? 'text-green-400' :
                    batteryLevel > 50 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {batteryLevel}%
                  </div>
                </div>

                {/* Battery Bar */}
                <div className="relative h-20 bg-white/5 rounded-2xl overflow-hidden border border-white/10 mb-6">
                  <motion.div
                    animate={{ width: `${batteryLevel}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full bg-gradient-to-r ${
                      batteryLevel > 80 ? 'from-green-400 to-emerald-500' :
                      batteryLevel > 50 ? 'from-yellow-400 to-orange-500' :
                      'from-red-400 to-orange-500'
                    } relative`}
                  >
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }}
                      className="absolute inset-0 bg-white/20"
                    />
                  </motion.div>
                  
                  {/* Charging Animation */}
                  {isCharging && (
                    <motion.div
                      animate={{
                        x: [-20, 400],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute top-1/2 -translate-y-1/2"
                    >
                      <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startCharging}
                  disabled={isCharging || batteryLevel >= 100}
                  className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${
                    isCharging || batteryLevel >= 100
                      ? 'bg-white/10 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 shadow-lg shadow-green-500/30'
                  }`}
                >
                  {isCharging ? 'Charging...' : batteryLevel >= 100 ? 'Fully Charged' : 'Start Fast Charging'}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Environmental Impact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400/30 via-emerald-500/30 to-green-600/30 rounded-[2rem] blur-2xl opacity-75 transition-opacity" />
            
            <div className="relative bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-2xl rounded-[2rem] p-10 border-2 border-white/20">
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="inline-block mb-4"
                >
                  <Leaf className="w-16 h-16 text-green-400 mx-auto" />
                </motion.div>
                <h3 className="text-3xl font-black text-white mb-2">Environmental Impact</h3>
                <p className="text-white/70">Every kilometer driven with BYD makes a difference</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'CO₂ Saved Annually', value: '4.6', unit: 'tons', icon: Leaf, color: 'from-green-400 to-emerald-500' },
                  { label: 'Fuel Cost Saved', value: '85', unit: '%', icon: TrendingUp, color: 'from-blue-400 to-cyan-500' },
                  { label: 'Trees Equivalent', value: '208', unit: 'trees', icon: Award, color: 'from-yellow-400 to-orange-500' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                  >
                    <stat.icon className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                    <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60 mb-1">{stat.unit}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wide">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
