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
  'Tell me about your services',
  'How can I contact you?',
  'What are your business domains?',
  'Schedule a meeting',
  'View our locations',
  'Get support'
]

const botResponses: { [key: string]: Message } = {
  'Tell me about your services': {
    id: 0,
    text: 'We offer comprehensive business solutions across multiple industries including technology, healthcare, finance, and sustainability. Would you like to know more about a specific domain?',
    isBot: true,
    timestamp: new Date(),
    type: 'options',
    options: ['Technology Solutions', 'Healthcare Services', 'Financial Services', 'Sustainability']
  },
  'How can I contact you?': {
    id: 0,
    text: 'Here are the ways you can reach us:',
    isBot: true,
    timestamp: new Date(),
    type: 'contact'
  },
  'What are your business domains?': {
    id: 0,
    text: 'Our main business domains include:\n• Technology & Innovation\n• Healthcare Solutions\n• Financial Services\n• Sustainable Energy\n• Real Estate Development\n• Manufacturing Excellence',
    isBot: true,
    timestamp: new Date()
  },
  'Schedule a meeting': {
    id: 0,
    text: 'I&apos;d be happy to help you schedule a meeting! Please provide your preferred date and time, and our team will get back to you within 24 hours.',
    isBot: true,
    timestamp: new Date()
  },
  'View our locations': {
    id: 0,
    text: 'We have offices in Tehran, Dubai, London, and Singapore. You can find detailed addresses and contact information on our contact page.',
    isBot: true,
    timestamp: new Date()
  },
  'Get support': {
    id: 0,
    text: 'Our support team is available 24/7. You can reach us via phone, email, or live chat. What type of support do you need?',
    isBot: true,
    timestamp: new Date(),
    type: 'options',
    options: ['Technical Support', 'Sales Inquiry', 'General Questions', 'Partnership']
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! Welcome to Arian Saeed Holding. I&apos;m your virtual assistant. How can I help you today?',
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
        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
          <p className="text-sm font-medium text-gray-800 mb-3">{message.text}</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-primary" />
              <span>+98 21 1234 5678</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 text-primary" />
              <span>info@ariansaeed.com</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Tehran, Iran</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-primary" />
              <span>Mon-Fri: 9AM-6PM</span>
            </div>
          </div>
        </div>
      )
    }

    if (message.type === 'options' && message.options) {
      return (
        <div className="space-y-3">
          <p className="text-sm">{message.text}</p>
          <div className="grid grid-cols-1 gap-2">
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="text-left px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )
    }

    return <p className="text-sm whitespace-pre-line">{message.text}</p>
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen)
          setUnreadCount(0)
        }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-primary rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 relative"
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
            className={`fixed z-50 bg-white rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 ${
              isMinimized 
                ? 'bottom-20 right-4 md:bottom-24 md:right-6 w-80 h-16' 
                : 'bottom-20 right-4 left-4 top-20 md:bottom-24 md:right-6 md:left-auto md:top-auto md:w-96 md:h-[32rem]'
            }`}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-primary px-4 md:px-6 py-3 md:py-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">Arian Saeed Assistant</h3>
                  <p className="text-xs text-white/80">
                    {isTyping ? 'Typing...' : 'We&apos;re here to help!'}
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
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[85%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isBot ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {message.isBot ? <Bot className="w-3 h-3 md:w-4 md:h-4" /> : <User className="w-3 h-3 md:w-4 md:h-4" />}
                        </div>
                        <div className={`rounded-2xl px-3 md:px-4 py-2 ${
                          message.isBot 
                            ? 'bg-gray-100 text-gray-800' 
                            : 'bg-primary text-white'
                        }`}>
                          {renderMessage(message)}
                          <p className={`text-xs mt-1 ${
                            message.isBot ? 'text-gray-500' : 'text-white/70'
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
                <div className="px-4 md:px-6 py-2">
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {quickReplies.slice(0, 4).map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(reply)}
                        className="text-xs px-2 md:px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="p-4 md:p-6 pt-2 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-3 md:px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="w-8 h-8 md:w-10 md:h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
