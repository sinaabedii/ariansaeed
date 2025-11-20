'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState, useRef } from 'react'
import { Sun, Zap, Activity, Droplets, Wind, ThermometerSun } from 'lucide-react'

interface SolarCell {
  id: number
  x: number
  y: number
  active: boolean
  energy: number
}

const technologies = [
  {
    icon: Sun,
    title: 'Photovoltaic Conversion',
    description: 'Direct conversion of sunlight into electricity through semiconductor materials',
    color: 'from-yellow-400 to-orange-500',
    stat: '22.8%',
    label: 'Efficiency',
  },
  {
    icon: Activity,
    title: 'MPPT Technology',
    description: 'Maximum Power Point Tracking for optimal energy harvest in all conditions',
    color: 'from-blue-400 to-cyan-500',
    stat: '99.5%',
    label: 'Tracking',
  },
  {
    icon: ThermometerSun,
    title: 'Temperature Management',
    description: 'Advanced cooling systems maintaining peak performance even in extreme heat',
    color: 'from-red-400 to-pink-500',
    stat: '85°C',
    label: 'Max Temp',
  },
  {
    icon: Droplets,
    title: 'Weather Resistant',
    description: 'IP68 rated protection against water, dust, and environmental factors',
    color: 'from-teal-400 to-green-500',
    stat: 'IP68',
    label: 'Rating',
  },
]

export default function SolarCellInteractive() {
  const [activeCell, setActiveCell] = useState<number | null>(null)
  const [energyFlow, setEnergyFlow] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { stiffness: 300, damping: 30 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const generateSolarCells = (): SolarCell[] => {
    const cells: SolarCell[] = []
    const cols = 8
    const rows = 6
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        cells.push({
          id: i * cols + j,
          x: j,
          y: i,
          active: Math.random() > 0.3,
          energy: Math.random() * 100,
        })
      }
    }
    return cells
  }

  const [cells] = useState(generateSolarCells())

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-yellow-200/20 to-orange-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-200/20 to-cyan-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 backdrop-blur-sm rounded-full mb-6 border border-blue-500/20">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
              Interactive Technology Demo
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-gray-900">How Our</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Solar Cells Work
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Experience the power of advanced photovoltaic technology through our interactive demonstration
          </p>
        </motion.div>

        {/* Interactive Solar Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl"
          >
            {/* Solar Panel Grid */}
            <div className="relative">
              <div className="grid grid-cols-8 gap-2 md:gap-3 mb-8">
                {cells.map((cell, index) => (
                  <motion.div
                    key={cell.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.01 }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    onHoverStart={() => {
                      setActiveCell(cell.id)
                      setEnergyFlow(cell.energy)
                    }}
                    onHoverEnd={() => setActiveCell(null)}
                    className="aspect-square cursor-pointer relative group"
                  >
                    <motion.div
                      animate={{
                        backgroundColor: cell.active
                          ? [
                              'rgba(251, 191, 36, 0.3)',
                              'rgba(251, 146, 60, 0.5)',
                              'rgba(251, 191, 36, 0.3)',
                            ]
                          : 'rgba(75, 85, 99, 0.3)',
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                      className="w-full h-full rounded-lg border border-gray-700 relative overflow-hidden"
                      style={{
                        boxShadow: cell.active
                          ? '0 0 20px rgba(251, 191, 36, 0.5)'
                          : 'none',
                      }}
                    >
                      {/* Cell Grid Pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:8px_8px]" />
                      
                      {/* Energy Indicator */}
                      {cell.active && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                        </motion.div>
                      )}

                      {/* Hover Glow */}
                      {activeCell === cell.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-yellow-400/50 to-orange-500/50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </motion.div>

                    {/* Tooltip */}
                    {activeCell === cell.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap z-20 border border-gray-700 shadow-xl"
                      >
                        <div className="font-bold">Cell #{cell.id}</div>
                        <div className="text-yellow-400">{cell.energy.toFixed(1)}W</div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 border-r border-b border-gray-700" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Energy Flow Visualization */}
              <div className="flex items-center justify-between p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg"
                  >
                    <Sun className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Total Power Output</div>
                    <div className="text-2xl font-bold text-white">
                      {cells.filter(c => c.active).reduce((sum, c) => sum + c.energy, 0).toFixed(0)}W
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-cyan-400" />
                  <div className="text-sm text-gray-400">Optimal Conditions</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <div className="text-sm text-gray-400">System Active</div>
                </div>
              </div>
            </div>

            {/* Floating Energy Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  initial={{
                    x: Math.random() * 100 + '%',
                    y: '100%',
                    opacity: 0,
                  }}
                  animate={{
                    y: '-10%',
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                  }}
                />
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${tech.color} mb-4 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {tech.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {tech.description}
                  </p>

                  <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                        style={{
                          backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        }}
                      >
                        {tech.stat}
                      </div>
                      <div className="text-xs text-gray-500">{tech.label}</div>
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`w-2 h-2 rounded-full bg-gradient-to-br ${tech.color}`}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all"
            >
              Request a Quote
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white border-2 border-gray-900 rounded-full font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-lg"
            >
              Download Brochure
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
