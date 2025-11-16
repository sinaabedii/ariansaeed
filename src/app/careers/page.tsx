import type { Metadata } from 'next'
import CareersHero from '@/components/careers/CareersHero'
import JobListings from '@/components/careers/JobListings'
import Benefits from '@/components/careers/Benefits'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Arian Saeed Holding team. Explore career opportunities and grow with us.',
}

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <Benefits />
      <JobListings />
    </>
  )
}
