'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Calendar, Tag } from 'lucide-react'

const categories = [
  'All',
  'Technology',
  'Business Strategy',
  'Innovation',
  'Sustainability',
  'Market Analysis',
  'Leadership'
]

const sortOptions = [
  { value: 'latest', label: 'Latest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' }
]

interface ArticlesFilterProps {
  onFilterChange?: (filters: any) => void
}

export default function ArticlesFilter({ onFilterChange }: ArticlesFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [showFilters, setShowFilters] = useState(false)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onFilterChange?.({ category, searchQuery, sortBy })
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    onFilterChange?.({ category: activeCategory, searchQuery: query, sortBy })
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    onFilterChange?.({ category: activeCategory, searchQuery, sortBy: sort })
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter Toggle */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          <motion.div
            initial={false}
            animate={{ height: showFilters || window.innerWidth >= 768 ? 'auto' : 0 }}
            className="overflow-hidden md:overflow-visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Sort By
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Active Filters Summary */}
          {(activeCategory !== 'All' || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {activeCategory !== 'All' && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center">
                  {activeCategory}
                  <button
                    onClick={() => handleCategoryChange('All')}
                    className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center">
                  &ldquo;{searchQuery}&rdquo;
                  <button
                    onClick={() => handleSearchChange('')}
                    className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
