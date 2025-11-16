'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Linkedin } from 'lucide-react'

const leaders = [
  {
    name: 'John Doe',
    position: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256',
  },
  {
    name: 'Jane Smith',
    position: 'Chief Financial Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256',
  },
  {
    name: 'Mike Johnson',
    position: 'Chief Operating Officer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256',
  },
  {
    name: 'Sarah Williams',
    position: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256',
  },
]

export default function Leadership() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">Leadership Team</h2>
          <p className="text-lg text-gray-600">Meet the people driving our success</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/80 transition-colors flex items-center justify-center">
                  <a
                    href="#"
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-12 h-12 bg-white rounded-full flex items-center justify-center"
                  >
                    <Linkedin className="w-6 h-6 text-primary" />
                  </a>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{leader.name}</h3>
              <p className="text-gray-600">{leader.position}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
