'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, X, User, Bot, Minimize2, Maximize2, Phone, Mail, MapPin, Clock } from 'lucide-react'

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  type?: 'text' | 'options' | 'contact'
  options?: string[]
}

const quickReplies = [
  'About ASIGI',
  'Our Products',
  'Global Offices',
  'Contact Us',
  'Careers',
  'Partnerships'
]

const botResponses: { [key: string]: Message } = {
  'About ASIGI': {
    id: 0,
    text: 'Arian Saeed Industrial Group (ASIGI) was established in 1982. We operate 32 companies across 7 major industries with 1,200+ employees and partnerships in 12 countries worldwide. What would you like to know more about?',
    isBot: true,
    timestamp: new Date(),
    type: 'options',
    options: ['Our History', 'Business Sectors', 'Global Presence', 'Key Numbers']
  },
  'Our Products': {
    id: 0,
    text: 'Our flagship products include Sina MDF (manufactured with German technology), cellulose products, petrochemicals, and construction solutions. Which industry interests you?',
    isBot: true,
    timestamp: new Date(),
    type: 'options',
    options: ['Wood-Based Panels', 'Cellulose Products', 'Petrochemicals', 'AI & Technology']
  },
  'Global Offices': {
    id: 0,
    text: 'We have offices and partnerships in 12 countries: Iran (HQ - Tehran), Turkey, UAE, Oman, Germany, China, Azerbaijan, Russia, Tajikistan, Iraq, Syria, and Lebanon.',
    isBot: true,
    timestamp: new Date()
  },
  'Contact Us': {
    id: 0,
    text: 'Here are the ways you can reach us:',
    isBot: true,
    timestamp: new Date(),
    type: 'contact'
  },
  'Careers': {
    id: 0,
    text: 'Join our team of 1,200+ professionals! We have opportunities in manufacturing, engineering, AI & technology, and business development across 32 companies. Visit our Careers page to explore current openings.',
    isBot: true,
    timestamp: new Date()
  },
  'Partnerships': {
    id: 0,
    text: 'We welcome strategic partnerships, joint ventures, and distribution opportunities across our business domains. Our team evaluates partnerships based on strategic fit and shared values. Would you like to discuss a specific area?',
    isBot: true,
    timestamp: new Date(),
    type: 'options',
    options: ['Distribution', 'Technology Transfer', 'Investment', 'Trade']
  },
  'Our History': {
    id: 0,
    text: 'Founded in 1982, ASIGI has grown from a single company to 32 active companies operating across multiple continents. Our commitment to innovation and excellence has made us a leading industrial group.',
    isBot: true,
    timestamp: new Date()
  },
  'Business Sectors': {
    id: 0,
    text: 'We operate in 7 major sectors:\n• Wood-Based Panels & MDF\n• Cellulose Products\n• Petrochemicals\n• Construction\n• AI & Technology\n• Investment\n• International Trade',
    isBot: true,
    timestamp: new Date()
  },
  'Global Presence': {
    id: 0,
    text: 'Our headquarters is in Tehran, Iran, with partnerships across Turkey, UAE, Oman, Germany, China, Azerbaijan, Russia, Tajikistan, Iraq, Syria, and Lebanon. We serve markets across 3 continents.',
    isBot: true,
    timestamp: new Date()
  },
  'Key Numbers': {
    id: 0,
    text: 'Quick Facts:\n• Established: 1982\n• Active Companies: 32\n• Employees: 1,200+\n• Countries: 12\n• Industries: 7\n• Active Projects: 50+',
    isBot: true,
    timestamp: new Date()
  },
  'Wood-Based Panels': {
    id: 0,
    text: 'Our Sina MDF brand uses cutting-edge Western European technology, especially German equipment. We produce high-quality MDF and wood fiber products that meet international standards.',
    isBot: true,
    timestamp: new Date()
  },
  'Cellulose Products': {
    id: 0,
    text: 'We operate advanced cellulose production facilities with multiple production lines, creating sustainable and high-quality cellulose products for various industries.',
    isBot: true,
    timestamp: new Date()
  },
  'Petrochemicals': {
    id: 0,
    text: 'Our petrochemical division provides comprehensive solutions and products for industrial and commercial applications across international markets.',
    isBot: true,
    timestamp: new Date()
  },
  'AI & Technology': {
    id: 0,
    text: 'We invest heavily in AI and cutting-edge technology to drive innovation across all our business units, ensuring we stay at the forefront of industrial advancement.',
    isBot: true,
    timestamp: new Date()
  },
  'Distribution': {
    id: 0,
    text: 'We offer distribution partnership opportunities for our products in new markets. Our support includes logistics, quality assurance, and marketing assistance.',
    isBot: true,
    timestamp: new Date()
  },
  'Technology Transfer': {
    id: 0,
    text: 'We collaborate with international partners for technology transfer, especially in manufacturing and industrial processes. Contact our business development team to discuss opportunities.',
    isBot: true,
    timestamp: new Date()
  },
  'Investment': {
    id: 0,
    text: 'We welcome investment opportunities across our 7 business sectors. Our investment team can discuss specific projects and opportunities that align with your interests.',
    isBot: true,
    timestamp: new Date()
  },
  'Trade': {
    id: 0,
    text: 'We provide comprehensive export services for MDF panels, cellulose products, petrochemicals, and construction solutions to markets worldwide with full logistics support.',
    isBot: true,
    timestamp: new Date()
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! Welcome to Arian Saeed Industrial Group (ASIGI). I&apos;m here to help you learn about our 32 companies, global partnerships, and innovative solutions. How can I assist you today?',
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.isBot) {
        setUnreadCount(prev => prev + 1)
      }
    } else {
      setUnreadCount(0)
    }
  }, [messages, isOpen])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false)
      const response = botResponses[text] || {
        id: Date.now() + 1,
        text: 'Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to explore our website or contact us directly.',
        isBot: true,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, { ...response, id: Date.now() + 1 }])
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleOptionClick = (option: string) => {
    sendMessage(option)
  }

  const renderMessage = (message: Message) => {
    if (message.type === 'contact') {
      return (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-3 md:p-4 space-y-2.5 border border-primary/20 shadow-sm">
          <p className="text-xs md:text-sm font-bold text-gray-900 mb-2">{message.text}</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-900">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-medium">+98 21 1234 5678</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-900">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-medium">info@ariansaeed.com</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-900">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-medium">Tehran, Iran</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-900">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-medium">Sat-Thu: 9AM-6PM</span>
            </div>
          </div>
        </div>
      )
    }

    if (message.type === 'options' && message.options) {
      return (
        <div className="space-y-2.5">
          <p className="text-xs md:text-sm text-gray-900 font-medium">{message.text}</p>
          <div className="grid grid-cols-1 gap-1.5">
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="text-left px-2.5 md:px-3 py-1.5 md:py-2 bg-gradient-to-r from-primary/5 to-primary/10 text-primary rounded-lg hover:from-primary/15 hover:to-primary/25 transition-all text-xs md:text-sm font-medium border border-primary/20 hover:border-primary/30 shadow-sm hover:shadow"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )
    }

    return <p className="text-xs md:text-sm whitespace-pre-line leading-relaxed text-gray-900">{message.text}</p>
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen)
          setUnreadCount(0)
        }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-primary to-primary-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Unread Badge */}
        {unreadCount > 0 && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed z-[9999] bg-white rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 ${
              isMinimized 
                ? 'bottom-20 right-4 md:bottom-24 md:right-6 w-80 h-16' 
                : 'bottom-20 right-4 left-4 top-4 md:bottom-24 md:right-6 md:left-auto md:top-auto md:w-[400px] md:h-[600px]'
            }`}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-600 px-4 md:px-6 py-3 md:py-4 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/30 backdrop-blur-lg rounded-full flex items-center justify-center shadow-sm">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-white">ASIGI Assistant</h3>
                  <p className="text-[10px] md:text-xs text-white font-medium">
                    {isTyping ? 'Typing...' : 'Online • Ready to help'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 bg-gradient-to-b from-gray-50/50 to-white">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-start space-x-1.5 md:space-x-2 max-w-[90%] md:max-w-[85%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                          message.isBot ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {message.isBot ? <Bot className="w-3 h-3 md:w-4 md:h-4" /> : <User className="w-3 h-3 md:w-4 md:h-4" />}
                        </div>
                        <div className={`rounded-2xl px-2.5 md:px-3 py-2 shadow-sm ${
                          message.isBot 
                            ? 'bg-gray-100 text-gray-900' 
                            : 'bg-primary text-white'
                        }`}>
                          {renderMessage(message)}
                          <p className={`text-[10px] md:text-xs mt-0.5 ${
                            message.isBot ? 'text-gray-600' : 'text-white/70'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-primary text-white rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-3 md:px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className="px-3 md:px-4 py-2 bg-white border-t border-gray-100">
                  <div className="flex flex-wrap gap-1.5">
                    {quickReplies.slice(0, 4).map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(reply)}
                        className="text-[10px] md:text-xs px-2 md:px-2.5 py-1 bg-gradient-to-r from-primary/5 to-primary/10 text-primary border border-primary/20 rounded-full hover:from-primary/10 hover:to-primary/20 transition-all shadow-sm font-semibold"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-gray-200 bg-white">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-3 md:px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-xs md:text-sm bg-gray-50 focus:bg-white transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-r from-primary to-primary-600 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <Send className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
