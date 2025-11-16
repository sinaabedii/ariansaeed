'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Globe, Search } from 'lucide-react'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const pathname = usePathname()
  
  // Determine if we're on homepage
  const isHomePage = pathname === '/'
  
  // For non-homepage, always show solid background
  const shouldShowSolidBg = !isHomePage || isScrolled
  
  // For non-homepage, start with immediate solid header
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true)
    }
  }, [isHomePage])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      // Only track scroll on homepage, other pages always solid
      // Lower threshold (10px) for faster transition
      if (isHomePage) {
        setIsScrolled(currentScrollY > 10)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  return (
    <header
      className={cn(
        'fixed z-50 transition-all duration-200 ease-out',
        shouldShowSolidBg
          ? 'top-3 md:top-4 bg-white/98 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100/50'
          : 'top-0 bg-transparent',
        // Responsive width control - more compact
        shouldShowSolidBg
          ? 'left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16 2xl:left-24 2xl:right-24'
          : 'left-0 right-0',
        // Add extra spacing for non-home pages
        !isHomePage && 'top-3 md:top-4'
      )}
      style={{
        transform: shouldShowSolidBg && isHomePage ? `translateY(${Math.max(0, -scrollY * 0.1)}px)` : 'translateY(0)',
      }}
    >
      <div className={cn(
        "container mx-auto transition-all duration-200",
        shouldShowSolidBg ? "px-4 md:px-6 lg:px-8" : "px-4 lg:px-6"
      )}>
        <div className={cn(
          "flex items-center justify-between transition-all duration-200",
          shouldShowSolidBg ? "h-16 lg:h-18" : "h-20 lg:h-24"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group relative">
            <div className={cn(
              "relative transform group-hover:scale-110 transition-all duration-300",
              shouldShowSolidBg ? "w-10 h-10 lg:w-12 lg:h-12" : "w-12 h-12 lg:w-14 lg:h-14"
            )}>
              <Image
                src="/logo/asigi.png"
                alt="Arian Saeed Holding Logo"
                fill
                sizes="56px"
                priority
                className="object-contain drop-shadow-sm"
              />
              {shouldShowSolidBg && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-heading font-bold leading-tight transition-all duration-200',
                  isHomePage && !isScrolled
                    ? 'text-white text-lg lg:text-xl drop-shadow-md'
                    : 'text-primary text-base lg:text-lg drop-shadow-sm'
                )}
              >
                Arian Saeed
              </span>
              <span
                className={cn(
                  'transition-all duration-200 font-medium',
                  isHomePage && !isScrolled
                    ? 'text-white/90 text-xs lg:text-sm'
                    : 'text-gray-600 text-xs'
                )}
              >
                Holding
              </span>
            </div>
            {/* Subtle glow effect for scrolled state */}
            {shouldShowSolidBg && (
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative font-medium transition-all duration-200 px-4 py-2 rounded-xl group',
                  isHomePage && !isScrolled
                    ? 'text-white hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/5',
                  pathname === item.href && (isHomePage && !isScrolled) && 'text-white bg-white/20 font-semibold',
                  pathname === item.href && (!isHomePage || isScrolled) && 'text-primary bg-primary/10 font-semibold shadow-sm'
                )}
              >
                {item.label}
                <span className={cn(
                  'absolute left-1/2 bottom-1 h-0.5 bg-primary transition-all duration-200 transform -translate-x-1/2 rounded-full',
                  pathname === item.href ? 'w-6' : 'w-0 group-hover:w-6'
                )} />
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              </Link>
            ))}
            
            {/* Enhanced Action Buttons */}
            <div className={cn(
              "flex items-center space-x-2 ml-4 pl-4 border-l transition-colors duration-200",
              isHomePage && !isScrolled ? "border-white/20" : "border-gray-200/30"
            )}>
              {/* Search Button */}
              <button className={cn(
                'p-2 rounded-xl transition-all duration-200 group relative',
                isHomePage && !isScrolled
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-primary hover:bg-primary/5'
              )}>
                <Search className="w-5 h-5" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              </button>
              
              {/* Language Selector */}
              <button className={cn(
                'flex items-center space-x-1 font-medium transition-all duration-200 px-3 py-2 rounded-xl group relative',
                isHomePage && !isScrolled
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-primary hover:bg-primary/5'
              )}>
                <Globe className="w-4 h-4" />
                <span className="text-sm">EN</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              </button>
            </div>
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-3 rounded-xl transition-all duration-200 group relative',
              isHomePage && !isScrolled
                ? 'text-white hover:bg-white/10'
                : 'text-gray-700 hover:text-primary hover:bg-primary/5 shadow-sm'
            )}
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 transition-transform duration-200 rotate-90" />
              ) : (
                <Menu className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              )}
            </div>
            {/* Subtle background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={cn(
            'lg:hidden pb-6 pt-4 animate-slide-down border-t transition-colors duration-200',
            isHomePage && !isScrolled
              ? 'bg-black/30 backdrop-blur-xl border-white/10'
              : 'bg-white/98 backdrop-blur-xl border-gray-100/50'
          )}>
            <nav className="flex flex-col space-y-2">
              {NAVIGATION_ITEMS.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'font-medium transition-all duration-200 py-3 px-4 rounded-xl group relative',
                    isHomePage && !isScrolled
                      ? 'text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/5',
                    pathname === item.href && (isHomePage && !isScrolled) && 'text-white bg-white/20 font-semibold',
                    pathname === item.href && (!isHomePage || isScrolled) && 'text-primary bg-primary/10 font-semibold shadow-sm'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {pathname === item.href && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                </Link>
              ))}
              
              {/* Mobile Action Buttons */}
              <div className={cn(
                "pt-4 mt-4 border-t space-y-2 transition-colors duration-200",
                isHomePage && !isScrolled ? "border-white/20" : "border-gray-200/30"
              )}>
                <button className={cn(
                  'w-full flex items-center justify-center space-x-2 font-medium transition-all duration-200 py-3 px-4 rounded-xl group relative',
                  isHomePage && !isScrolled
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                )}>
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
                
                <button className={cn(
                  'w-full flex items-center justify-center space-x-2 font-medium transition-all duration-200 py-3 px-4 rounded-xl group relative',
                  isHomePage && !isScrolled
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                )}>
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
