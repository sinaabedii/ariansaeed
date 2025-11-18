'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Twitter, Linkedin, Facebook, Mail, Link2, Check } from 'lucide-react'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
}

export default function SocialShare({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Arian Saeed Industrial Group',
  description = 'Check out this amazing content from Arian Saeed Holding'
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'from-blue-400 to-blue-600',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'from-blue-500 to-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'from-gray-600 to-gray-800',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`,
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400')
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Share Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gradient-to-br from-primary to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Share"
      >
        <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Share Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[9997]"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute bottom-full mb-3 right-0 z-[9998]"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700 min-w-[280px]">
                {/* Header */}
                <div className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    Share this page
                  </h3>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {shareLinks.map((link, index) => {
                    const Icon = link.icon
                    return (
                      <motion.button
                        key={link.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleShare(link.url)}
                        className={`flex items-center space-x-2 px-4 py-3 bg-gradient-to-br ${link.color} text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{link.name}</span>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Copy Link */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Link2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {copied ? 'Copied!' : 'Copy Link'}
                    </span>
                  </div>
                  {copied && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </motion.div>
                  )}
                </motion.button>

                {/* URL Preview */}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {url}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-gray-900 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
