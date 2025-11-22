// 'use client'

// import { motion, useInView } from 'framer-motion'
// import { useRef } from 'react'
// import { Building2, Globe2, Handshake, Award } from 'lucide-react'

// const partners = [
//   { id: 1, name: 'BYD', logo: 'B', color: 'from-blue-500 to-blue-700' },

// ]

// const stats = [
//   { icon: Building2, value: '500+', label: 'Global Partners' },
//   { icon: Globe2, value: '50+', label: 'Countries' },
//   { icon: Handshake, value: '1000+', label: 'Projects Completed' },
//   { icon: Award, value: '25+', label: 'Industry Awards' },
// ]

// export default function PartnersSection() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true })

//   return (
//     <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900 overflow-hidden">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <motion.span
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
//           >
//             Trusted Partnerships
//           </motion.span>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4"
//           >
//             Our Global Partners
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
//           >
//             Collaborating with world-leading companies to deliver excellence
//           </motion.p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-14 md:mb-16">
//           {stats.map((stat, index) => {
//             const Icon = stat.icon
//             return (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={isInView ? { opacity: 1, scale: 1 } : {}}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="text-center px-2"
//               >
//                 <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
//                   <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
//                 </div>
//                 <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
//                   {stat.value}
//                 </div>
//                 <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
//                   {stat.label}
//                 </div>
//               </motion.div>
//             )
//           })}
//         </div>

//         {/* Partners Carousel - Infinite Scroll */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="relative"
//         >
//           {/* Gradient Overlays */}
//           <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
//           <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

//           {/* Scrolling Container */}
//           <div className="overflow-hidden">
//             <motion.div
//               animate={{
//                 x: ["-0%", "-50%"],
//               }}
//               transition={{
//                 duration: 40,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//               className="flex space-x-4 sm:space-x-6 md:space-x-8"
//             >
//               {/* Double the array for seamless loop */}
//               {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
//                 <motion.div
//                   key={`${partner.id}-${index}`}
//                   whileHover={{ scale: 1.05, y: -5 }}
//                   className="flex-shrink-0 w-36 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all group cursor-pointer"
//                 >
//                   <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
//                     {/* Logo Placeholder */}
//                     <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br ${partner.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}>
//                       <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
//                         {partner.logo}
//                       </span>
//                     </div>
//                     <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
//                       {partner.name}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Bottom CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           className="text-center mt-12 sm:mt-14 md:mt-16"
//         >
//           <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
//             Interested in becoming a partner?
//           </p>
//           <a
//             href="/contact"
//             className="inline-flex items-center space-x-2 px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all text-sm sm:text-base"
//           >
//             <Handshake className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span>Partner With Us</span>
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   )
// }
