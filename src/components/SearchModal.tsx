'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, TrendingUp, ArrowRight, FileText, Briefcase } from 'lucide-react'
import Link from 'next/link'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const recentSearches = [
  'MDF Products',
  'Careers',
  'Contact Information',
  'Business Domains',
]

const trendingTopics = [
  { title: 'Wood-Based Panels', icon: FileText, href: '/#domains' },
  { title: 'Job Opportunities', icon: Briefcase, href: '/careers' },
  { title: 'Company History', icon: Clock, href: '/about' },
  { title: 'Innovation Hub', icon: TrendingUp, href: '/#innovation' },
]

const quickLinks = [
  { title: 'About Us', description: 'Learn about our 42+ years of excellence', href: '/about' },
  { title: 'Business Domains', description: 'Explore our diverse portfolio', href: '/#domains' },
  { title: 'Contact', description: 'Get in touch with our team', href: '/contact' },
  { title: 'Careers', description: 'Join our growing team', href: '/careers' },
]

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof quickLinks>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    // Simple search filter
    if (query.trim()) {
      const filtered = quickLinks.filter(
        (link) =>
          link.title.toLowerCase().includes(query.toLowerCase()) ||
          link.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10002]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl z-[10003] overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <Search className="w-6 h-6 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for anything... (Ctrl+K)"
                className="flex-1 bg-transparent text-lg outline-none text-gray-900 dark:text-white placeholder-gray-400"
              />
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto p-6">
              {query.trim() ? (
                // Search Results
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                    Search Results ({results.length})
                  </h3>
                  {results.length > 0 ? (
                    <div className="space-y-2">
                      {results.map((result, index) => (
                        <motion.div
                          key={result.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={result.href}
                            onClick={onClose}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
                          >
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                {result.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {result.description}
                              </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No results found for &quot;{query}&quot;
                    </div>
                  )}
                </div>
              ) : (
                // Default View
                <>
                  {/* Recent Searches */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Recent Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => setQuery(search)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trending Topics */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Trending Topics
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {trendingTopics.map((topic) => {
                        const Icon = topic.icon
                        return (
                          <Link
                            key={topic.href}
                            href={topic.href}
                            onClick={onClose}
                            className="flex items-center space-x-3 p-3 bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-xl transition-all group"
                          >
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {topic.title}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                      Quick Links
                    </h3>
                    <div className="space-y-2">
                      {quickLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors group"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {link.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {link.description}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
