'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const articles = [
  {
    id: 101,
    title: 'Opening of the First Dedicated BYD Showroom in Iran',
    excerpt:
      'Arian Saeed Industrial Group Inc and Arian Leila unveiled the country\'s first dedicated BYD showroom on Beheshti St., showcasing the latest BYD models for Iran.',
    image: '/images/blogs-news/byd/BYD-Ali-5.webp',
    category: 'Automotive',
    date: '2024-11-18',
  },
  {
    id: 102,
    title: 'Arian Saeed Launches Strategic Agriculture Initiative',
    excerpt:
      'Our new agriculture program focuses on sustainable cultivation, modern irrigation, and AI-driven farm analytics to boost national productivity.',
    image: '/images/blogs-news/Agriculture/AI-in-Agriculture.webp',
    category: 'Agriculture',
    date: '2024-11-12',
  },
  {
    id: 103,
    title: '21st International Exhibition of Wood Industries (Tehran 2024)',
    excerpt:
      'From Feb 1–4, 2024, Tehran hosts leading brands in wood, raw materials, machinery, and furniture hardware at the international exhibitions venue.',
    image: '/images/blogs-news/sinamdf/Negotiations2.jpg',
    category: 'Events',
    date: '2024-02-01',
  },
]

export default function ArticlesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
          >
            Latest News
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4"
          >
            Featured Articles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Stay updated with our latest news, insights, and innovations
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                  loading="lazy"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-primary/90 backdrop-blur-sm text-white rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
