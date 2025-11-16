import { Metadata } from 'next'
import ArticlesHero from '@/components/articles/ArticlesHero'
import ArticlesFilter from '@/components/articles/ArticlesFilter'
import ArticlesList from '@/components/articles/ArticlesList'


export const metadata: Metadata = {
  title: 'Articles & Insights | Arian Saeed Holding',
  description: 'Stay updated with the latest insights, industry trends, and thought leadership from Arian Saeed Holding.',
  keywords: 'articles, insights, industry trends, business news, thought leadership',
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
