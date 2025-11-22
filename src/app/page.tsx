import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import VisionValuesSection from '@/components/home/VisionValuesSection'
import StatsSection from '@/components/home/StatsSection'
import GlobalPresenceSection from '@/components/home/GlobalPresenceSection'

const BusinessDomainsSection = dynamic(() => import('@/components/home/BusinessDomainsSection'), { ssr: true })
// const GlobalPresenceSection = dynamic(() => import('@/components/home/GlobalPresenceSection'), { ssr: true })
const StaticGlobeSection = dynamic(() => import('@/components/home/StaticGlobeSection'), { ssr: true })
const TechnologyHubSection = dynamic(() => import('@/components/home/TechnologyHubSection'), { ssr: true })
const InnovationSection = dynamic(() => import('@/components/home/InnovationSection'), { ssr: true })
const RenewableEnergyHub = dynamic(() => import('@/components/home/RenewableEnergyHub'), { ssr: true })
const ElectricVehiclesSection = dynamic(() => import('@/components/home/ElectricVehiclesSection'), { ssr: true })
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), { ssr: true })
const SubsidiariesSection = dynamic(() => import('@/components/home/SubsidiariesSection'), { ssr: true })
const FAQSection = dynamic(() => import('@/components/home/FAQSection'), { ssr: true })
const CTASection = dynamic(() => import('@/components/home/CTASection'), { ssr: true })
const ArticlesSection = dynamic(() => import('@/components/home/ArticlesSection'), { ssr: true })

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.ariansaeed.com',
  },
}

export default function HomePage() {
  return (
    <div className="overflow-x-hidden w-full">
      <HeroSection />
      <AboutSection />
      <VisionValuesSection />
      <StatsSection />
      <BusinessDomainsSection />
      <GlobalPresenceSection />
      <RenewableEnergyHub />
      <TechnologyHubSection />
      <ElectricVehiclesSection />
      <TestimonialsSection />
      <InnovationSection />
      <SubsidiariesSection />
      <CTASection />
      <FAQSection />
      <ArticlesSection />
    </div>
  )
}
