'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowLeft, Eye, Heart, Share2, Bookmark, Tag, TrendingUp } from 'lucide-react'

interface Article {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  author: string
  authorBio: string
  authorImage: string
  publishDate: string
  readTime: string
  image: string
  views: number
  likes: number
  tags: string[]
}

interface ArticleDetailProps {
  article: Article
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="100vw"
            quality={90}
            priority
            className="object-cover scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/30" />
          
          {/* Animated Overlay Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 pb-12 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl"
            >
              <Link
                href="/articles"
                className="inline-flex items-center space-x-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Back to Articles</span>
              </Link>
              
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary to-primary-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-primary/30">
                  {article.category}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{article.author}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(article.publishDate)}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{article.readTime}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{article.views.toLocaleString()} views</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-20 -mt-24 md:-mt-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-6 sm:p-8 md:p-12 mb-8"
                >
                  <div 
                    className="prose prose-lg md:prose-xl max-w-none
                      prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900
                      prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-ul:space-y-2 prose-li:text-gray-700
                      prose-blockquote:border-l-4 prose-blockquote:border-primary
                      prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl
                      prose-blockquote:italic prose-blockquote:text-gray-800
                      prose-img:rounded-2xl prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </motion.div>

                {/* Tags Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 mb-8"
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-gray-900">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:from-primary/10 hover:to-primary/5 hover:text-primary border border-gray-200 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Author Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 border border-primary/10"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 ring-4 ring-white shadow-xl">
                      <Image
                        src={article.authorImage}
                        alt={article.author}
                        fill
                        sizes="96px"
                        quality={85}
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900">
                          {article.author}
                        </h3>
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{article.authorBio}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Article Actions - Mobile: Bottom Fixed */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100"
                  >
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-heading font-bold text-gray-900 text-lg">Actions</h3>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transform hover:scale-105 font-medium">
                        <Heart className="w-5 h-5" />
                        <span>Like ({article.likes})</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium">
                        <Bookmark className="w-5 h-5" />
                        <span>Save</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </motion.div>

                  {/* Article Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100"
                  >
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-heading font-bold text-gray-900 text-lg">Stats</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                        <span className="text-gray-600 font-medium">Views</span>
                        <span className="font-bold text-gray-900 text-lg">{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                        <span className="text-gray-600 font-medium">Likes</span>
                        <span className="font-bold text-primary text-lg">{article.likes}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                        <span className="text-gray-600 font-medium">Read Time</span>
                        <span className="font-bold text-gray-900">{article.readTime}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                        <span className="text-gray-600 font-medium text-sm">Published</span>
                        <span className="font-bold text-gray-900 text-sm">{formatDate(article.publishDate)}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Related Articles */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100"
                  >
                    <h3 className="font-heading font-bold text-gray-900 mb-6 text-lg">Related Articles</h3>
                    <div className="space-y-4">
                      <Link href="/articles/2" className="block group p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          Sustainable Business Practices: A Strategic Imperative
                        </h4>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">6 min read</p>
                          <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-primary rotate-180 transition-all group-hover:translate-x-1" />
                        </div>
                      </Link>
                      <div className="h-px bg-gray-100"></div>
                      <Link href="/articles/3" className="block group p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          Digital Transformation: Lessons from Industry Leaders
                        </h4>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">10 min read</p>
                          <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-primary rotate-180 transition-all group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
