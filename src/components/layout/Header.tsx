'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Globe, Search } from 'lucide-react'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import SearchModal from '@/components/SearchModal'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className="absolute top-3 md:top-4 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16 2xl:left-24 2xl:right-24 z-50 transition-all duration-300 bg-gray-900/80 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none rounded-2xl border border-white/10 md:border-0"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group relative">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 transform group-hover:scale-110 transition-all duration-300">
              <Image
                src="/logo/asigi.png"
                alt="Arian Saeed Industrial Group Inc. Logo"
                fill
                sizes="56px"
                priority
                className="object-contain drop-shadow-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold leading-tight text-primary text-base lg:text-lg drop-shadow-sm">
                Arian Saeed
              </span>
              <span className="text-white text-xs font-medium">
                Holding
              </span>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative font-medium transition-all duration-200 px-4 py-2 rounded-xl group',
                  'text-white hover:text-primary hover:bg-white/10',
                  pathname === item.href && 'text-primary bg-primary/10 font-semibold shadow-sm'
                )}
              >
                {item.label}
                <span className={cn(
                  'absolute left-1/2 bottom-1 h-0.5 bg-primary transition-all duration-200 transform -translate-x-1/2 rounded-full',
                  pathname === item.href ? 'w-6' : 'w-0 group-hover:w-6'
                )} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              </Link>
            ))}
            
            {/* Enhanced Action Buttons */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200/30">
              {/* Search Button */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl transition-all duration-200 group relative text-white hover:text-primary hover:bg-white/10"
              >
                <Search className="w-5 h-5" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              </button>
              
              {/* Language Selector
              <button className="flex items-center space-x-1 font-medium transition-all duration-200 px-3 py-2 rounded-xl group relative text-white hover:text-primary hover:bg-white/10">
                <Globe className="w-4 h-4" />
                <span className="text-sm">EN</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              </button> */}
            </div>
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl transition-all duration-200 group relative text-white hover:text-primary hover:bg-white/10 shadow-sm"
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 transition-transform duration-200 rotate-90" />
              ) : (
                <Menu className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 pt-4 animate-slide-down border-t border-white/10">
            <nav className="flex flex-col space-y-2">
              {NAVIGATION_ITEMS.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'font-medium transition-all duration-200 py-3 px-4 rounded-xl group relative',
                    'text-white hover:text-primary hover:bg-white/10',
                    pathname === item.href && 'text-primary bg-primary/10 font-semibold shadow-sm'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {pathname === item.href && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                </Link>
              ))}
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 mt-4 border-t border-gray-200/30 space-y-2">
                <button 
                  onClick={() => {
                    setIsSearchOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center space-x-2 font-medium transition-all duration-200 py-3 px-4 rounded-xl group relative text-white hover:text-primary hover:bg-white/10"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 font-medium transition-all duration-200 py-3 px-4 rounded-xl group relative text-white hover:text-primary hover:bg-white/10">
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
