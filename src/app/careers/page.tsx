import type { Metadata } from 'next'
import CareersHero from '@/components/careers/CareersHero'
import JobListings from '@/components/careers/JobListings'
import Benefits from '@/components/careers/Benefits'
import GeneralApplicationSection from '@/components/careers/GeneralApplicationSection'

export const metadata: Metadata = {
  title: 'Careers - Join Our Team & Build Your Future',
  description: 'Explore exciting career opportunities at Arian Saeed Industrial Group. Join our team of 1,200+ professionals across 32 companies. Find jobs in manufacturing, AI, construction, petrochemicals, and more.',
  keywords: [
    'careers',
    'job opportunities',
    'employment',
    'join our team',
    'industrial jobs',
    'manufacturing jobs',
    'AI careers',
    'construction jobs',
    'engineering positions',
    'Tehran jobs',
    'international careers',
    'career growth',
  ],
  openGraph: {
    title: 'Careers - Arian Saeed Industrial Group Inc.',
    description: 'Join our team and build your future with us. Explore exciting opportunities.',
    url: 'https://www.ariansaeed.com/careers',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.ariansaeed.com/careers',
  },
}

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <Benefits />
      <JobListings />
      <GeneralApplicationSection />
    </>
  )
}
