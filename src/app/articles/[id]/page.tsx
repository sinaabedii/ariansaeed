import ArticleDetail from '@/components/articles/ArticleDetail'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Mock article data - in a real app, this would come from a database or CMS
const articles = [
  {
    id: 1,
    title: 'The Future of Artificial Intelligence in Business Operations',
    content: `
      <p>Artificial Intelligence (AI) is no longer a futuristic concept—it's a present reality that's reshaping how businesses operate across industries. From automating routine tasks to providing sophisticated analytics, AI is becoming an indispensable tool for organizations looking to maintain competitive advantage in an increasingly digital world.</p>

      <h2>The Current State of AI in Business</h2>
      <p>Today's businesses are leveraging AI in numerous ways:</p>
      <ul>
        <li><strong>Process Automation:</strong> Streamlining repetitive tasks and reducing human error</li>
        <li><strong>Predictive Analytics:</strong> Forecasting market trends and customer behavior</li>
        <li><strong>Customer Service:</strong> Implementing chatbots and virtual assistants</li>
        <li><strong>Decision Support:</strong> Providing data-driven insights for strategic planning</li>
      </ul>

      <h2>Transformative Applications</h2>
      <p>The most significant impact of AI is seen in its ability to transform traditional business models. Companies are discovering new revenue streams, optimizing operations, and creating entirely new products and services powered by AI technologies.</p>

      <blockquote>
        "AI is not just about replacing human tasks—it's about augmenting human capabilities and enabling us to focus on higher-value activities that require creativity, empathy, and strategic thinking."
      </blockquote>

      <h2>Implementation Challenges</h2>
      <p>Despite its potential, implementing AI in business operations comes with challenges:</p>
      <ul>
        <li>Data quality and availability</li>
        <li>Skills gap and talent acquisition</li>
        <li>Integration with existing systems</li>
        <li>Ethical considerations and bias mitigation</li>
        <li>Regulatory compliance</li>
      </ul>

      <h2>Future Outlook</h2>
      <p>As AI technology continues to evolve, we can expect to see even more sophisticated applications emerging. The businesses that start their AI journey today will be best positioned to capitalize on future innovations and maintain their competitive edge.</p>

      <p>The key to successful AI implementation lies in taking a strategic approach—starting with clear objectives, ensuring data readiness, and building the necessary organizational capabilities to support AI-driven transformation.</p>
    `,
    excerpt: 'Exploring how AI is transforming traditional business models and creating new opportunities for growth and efficiency.',
    category: 'Technology',
    author: 'Dr. Sarah Johnson',
    authorBio: 'Dr. Sarah Johnson is a leading expert in AI and digital transformation with over 15 years of experience in technology consulting.',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80',
    publishDate: '2024-11-10',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    views: 2847,
    likes: 156,
    tags: ['AI', 'Business Strategy', 'Digital Transformation', 'Automation']
  }
  // Add more articles as needed
]

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = articles.find(a => a.id === parseInt(params.id))
  
  if (!article) {
    return {
      title: 'Article Not Found | Arian Saeed Holding'
    }
  }

  return {
    title: `${article.title} | Arian Saeed Holding`,
    description: article.excerpt,
    keywords: article.tags.join(', '),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author]
    }
  }
}

export default function ArticlePage({ params }: PageProps) {
  const article = articles.find(a => a.id === parseInt(params.id))

  if (!article) {
    notFound()
  }

  return <ArticleDetail article={article} />
}
