import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Critical - Above the fold (loaded immediately)
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import VisionValuesSection from '@/components/home/VisionValuesSection'
import StatsSection from '@/components/home/StatsSection'

// Below the fold - Lazy loaded with dynamic imports
const BusinessDomainsSection = dynamic(() => import('@/components/home/BusinessDomainsSection'), { ssr: true })
const PartnersSection = dynamic(() => import('@/components/home/PartnersSection'), { ssr: true })
const GlobalPresenceSection = dynamic(() => import('@/components/home/GlobalPresenceSection'), { ssr: true })
const TechnologyHubSection = dynamic(() => import('@/components/home/TechnologyHubSection'), { ssr: true })
const InnovationSection = dynamic(() => import('@/components/home/InnovationSection'), { ssr: true })
const RenewableEnergySection = dynamic(() => import('@/components/home/RenewableEnergySection'), { ssr: true })
const SolarCellInteractive = dynamic(() => import('@/components/home/SolarCellInteractive'), { ssr: true })
const SuccessStoriesSection = dynamic(() => import('@/components/home/SuccessStoriesSection'), { ssr: true })
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), { ssr: true })
const SustainabilityPlayground = dynamic(() => import('@/components/home/SustainabilityPlayground'), { ssr: true })
// const BYDShowroom = dynamic(() => import('@/components/home/BYDShowroom'), { ssr: true })
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
      <PartnersSection />
      <GlobalPresenceSection />
      <TechnologyHubSection />
      <InnovationSection />
      <RenewableEnergySection />
      <SolarCellInteractive />
      <SuccessStoriesSection />
      <TestimonialsSection />
      <SustainabilityPlayground />
      {/* <BYDShowroom /> */}
      <SubsidiariesSection />
      <FAQSection />
      <CTASection />
      <ArticlesSection />
    </div>
  )
}
