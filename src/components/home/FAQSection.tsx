'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'What is Arian Saeed Industrial Group and when was it established?',
    answer: 'Arian Saeed Industrial Group (ASIGI) is a leading Iranian industrial conglomerate established in 1982. We operate 32 active companies across 7 major industries: Wood-Based Panels, Cellulose Products, Petrochemicals, Construction, AI & Technology, Investment, and International Trade. With over 1,200 employees and partnerships across 12 countries, we are committed to excellence and innovation.',
  },
  {
    id: 2,
    question: 'What makes your MDF and wood panel products stand out?',
    answer: 'Our flagship product, Sina MDF, is manufactured using cutting-edge Western European technology, particularly German equipment and expertise. We produce high-quality MDF and wood fiber compressed products that meet international standards. Our commitment to using advanced technology ensures superior durability, finish quality, and environmental compliance in all our wood-based panel products.',
  },
  {
    id: 3,
    question: 'Do you have international offices and partnerships?',
    answer: 'Yes, we have a strong global presence with partnerships and collaborations across 12 countries including Turkey, UAE, Oman, Germany, China, Azerbaijan, Russia, Tajikistan, Iraq, Syria, and Lebanon. Our headquarters is in Tehran, Iran, and we maintain active business relationships and projects in these regions, focusing on trade, technology transfer, and joint ventures.',
  },
  {
    id: 4,
    question: 'What products and services do you export?',
    answer: 'We offer comprehensive export services for our diverse product portfolio including MDF panels, cellulose products, petrochemical materials, and construction solutions. Our products are exported to markets across Asia, Europe, and the Middle East. We provide complete logistics support, quality assurance, and after-sales service to ensure customer satisfaction in international markets.',
  },
  {
    id: 5,
    question: 'Are you hiring? What career opportunities are available?',
    answer: 'Yes! With 1,200+ employees across 32 companies and 12 countries, we regularly have openings in manufacturing, engineering, AI & technology, business development, and management. We value talent, innovation, and dedication. Visit our Careers page to explore current opportunities and join a dynamic team that is shaping the future of industry across multiple sectors.',
  },
  {
    id: 6,
    question: 'How can I partner with or invest in Arian Saeed Industrial Group?',
    answer: 'We welcome strategic partnerships, joint ventures, and investment opportunities across our business domains. Whether you are interested in distribution partnerships, technology collaborations, or investment in specific sectors, our business development team is ready to discuss opportunities. Contact us through our website, and we will evaluate partnerships based on strategic alignment, market potential, and shared values for long-term success.',
  },
]

export default function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <HelpCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
          >
            Frequently Asked Questions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4"
          >
            Got Questions? We&apos;ve Got Answers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Find answers to the most common questions about our company and services
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      openId === faq.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'
                    }`}>
                      {openId === faq.id ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="font-bold text-sm">{String(index + 1).padStart(2, '0')}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`w-6 h-6 transition-colors ${
                      openId === faq.id ? 'text-primary' : 'text-gray-400'
                    }`} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pl-14">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Contact Our Team</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
