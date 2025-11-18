import type { Metadata } from 'next'
import './globals.css'
import { SITE_CONFIG } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Chatbot from '@/components/Chatbot'
import LoadingScreen from '@/components/LoadingScreen'
import BackToTop from '@/components/BackToTop'
import { ToastProvider } from '@/components/Toast'
import NewsletterPopup from '@/components/NewsletterPopup'
import CookieConsent from '@/components/CookieConsent'
import ProgressBar from '@/components/ProgressBar'
import StructuredData from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'ASIGI',
    'Arian Saeed Industrial Group',
    'wood-based panels',
    'MDF manufacturing',
    'cellulose products',
    'Sina MDF',
    'petrochemicals',
    'construction',
    'AI',
    'artificial intelligence',
    'investment',
    'trade',
    'Western European technology',
    'German technology',
    'export services',
    'industrial group Iran',
    'Tehran industry',
    'international partnerships',
    'manufacturing',
    'technology transfer',
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [{
      url: SITE_CONFIG.ogImage,
      width: 1200,
      height: 630,
      alt: `${SITE_CONFIG.name} - Leading Industrial Group`,
      type: 'image/jpeg',
    }],
  },
  verification: {
    google: 'google-site-verification-code', // باید کد واقعی Google Search Console را جایگزین کنید
    // yandex: 'yandex-verification-code',
    // bing: 'bing-verification-code',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        <ToastProvider>
          <LoadingScreen />
          <ProgressBar />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Chatbot />
          <BackToTop />
          <NewsletterPopup />
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  )
}
