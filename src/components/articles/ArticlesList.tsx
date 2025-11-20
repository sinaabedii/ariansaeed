'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight, Eye, Heart } from 'lucide-react'

const articles = [
  {
    id: 101,
    title: 'Opening of the First Dedicated BYD Showroom in Iran',
    excerpt:
      'Arian Saeed Group and Arian Leila opened Iran\'s first dedicated BYD showroom on Beheshti St., featuring the latest BYD models planned for the local market.',
    category: 'Automotive',
    author: 'Editorial Team',
    publishDate: '2024-11-18',
    readTime: '4 min read',
    image: '/images/blogs-news/byd/BYD-Ali-5.webp',
    views: 2150,
    likes: 132,
    featured: true
  },
  {
    id: 102,
    title: 'Arian Saeed Launches Strategic Agriculture Initiative',
    excerpt:
      'A comprehensive agriculture program focusing on sustainable cultivation, modern irrigation, and data-driven productivity using AI-powered farm analytics.',
    category: 'Agriculture',
    author: 'Editorial Team',
    publishDate: '2024-11-12',
    readTime: '3 min read',
    image: '/images/blogs-news/Agriculture/AI-in-Agriculture.webp',
    views: 1432,
    likes: 78,
    featured: true
  },
  {
    id: 103,
    title: '21st International Exhibition of Wood Industries (Tehran 2024)',
    excerpt:
      'From February 1–4, 2024, Tehran hosts leading brands in wood, raw materials, machinery, and furniture hardware at the international exhibitions venue.',
    category: 'Events',
    author: 'Editorial Team',
    publishDate: '2024-02-01',
    readTime: '2 min read',
    image: '/images/blogs-news/sinamdf/Negotiations2.jpg',
    views: 1890,
    likes: 95,
    featured: false
  },
  {
    id: 104,
    title: 'Dr. Saeedi Foundation for Entrepreneurs and Geniuses',
    excerpt:
      'A philanthropic initiative to align donors and endowments with national priorities in education, research, entrepreneurship, innovation, and infrastructure.',
    category: 'Philanthropy',
    author: 'Editorial Team',
    publishDate: '2024-10-15',
    readTime: '3 min read',
    image: '/images/blogs-news/Agriculture/45.jpg',
    views: 1214,
    likes: 64,
    featured: false
  },
  {
    id: 105,
    title: 'Annual Demand for Six Million Cubic Meters of Wood for Industries',
    excerpt:
      'Latest figures show 2–2.5 million m³ supplied annually via fast-growing species under public–private collaboration; sustained support remains crucial.',
    category: 'Wood Industry',
    author: 'Editorial Team',
    publishDate: '2024-08-22',
    readTime: '4 min read',
    image: '/images/blogs-news/sinamdf/unnamed.jpg',
    views: 990,
    likes: 51,
    featured: false
  },
  {
    id: 106,
    title: 'Necessity of Developing Wood Cultivation in Chaharmahal and Bakhtiari',
    excerpt:
      'With reduced precipitation and shifting climate patterns, expanding vegetation cover and fast-growing tree cultivation is now a regional imperative.',
    category: 'Environment',
    author: 'Editorial Team',
    publishDate: '2024-07-10',
    readTime: '3 min read',
    image: '/images/blogs-news/sinamdf/choosing_the_finest_hardwood.avif',
    views: 812,
    likes: 39,
    featured: false
  }
]

export default function ArticlesList() {
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle)
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Featured Articles */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {articles.filter(article => article.featured).slice(0, 2).map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={85}
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.publishDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{article.likes}</span>
                        </div>
                      </div>
                      <Link
                        href={`/articles/${article.id}`}
                        className="flex items-center space-x-1 text-primary hover:text-primary-600 font-medium transition-colors"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* All Articles */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={80}
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{article.author}</span>
                      <span>{formatDate(article.publishDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                        <span>{article.readTime}</span>
                      </div>
                      <Link
                        href={`/articles/${article.id}`}
                        className="text-primary hover:text-primary-600 font-medium text-sm transition-colors"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
