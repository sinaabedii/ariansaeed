import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import BusinessDomainsSection from '@/components/home/BusinessDomainsSection'
import InnovationSection from '@/components/home/InnovationSection'
import SubsidiariesSection from '@/components/home/SubsidiariesSection'
import ArticlesSection from '@/components/home/ArticlesSection'
import StatsSection from '@/components/home/StatsSection'
import VisionValuesSection from '@/components/home/VisionValuesSection'
import GlobalPresenceSection from '@/components/home/GlobalPresenceSection'
import SuccessStoriesSection from '@/components/home/SuccessStoriesSection'
import TechnologyHubSection from '@/components/home/TechnologyHubSection'
import SustainabilitySection from '@/components/home/SustainabilitySection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <VisionValuesSection />
      <StatsSection />
      <BusinessDomainsSection />
      <GlobalPresenceSection />
      <TechnologyHubSection />
      <InnovationSection />
      <SuccessStoriesSection />
      <SustainabilitySection />
      <SubsidiariesSection />
      <ArticlesSection />
    </>
  )
}
