'use client'

import { motion } from 'framer-motion'
import { Cpu, Zap, Shield, Smartphone, Cloud, Database, Brain, Rocket } from 'lucide-react'
import Image from 'next/image'

const technologies = [
  {
    icon: Brain,
    name: 'Artificial Intelligence',
    description: 'Advanced AI solutions driving automation and intelligent decision-making',
    image: '/images/c1_hWy2qZ4.jpg',
    stats: '50+ AI Models',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    icon: Cloud,
    name: 'Cloud Computing',
    description: 'Scalable cloud infrastructure powering digital transformation',
    image: '/images/c2_up6Glpn.jpg',
    stats: '99.9% Uptime',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Shield,
    name: 'Cybersecurity',
    description: 'Enterprise-grade security solutions protecting digital assets',
    image: '/images/c3.jpg',
    stats: 'Zero Breaches',
    color: 'from-red-500 to-pink-600'
  },
  {
    icon: Database,
    name: 'Big Data Analytics',
    description: 'Transforming data into actionable insights for strategic growth',
    image: '/images/c4.jpg',
    stats: '10PB+ Processed',
    color: 'from-green-500 to-emerald-600'
  }
]

const innovations = [
  {
    title: 'Quantum Computing Research',
    description: 'Pioneering quantum algorithms for complex optimization problems',
    image: '/images/DJI_0006.JPG',
    status: 'In Development'
  },
  {
    title: 'IoT Ecosystem Platform',
    description: 'Connecting billions of devices for smart city initiatives',
    image: '/images/DSC00426.JPG',
    status: 'Live'
  },
  {
    title: 'Blockchain Infrastructure',
    description: 'Decentralized solutions for transparent business operations',
    image: '/images/1.jpg',
    status: 'Beta'
  }
]

export default function TechnologyHubSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Technology & <span className="text-primary">Innovation Hub</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We have always been a pioneer in acquiring new technologies from around the world to Iran. Our strong technological and engineering background has been proven in many industrial paramount projects that we have assembled and run by ourselves, utilizing Western European technology, especially from Germany.
          </p>
        </motion.div>

        {/* Core Technologies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-80`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <tech.icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
                  <div className="text-xs bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full text-white">
                    {tech.stats}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Innovation Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-heading font-bold text-center mb-12">
            Innovation <span className="text-primary">Showcase</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {innovations.map((innovation, index) => (
              <motion.div
                key={innovation.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={innovation.image}
                    alt={innovation.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      innovation.status === 'Live' 
                        ? 'bg-green-500 text-white' 
                        : innovation.status === 'Beta'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-blue-500 text-white'
                    }`}>
                      {innovation.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-3">{innovation.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {innovation.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { icon: Rocket, label: 'Patents Filed', value: '150+' },
            { icon: Cpu, label: 'AI Models', value: '50+' },
            { icon: Zap, label: 'API Calls/Day', value: '10M+' },
            { icon: Smartphone, label: 'Apps Deployed', value: '200+' }
          ].map((stat, index) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
