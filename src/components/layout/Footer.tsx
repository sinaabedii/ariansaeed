'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Send } from 'lucide-react'
import { CONTACT_INFO, NAVIGATION_ITEMS, SITE_CONFIG } from '@/lib/constants'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />,
})

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-heading font-bold mb-4">Stay Updated</h3>
            <p className="text-white/80 mb-6">Subscribe to our newsletter for the latest news and updates</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/40 backdrop-blur-lg"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo/asigi.png"
                  alt="Arian Saeed Industrial Group Inc. Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-tight">
                  Arian Saeed
                </span>
                <span className="text-xs text-white/80">Holding</span>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4">
              {SITE_CONFIG.description}
            </p>
            <div className="flex space-x-3">
              <a href={SITE_CONFIG.links.linkedin} target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={SITE_CONFIG.links.instagram} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={SITE_CONFIG.links.twitter} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <span className="text-white/70">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-white/70 flex-shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-white/70 hover:text-white transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-white/70 flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-white/70 hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Location</h4>
            <div className="h-48 rounded-lg overflow-hidden">
              <MapComponent
                center={[CONTACT_INFO.mapCenter.lat, CONTACT_INFO.mapCenter.lng]}
                zoom={15}
                markers={[
                  {
                    position: [CONTACT_INFO.mapCenter.lat, CONTACT_INFO.mapCenter.lng],
                    popup: 'Arian Saeed Industrial Group Inc',
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
