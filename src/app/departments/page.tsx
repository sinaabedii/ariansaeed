import DepartmentsGrid from '@/components/departments/DepartmentsGrid'
import DepartmentsHero from '@/components/departments/DepartmentsHero'
import DepartmentStats from '@/components/departments/DepartmentStats'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Our Departments - Organizational Structure & Subsidiaries',
  description: 'Explore Arian Saeed Industrial Group\'s departments spanning wood manufacturing, chemicals, AI & technology, investment, trade, construction, and green energy sectors with 32+ subsidiary companies.',
  keywords: ['departments', 'organizational structure', 'subsidiaries', 'business units', 'industrial departments', 'company divisions'],
  openGraph: {
    title: 'Our Departments - Arian Saeed Industrial Group Inc.',
    description: 'Discover our diverse departments and 32+ subsidiary companies across multiple industries.',
    url: 'https://www.ariansaeed.com/departments',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.ariansaeed.com/departments',
  },
}

export default function DepartmentsPage() {
  return (
    <>
      <DepartmentsHero />
      <DepartmentStats />
      <DepartmentsGrid />
    </>
  )
}
