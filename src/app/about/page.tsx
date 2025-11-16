import type { Metadata } from 'next'
import AboutHero from '@/components/about/AboutHero'
import MissionVision from '@/components/about/MissionVision'
import Timeline from '@/components/about/Timeline'
import Leadership from '@/components/about/Leadership'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Arian Saeed Holding, our history, mission, and leadership team.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <Timeline />
      <Leadership />
    </>
  )
}
