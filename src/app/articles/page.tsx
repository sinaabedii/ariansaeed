import { Metadata } from 'next'
import ArticlesHero from '@/components/articles/ArticlesHero'
import ArticlesFilter from '@/components/articles/ArticlesFilter'
import ArticlesList from '@/components/articles/ArticlesList'


export const metadata: Metadata = {
  title: 'Articles & Insights - Industry News & Thought Leadership',
  description: 'Explore the latest articles, industry insights, and thought leadership from Arian Saeed Industrial Group. Stay informed about trends in manufacturing, AI, construction, petrochemicals, and international trade.',
  keywords: [
    'industry articles',
    'business insights',
    'thought leadership',
    'manufacturing news',
    'AI trends',
    'construction industry',
    'petrochemical news',
    'international trade insights',
    'industrial group blog',
    'technology innovations',
  ],
  openGraph: {
    title: 'Articles & Insights - Arian Saeed Industrial Group Inc.',
    description: 'Explore industry insights and thought leadership from our experts.',
    url: 'https://www.ariansaeed.com/articles',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.ariansaeed.com/articles',
  },
}

export default function ArticlesPage() {
  return (
    <>
      <ArticlesHero />
      <ArticlesFilter />
      <ArticlesList />
    </>
  )
}
