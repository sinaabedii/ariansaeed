'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight, Eye, Heart } from 'lucide-react'

const articles = [
  {
    id: 1,
    title: 'The Future of Artificial Intelligence in Business Operations',
    excerpt: 'Exploring how AI is transforming traditional business models and creating new opportunities for growth and efficiency.',
    category: 'Technology',
    author: 'Dr. Sarah Johnson',
    publishDate: '2024-11-10',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
    views: 2847,
    likes: 156,
    featured: true
  },
  {
    id: 2,
    title: 'Sustainable Business Practices: A Strategic Imperative',
    excerpt: 'How companies are integrating sustainability into their core business strategies to drive long-term value creation.',
    category: 'Sustainability',
    author: 'Michael Chen',
    publishDate: '2024-11-08',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1569163139394-de44cb6c4a3b?w=600&q=80',
    views: 1923,
    likes: 89,
    featured: false
  },
  {
    id: 3,
    title: 'Digital Transformation: Lessons from Industry Leaders',
    excerpt: 'Key insights and best practices from successful digital transformation initiatives across various industries.',
    category: 'Business Strategy',
    author: 'Emma Rodriguez',
    publishDate: '2024-11-05',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    views: 3156,
    likes: 203,
    featured: true
  },
  {
    id: 4,
    title: 'Innovation Management in the Post-Pandemic Era',
    excerpt: 'Adapting innovation strategies to thrive in an increasingly uncertain and rapidly changing business environment.',
    category: 'Innovation',
    author: 'David Park',
    publishDate: '2024-11-03',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    views: 2134,
    likes: 127,
    featured: false
  },
  {
    id: 5,
    title: 'Global Market Trends: What to Expect in 2025',
    excerpt: 'Comprehensive analysis of emerging market trends and their potential impact on business strategies worldwide.',
    category: 'Market Analysis',
    author: 'Lisa Wang',
    publishDate: '2024-11-01',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    views: 4521,
    likes: 298,
    featured: true
  },
  {
    id: 6,
    title: 'Leadership in Times of Change: Building Resilient Organizations',
    excerpt: 'Essential leadership qualities and strategies for navigating uncertainty and building organizational resilience.',
    category: 'Leadership',
    author: 'Robert Thompson',
    publishDate: '2024-10-28',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    views: 1876,
    likes: 94,
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
