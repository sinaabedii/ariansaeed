import type { Metadata } from 'next'
import AboutHero from '@/components/about/AboutHero'
import MissionVision from '@/components/about/MissionVision'
import Timeline from '@/components/about/Timeline'

export const metadata: Metadata = {
  title: 'About Us - Our Story, Mission & Vision',
  description: 'Discover Arian Saeed Industrial Group\'s journey since 1982. Learn about our mission to drive innovation across 32 companies, our vision for sustainable growth, and our leadership team shaping the future of industry.',
  keywords: ['about arian saeed', 'company history', 'mission statement', 'vision', 'leadership team', 'industrial group history', 'established 1982'],
  openGraph: {
    title: 'About Us - Arian Saeed Industrial Group Inc.',
    description: 'Discover our journey since 1982 and our mission to drive innovation across industries.',
    url: 'https://www.ariansaeed.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.ariansaeed.com/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <Timeline />
    </>
  )
}
