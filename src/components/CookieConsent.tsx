'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Settings, Check } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000)
    }
  }, [])

  const acceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    localStorage.setItem('cookie_consent', JSON.stringify(allPreferences))
    setIsVisible(false)
  }

  const acceptSelected = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences))
    setIsVisible(false)
  }

  const rejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    localStorage.setItem('cookie_consent', JSON.stringify(minimalPreferences))
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop for settings */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999]"
            />
          )}

          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed ${
              showSettings ? 'bottom-1/2 translate-y-1/2' : 'bottom-4'
            } left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[10000] transition-all duration-300`}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Cookie Settings</h3>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  We use cookies to enhance your browsing experience, serve personalized content, 
                  and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                </p>

                {/* Settings Panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 mb-4 overflow-hidden"
                    >
                      {/* Necessary Cookies */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-sm text-gray-900 dark:text-white">
                              Necessary
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">Always Active</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Essential for the website to function properly.
                        </p>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm text-gray-900 dark:text-white">
                            Analytics
                          </span>
                          <button
                            onClick={() =>
                              setPreferences((prev) => ({
                                ...prev,
                                analytics: !prev.analytics,
                              }))
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              preferences.analytics ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <motion.div
                              animate={{ x: preferences.analytics ? 24 : 0 }}
                              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow"
                            />
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Help us understand how visitors use our website.
                        </p>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm text-gray-900 dark:text-white">
                            Marketing
                          </span>
                          <button
                            onClick={() =>
                              setPreferences((prev) => ({
                                ...prev,
                                marketing: !prev.marketing,
                              }))
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              preferences.marketing ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <motion.div
                              animate={{ x: preferences.marketing ? 24 : 0 }}
                              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow"
                            />
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Used to deliver personalized advertisements.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="space-y-2">
                  {!showSettings ? (
                    <>
                      <button
                        onClick={acceptAll}
                        className="w-full py-3 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
                      >
                        Accept All
                      </button>
                      <div className="flex space-x-2">
                        <button
                          onClick={rejectAll}
                          className="flex-1 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                        >
                          Reject All
                        </button>
                        <button
                          onClick={() => setShowSettings(true)}
                          className="flex-1 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm flex items-center justify-center space-x-2"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={acceptSelected}
                        className="w-full py-3 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
                      >
                        Save Preferences
                      </button>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                  Read our{' '}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
