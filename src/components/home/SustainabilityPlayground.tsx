// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { motion, useInView, AnimatePresence } from 'framer-motion'
// import { 
//   Leaf, 
//   Droplets, 
//   Zap, 
//   Factory,
//   Wind,
//   Sparkles,
//   TrendingUp,
//   Award,
//   Target,
//   RotateCcw
// } from 'lucide-react'

// // Particle component for visual effects
// function Particle({ x, y, type }: { x: number; y: number; type: 'good' | 'bad' }) {
//   return (
//     <motion.div
//       initial={{ opacity: 1, scale: 1, x, y }}
//       animate={{ 
//         opacity: 0, 
//         scale: 0,
//         y: y - 100,
//         x: x + (Math.random() - 0.5) * 50
//       }}
//       transition={{ duration: 2 }}
//       className={`absolute w-2 h-2 rounded-full ${
//         type === 'good' ? 'bg-green-400' : 'bg-red-400'
//       }`}
//       style={{ left: x, top: y }}
//     />
//   )
// }

// // Animated Tree Component
// function AnimatedTree({ height, x }: { height: number; x: number }) {
//   return (
//     <motion.div
//       initial={{ scale: 0, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       className="absolute bottom-0"
//       style={{ left: `${x}%` }}
//     >
//       <motion.div
//         animate={{ 
//           height: `${height}px`,
//           transition: { duration: 0.5 }
//         }}
//         className="relative"
//       >
//         {/* Tree Crown */}
//         <motion.div
//           animate={{ 
//             scale: [1, 1.05, 1],
//           }}
//           transition={{ 
//             duration: 3,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute bottom-0 left-1/2 -translate-x-1/2"
//         >
//           <div className="relative">
//             <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 blur-sm`} 
//                  style={{ transform: `scale(${Math.min(height / 80, 1)})` }} />
//             <div className={`absolute top-0 left-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-300 to-green-500`}
//                  style={{ transform: `scale(${Math.min(height / 80, 1)})` }} />
//           </div>
//         </motion.div>
//         {/* Tree Trunk */}
//         <div className="w-2 bg-gradient-to-b from-amber-700 to-amber-900 mx-auto" 
//              style={{ height: `${height * 0.4}px` }} />
//       </motion.div>
//     </motion.div>
//   )
// }

// // Animated Factory Component
// function AnimatedFactory({ pollution }: { pollution: number }) {
//   return (
//     <div className="absolute bottom-0 left-[10%]">
//       <div className="relative">
//         {/* Smoke particles */}
//         <AnimatePresence>
//           {pollution > 30 && (
//             <>
//               {[...Array(Math.floor(pollution / 20))].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0.7, scale: 0.5, y: 0 }}
//                   animate={{ 
//                     opacity: 0,
//                     scale: 1.5,
//                     y: -100,
//                     x: (Math.random() - 0.5) * 30
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     delay: i * 0.5
//                   }}
//                   className="absolute -top-20 left-4 w-8 h-8 rounded-full bg-gray-500/50 blur-md"
//                 />
//               ))}
//             </>
//           )}
//         </AnimatePresence>
        
//         {/* Factory Building */}
//         <motion.div
//           animate={{ 
//             opacity: 1 - (pollution / 150)
//           }}
//           className="relative"
//         >
//           <div className="w-24 h-32 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-lg border-2 border-gray-600">
//             {/* Windows */}
//             <div className="grid grid-cols-3 gap-2 p-3">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="w-4 h-4 bg-yellow-400/80 rounded" />
//               ))}
//             </div>
//           </div>
//           {/* Chimney */}
//           <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-6 h-20 bg-gradient-to-b from-red-900 to-gray-800 rounded-t" />
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// // Solar Panel Component
// function SolarPanel({ energy, index }: { energy: number; index: number }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: energy > 20 ? 1 : 0.3, y: 0 }}
//       transition={{ delay: index * 0.1 }}
//       className="relative"
//     >
//       <div className="w-16 h-10 bg-gradient-to-br from-blue-900 to-blue-950 rounded border-2 border-blue-700 relative overflow-hidden">
//         <motion.div
//           animate={{
//             opacity: [0.5, 1, 0.5],
//             scale: [1, 1.1, 1]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: index * 0.2
//           }}
//           className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-transparent"
//         />
//         {/* Grid lines */}
//         <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-[2px] p-1">
//           {[...Array(8)].map((_, i) => (
//             <div key={i} className="bg-blue-800/50 rounded-sm" />
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// // Water Drop Animation
// function WaterDrop({ active }: { active: boolean }) {
//   return (
//     <AnimatePresence>
//       {active && (
//         <motion.div
//           initial={{ y: -20, opacity: 1 }}
//           animate={{ y: 40, opacity: 0 }}
//           exit={{ opacity: 0 }}
//           transition={{
//             duration: 1.5,
//             repeat: Infinity,
//             ease: "easeIn"
//           }}
//           className="absolute top-0 left-1/2 -translate-x-1/2"
//         >
//           <Droplets className="w-6 h-6 text-blue-400" />
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// export default function SustainabilityPlayground() {
//   const [renewableEnergy, setRenewableEnergy] = useState(65)
//   const [waterConservation, setWaterConservation] = useState(72)
//   const [recyclingRate, setRecyclingRate] = useState(80)
//   const [carbonReduction, setCarbonReduction] = useState(55)
  
//   const [trees, setTrees] = useState<number[]>([])
//   const [score, setScore] = useState(0)
//   const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; type: 'good' | 'bad' }>>([])
  
//   const sectionRef = useRef(null)
//   const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
//   // Calculate overall sustainability score
//   useEffect(() => {
//     const newScore = Math.round(
//       (renewableEnergy + waterConservation + recyclingRate + carbonReduction) / 4
//     )
//     setScore(newScore)
    
//     // Update trees based on score
//     const treeCount = Math.floor(newScore / 10)
//     setTrees(Array.from({ length: treeCount }, (_, i) => i))
//   }, [renewableEnergy, waterConservation, recyclingRate, carbonReduction])
  
//   // Add particles on interaction
//   const addParticle = (type: 'good' | 'bad') => {
//     const newParticle = {
//       id: Date.now(),
//       x: Math.random() * 400,
//       y: Math.random() * 200 + 200,
//       type
//     }
//     setParticles(prev => [...prev, newParticle])
//     setTimeout(() => {
//       setParticles(prev => prev.filter(p => p.id !== newParticle.id))
//     }, 2000)
//   }
  
//   const handleSliderChange = (
//     value: number,
//     setter: (v: number) => void,
//     oldValue: number
//   ) => {
//     setter(value)
//     addParticle(value > oldValue ? 'good' : 'bad')
//   }
  
//   const resetValues = () => {
//     setRenewableEnergy(65)
//     setWaterConservation(72)
//     setRecyclingRate(80)
//     setCarbonReduction(55)
//   }
  
//   const pollution = 100 - carbonReduction

//   return (
//     <section 
//       ref={sectionRef}
//       className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-[#1a0a14] to-slate-950"
//     >
//       {/* Enhanced Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Animated Gradient Orbs */}
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.4, 0.6, 0.4],
//             x: [0, 50, 0],
//             y: [0, -30, 0]
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//             ease: 'easeInOut'
//           }}
//           className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-green-500/30 via-emerald-500/20 to-transparent rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.3, 0.5, 0.3],
//             x: [0, -50, 0],
//             y: [0, 30, 0]
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//             ease: 'easeInOut'
//           }}
//           className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#76193A]/30 via-purple-500/20 to-transparent rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1, 1.4, 1],
//             opacity: [0.2, 0.4, 0.2]
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: 'easeInOut'
//           }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl"
//         />
        
//         {/* Grid Pattern Overlay */}
//         <div className="absolute inset-0 opacity-[0.02]" style={{
//           backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
//           backgroundSize: '50px 50px'
//         }} />
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={isInView ? { opacity: 1, scale: 1 } : {}}
//             whileHover={{ scale: 1.05 }}
//             className="inline-block mb-6"
//           >
//             <div className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-[#76193A] rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
//               <div className="relative inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-[#76193A]/20 backdrop-blur-xl px-6 py-3 rounded-full border border-green-400/40 shadow-lg shadow-green-500/20">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
//                 >
//                   <Sparkles className="w-5 h-5 text-green-400" />
//                 </motion.div>
//                 <span className="text-green-400 font-bold tracking-wide">Interactive Experience</span>
//               </div>
//             </div>
//           </motion.div>
          
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
//             Build Your
//             <span className="block mt-3 bg-gradient-to-r from-green-400 via-emerald-400 to-[#76193A] bg-clip-text text-transparent drop-shadow-2xl">
//               Sustainable Future
//             </span>
//           </h2>
          
//           <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-6 font-light leading-relaxed">
//             Control the sliders and watch the ecosystem transform in real-time
//           </p>
          
//           {/* Enhanced Score Display */}
//           <motion.div
//             animate={{ 
//               scale: score > 80 ? [1, 1.05, 1] : 1,
//             }}
//             transition={{ duration: 0.5 }}
//             className="inline-block relative"
//           >
//             {/* Glow Effect */}
//             <div className={`absolute inset-0 rounded-3xl blur-xl transition-opacity duration-300 ${
//               score > 80 ? 'bg-green-500/40 opacity-100' : 
//               score > 50 ? 'bg-yellow-500/40 opacity-60' :
//               'bg-red-500/40 opacity-40'
//             }`} />
            
//             <div className={`relative inline-flex items-center space-x-4 px-8 py-4 rounded-3xl border-2 backdrop-blur-2xl transition-all duration-300 shadow-2xl ${
//               score > 80 ? 'bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 border-green-400/60 shadow-green-500/30' : 
//               score > 50 ? 'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 border-yellow-400/60 shadow-yellow-500/30' :
//               'bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 border-red-400/60 shadow-red-500/30'
//             }`}>
//               <motion.div
//                 animate={{ rotate: score > 80 ? 360 : 0 }}
//                 transition={{ duration: 2, repeat: score > 80 ? Infinity : 0 }}
//               >
//                 <Target className={`w-7 h-7 drop-shadow-lg ${
//                   score > 80 ? 'text-green-400' :
//                   score > 50 ? 'text-yellow-400' :
//                   'text-red-400'
//                 }`} />
//               </motion.div>
//               <div className="text-left">
//                 <div className="text-xs font-medium text-white/70 uppercase tracking-wider">Sustainability Score</div>
//                 <div className="text-3xl font-black text-white mt-1 tracking-tight">{score}%</div>
//               </div>
//               {score === 100 && (
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
//                   transition={{ duration: 0.5, rotate: { repeat: Infinity, duration: 2 } }}
//                 >
//                   <Award className="w-7 h-7 text-yellow-400 drop-shadow-lg" />
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Interactive Ecosystem Canvas */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={isInView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 0.8 }}
//           className="relative max-w-6xl mx-auto mb-16 group"
//         >
//           {/* Outer Glow */}
//           <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 via-blue-500/30 to-purple-500/30 rounded-[2rem] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
          
//           <div className="relative bg-gradient-to-b from-sky-900 via-sky-800 to-green-900 rounded-[2rem] overflow-hidden border-2 border-white/20 shadow-2xl shadow-black/40 backdrop-blur-sm" 
//                style={{ height: '450px' }}>
//             {/* Sun */}
//             <motion.div
//               animate={{
//                 scale: [1, 1.1, 1],
//                 rotate: [0, 360]
//               }}
//               transition={{
//                 scale: { duration: 3, repeat: Infinity },
//                 rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
//               }}
//               className="absolute top-8 right-8"
//             >
//               <div className="relative w-16 h-16">
//                 <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-70" />
//                 <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full" />
//               </div>
//             </motion.div>

//             {/* Clouds */}
//             <motion.div
//               animate={{ x: [0, 100, 0] }}
//               transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
//               className="absolute top-12 left-[20%]"
//             >
//               <div className="flex space-x-2">
//                 <div className="w-12 h-8 bg-white/30 rounded-full blur-sm" />
//                 <div className="w-16 h-10 bg-white/20 rounded-full blur-sm" />
//               </div>
//             </motion.div>

//             {/* Factory */}
//             <AnimatedFactory pollution={pollution} />

//             {/* Solar Panels */}
//             <div className="absolute bottom-4 right-[15%] flex space-x-2">
//               {[...Array(3)].map((_, i) => (
//                 <SolarPanel key={i} energy={renewableEnergy} index={i} />
//               ))}
//             </div>

//             {/* Water System */}
//             <div className="absolute bottom-8 left-[40%]">
//               <div className="relative">
//                 <WaterDrop active={waterConservation > 50} />
//                 <motion.div
//                   animate={{
//                     scale: waterConservation > 50 ? [1, 1.1, 1] : 1
//                   }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="w-20 h-12 bg-gradient-to-b from-blue-400/60 to-blue-600/80 rounded-t-full"
//                 />
//               </div>
//             </div>

//             {/* Trees */}
//             <div className="absolute bottom-0 inset-x-0">
//               {trees.map((_, index) => (
//                 <AnimatedTree 
//                   key={index} 
//                   height={60 + Math.random() * 40}
//                   x={50 + (index - trees.length / 2) * 8}
//                 />
//               ))}
//             </div>

//             {/* Ground */}
//             <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-green-800 to-green-900" />

//             {/* Particles */}
//             {particles.map(particle => (
//               <Particle key={particle.id} {...particle} />
//             ))}

//             {/* Achievement Overlay */}
//             <AnimatePresence>
//               {score === 100 && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0 }}
//                   className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
//                 >
//                   <div className="text-center">
//                     <motion.div
//                       animate={{ 
//                         rotate: [0, 360],
//                         scale: [1, 1.2, 1]
//                       }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     >
//                       <Award className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
//                     </motion.div>
//                     <h3 className="text-4xl font-bold text-white mb-2">Perfect Score!</h3>
//                     <p className="text-xl text-green-400">100% Sustainable Future Achieved! 🌍</p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.div>

//         {/* Control Panel */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="max-w-5xl mx-auto relative group"
//         >
//           {/* Outer Glow */}
//           <div className="absolute -inset-1 bg-gradient-to-r from-[#76193A]/40 via-purple-500/20 to-blue-500/20 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          
//           <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/0 backdrop-blur-2xl rounded-[2rem] p-10 border-2 border-white/20 shadow-2xl shadow-black/40">
//             <div className="flex items-center justify-between mb-10">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
//                   <Zap className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-black text-white tracking-tight">Sustainability Controls</h3>
//                   <p className="text-sm text-white/60 font-medium">Adjust values to see impact</p>
//                 </div>
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.05, rotate: -90 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={resetValues}
//                 className="group relative flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 rounded-2xl border-2 border-white/20 hover:border-white/40 text-white transition-all shadow-lg hover:shadow-xl"
//               >
//                 <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-300" />
//                 <span className="font-semibold">Reset</span>
//               </motion.button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Renewable Energy */}
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 className="group relative"
//               >
//                 <div className="absolute -inset-[1px] bg-gradient-to-r from-yellow-500/40 to-orange-500/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <div className="relative space-y-4 p-5 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-yellow-500/40 transition-all">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
//                         <Zap className="w-5 h-5 text-white" />
//                       </div>
//                       <span className="text-white font-bold">Renewable Energy</span>
//                     </div>
//                     <span className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">{renewableEnergy}%</span>
//                   </div>
//                   <div className="relative">
//                     <div className="absolute -inset-x-2 -inset-y-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg blur" />
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       value={renewableEnergy}
//                       onChange={(e) => handleSliderChange(Number(e.target.value), setRenewableEnergy, renewableEnergy)}
//                       className="relative w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer slider-yellow"
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Water Conservation */}
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 className="group relative"
//               >
//                 <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <div className="relative space-y-4 p-5 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-blue-500/40 transition-all">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
//                         <Droplets className="w-5 h-5 text-white" />
//                       </div>
//                       <span className="text-white font-bold">Water Conservation</span>
//                     </div>
//                     <span className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">{waterConservation}%</span>
//                   </div>
//                   <div className="relative">
//                     <div className="absolute -inset-x-2 -inset-y-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg blur" />
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       value={waterConservation}
//                       onChange={(e) => handleSliderChange(Number(e.target.value), setWaterConservation, waterConservation)}
//                       className="relative w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer slider-blue"
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Recycling Rate */}
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 className="group relative"
//               >
//                 <div className="absolute -inset-[1px] bg-gradient-to-r from-green-500/40 to-emerald-500/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <div className="relative space-y-4 p-5 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-green-500/40 transition-all">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
//                         <Leaf className="w-5 h-5 text-white" />
//                       </div>
//                       <span className="text-white font-bold">Recycling Rate</span>
//                     </div>
//                     <span className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">{recyclingRate}%</span>
//                   </div>
//                   <div className="relative">
//                     <div className="absolute -inset-x-2 -inset-y-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg blur" />
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       value={recyclingRate}
//                       onChange={(e) => handleSliderChange(Number(e.target.value), setRecyclingRate, recyclingRate)}
//                       className="relative w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer slider-green"
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Carbon Reduction */}
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 className="group relative"
//               >
//                 <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <div className="relative space-y-4 p-5 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-purple-500/40 transition-all">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
//                         <Wind className="w-5 h-5 text-white" />
//                       </div>
//                       <span className="text-white font-bold">Carbon Reduction</span>
//                     </div>
//                     <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">{carbonReduction}%</span>
//                   </div>
//                   <div className="relative">
//                     <div className="absolute -inset-x-2 -inset-y-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur" />
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       value={carbonReduction}
//                       onChange={(e) => handleSliderChange(Number(e.target.value), setCarbonReduction, carbonReduction)}
//                       className="relative w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer slider-purple"
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Enhanced Tips */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1 }}
//               className="mt-10 relative group"
//             >
//               <div className="absolute -inset-[1px] bg-gradient-to-r from-green-400/30 via-blue-400/30 to-purple-400/30 rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity" />
//               <div className="relative p-6 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30 flex-shrink-0">
//                     <TrendingUp className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
//                       <span>🎯 Challenge Mode</span>
//                     </h4>
//                     <p className="text-white/80 text-sm leading-relaxed">
//                       Can you achieve a perfect <strong className="text-green-400">100% sustainability score</strong>? 
//                       Move all sliders to maximum and watch the ecosystem transform into a green paradise!
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Enhanced Impact Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16"
//         >
//           {[
//             { icon: Leaf, label: 'Trees Planted', value: trees.length * 1000, color: 'green', gradient: 'from-green-400 to-emerald-500' },
//             { icon: Droplets, label: 'Water Saved (m³)', value: Math.round(waterConservation * 125), color: 'blue', gradient: 'from-blue-400 to-cyan-500' },
//             { icon: Zap, label: 'Clean Energy (MWh)', value: Math.round(renewableEnergy * 85), color: 'yellow', gradient: 'from-yellow-400 to-orange-500' },
//             { icon: Wind, label: 'CO₂ Reduced (tons)', value: Math.round(carbonReduction * 450), color: 'purple', gradient: 'from-purple-400 to-pink-500' },
//           ].map((stat, index) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               whileHover={{ scale: 1.05, y: -5 }}
//               transition={{ delay: 0.6 + index * 0.1 }}
//               className="group relative"
//             >
//               {/* Glow Effect */}
//               <div className={`absolute -inset-[1px] bg-gradient-to-r ${stat.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity`} />
              
//               <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/0 backdrop-blur-xl rounded-2xl p-6 border border-white/20 group-hover:border-white/40 transition-all shadow-lg">
//                 <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg shadow-${stat.color}-500/30 mx-auto mb-4`}>
//                   <stat.icon className="w-7 h-7 text-white" />
//                 </div>
//                 <div className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
//                   {stat.value.toLocaleString()}
//                 </div>
//                 <div className="text-white/70 text-xs font-medium uppercase tracking-wide">{stat.label}</div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       <style jsx>{`
//         /* Yellow Slider - Renewable Energy */
//         .slider-yellow::-webkit-slider-thumb {
//           appearance: none;
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #fbbf24, #f59e0b);
//           cursor: pointer;
//           box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.2), 0 0 20px rgba(251, 191, 36, 0.6), 0 4px 10px rgba(0, 0, 0, 0.3);
//           transition: all 0.3s ease;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//         }
//         .slider-yellow::-webkit-slider-thumb:hover {
//           transform: scale(1.2);
//           box-shadow: 0 0 0 6px rgba(251, 191, 36, 0.3), 0 0 30px rgba(251, 191, 36, 0.8), 0 6px 15px rgba(0, 0, 0, 0.4);
//         }
//         .slider-yellow::-webkit-slider-track {
//           background: linear-gradient(to right, rgba(251, 191, 36, 0.3) 0%, rgba(251, 191, 36, 0.1) 100%);
//           border-radius: 10px;
//         }

//         /* Blue Slider - Water Conservation */
//         .slider-blue::-webkit-slider-thumb {
//           appearance: none;
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #60a5fa, #3b82f6);
//           cursor: pointer;
//           box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2), 0 0 20px rgba(96, 165, 250, 0.6), 0 4px 10px rgba(0, 0, 0, 0.3);
//           transition: all 0.3s ease;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//         }
//         .slider-blue::-webkit-slider-thumb:hover {
//           transform: scale(1.2);
//           box-shadow: 0 0 0 6px rgba(96, 165, 250, 0.3), 0 0 30px rgba(96, 165, 250, 0.8), 0 6px 15px rgba(0, 0, 0, 0.4);
//         }
//         .slider-blue::-webkit-slider-track {
//           background: linear-gradient(to right, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0.1) 100%);
//           border-radius: 10px;
//         }

//         /* Green Slider - Recycling */
//         .slider-green::-webkit-slider-thumb {
//           appearance: none;
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #4ade80, #22c55e);
//           cursor: pointer;
//           box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2), 0 0 20px rgba(74, 222, 128, 0.6), 0 4px 10px rgba(0, 0, 0, 0.3);
//           transition: all 0.3s ease;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//         }
//         .slider-green::-webkit-slider-thumb:hover {
//           transform: scale(1.2);
//           box-shadow: 0 0 0 6px rgba(74, 222, 128, 0.3), 0 0 30px rgba(74, 222, 128, 0.8), 0 6px 15px rgba(0, 0, 0, 0.4);
//         }
//         .slider-green::-webkit-slider-track {
//           background: linear-gradient(to right, rgba(74, 222, 128, 0.3) 0%, rgba(74, 222, 128, 0.1) 100%);
//           border-radius: 10px;
//         }

//         /* Purple Slider - Carbon Reduction */
//         .slider-purple::-webkit-slider-thumb {
//           appearance: none;
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #c084fc, #a855f7);
//           cursor: pointer;
//           box-shadow: 0 0 0 3px rgba(192, 132, 252, 0.2), 0 0 20px rgba(192, 132, 252, 0.6), 0 4px 10px rgba(0, 0, 0, 0.3);
//           transition: all 0.3s ease;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//         }
//         .slider-purple::-webkit-slider-thumb:hover {
//           transform: scale(1.2);
//           box-shadow: 0 0 0 6px rgba(192, 132, 252, 0.3), 0 0 30px rgba(192, 132, 252, 0.8), 0 6px 15px rgba(0, 0, 0, 0.4);
//         }
//         .slider-purple::-webkit-slider-track {
//           background: linear-gradient(to right, rgba(192, 132, 252, 0.3) 0%, rgba(192, 132, 252, 0.1) 100%);
//           border-radius: 10px;
//         }

//         /* Active states */
//         .slider-yellow::-webkit-slider-thumb:active,
//         .slider-blue::-webkit-slider-thumb:active,
//         .slider-green::-webkit-slider-thumb:active,
//         .slider-purple::-webkit-slider-thumb:active {
//           transform: scale(1.1);
//         }
//       `}</style>
//     </section>
//   )
// }
