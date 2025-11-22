import ArticleDetail from '@/components/articles/ArticleDetail'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Articles dataset (mock) - replaceable with CMS later
const articles = [
  {
    id: 101,
    title: 'Opening of the First Dedicated BYD Showroom in Iran',
    content: `
      <p>Arian Saeed Industrial Group, together with Arian Leila, officially opened Iran's first dedicated BYD showroom on Beheshti Street (at the Hosseini intersection). The grand opening was attended by senior executives of both Arian Saeed Industrial Group Inc and Arian Leila.</p>

      <p>Enthusiasts of the BYD brand can now visit the showroom to experience the latest models tailored for the Iranian market. The initial lineup planned for launch includes the <strong>BYD Dolphin</strong> (hatchback) and <strong>Yuan Plus</strong> as fully electric variants. In addition, the <strong>BYD Han</strong> and <strong>BYD Song Plus</strong> are expected to arrive in both <em>all-electric</em> and <em>plug-in hybrid</em> configurations.</p>

      <h2>Product Roadmap and Local Availability</h2>
      <p>According to current plans, Arian Leila (under the BYD Ali brand) will soon commence deliveries of multiple BYD models in Iran. The brand made its first public debut at the Tehran Auto Show 2024, and an expanded portfolio is now set to enter the market.</p>

      <h2>Why BYD Suits the Iranian Market</h2>
      <ul>
        <li><strong>Luxury and Performance:</strong> Models like the BYD Han can compete in the premium executive sedan segment.</li>
        <li><strong>Energy Efficiency:</strong> Full EV and PHEV options reduce running costs and environmental impact.</li>
        <li><strong>Diverse Lineup:</strong> Yuan Plus, Song Plus, and Dolphin address family, urban, and lifestyle use cases.</li>
      </ul>

      <blockquote>
        “Our vision is to bring a broad range of BYD's electric and plug-in hybrid vehicles to Iran—accelerating sustainable mobility and delivering world-class quality to local customers.”
      </blockquote>

      <h2>Stay Connected</h2>
      <p>For product updates and launch news, follow the official Instagram account <strong>@BYD__ALI</strong> and visit <a href="https://BYD-ALI.com" target="_blank" rel="noopener">BYD-ALI.com</a>.</p>
    `,
    excerpt: "Iran's first dedicated BYD showroom opens in Tehran, featuring an upcoming lineup of EVs and PHEVs for the local market.",
    category: 'Automotive',
    author: 'Editorial Team',
    authorBio: 'Arian Saeed Industrial Group Communications Office.',
    authorImage: '/images/blogs-news/byd/BYD-Ali-5.webp',
    publishDate: '2024-11-18',
    readTime: '4 min read',
    image: '/images/blogs-news/byd/BYD-Ali-5.webp',
    views: 2150,
    likes: 132,
    tags: ['BYD', 'EV', 'Automotive', 'Showroom']
  },
  {
    id: 102,
    title: 'Arian Saeed Launches Strategic Agriculture Initiative',
    content: `
      <p>Arian Saeed Industrial Group is launching a national agriculture initiative centered on <strong>sustainable cultivation</strong>, <strong>modern irrigation systems</strong>, and <strong>AI-powered farm analytics</strong>. The program aims to improve crop yields, optimize water usage, and strengthen domestic food security.</p>
      <p>Key pillars include smart irrigation, data-driven crop monitoring, and scalable mechanization for farms across the country.</p>
    `,
    excerpt: 'A nationwide program focusing on sustainable agriculture, irrigation efficiency, and AI-based productivity.',
    category: 'Agriculture',
    author: 'Editorial Team',
    authorBio: 'Arian Saeed Industrial Group Communications Office.',
    authorImage: '/images/blogs-news/Agriculture/AI-in-Agriculture.webp',
    publishDate: '2024-11-12',
    readTime: '3 min read',
    image: '/images/blogs-news/Agriculture/AI-in-Agriculture.webp',
    views: 1432,
    likes: 78,
    tags: ['Agriculture', 'Sustainability', 'AI']
  },
  {
    id: 103,
    title: '21st International Exhibition of Wood Industries (Tehran 2024)',
    content: `
      <p>The 21st International Exhibition of Wood Industries and Related Equipment will be held from <strong>February 1–4, 2024</strong> at the Tehran International Exhibitions venue. The event showcases raw materials, machinery, furniture hardware, and the latest technologies in the wood industry.</p>
    `,
    excerpt: 'Tehran hosts leading brands in wood industry materials, machinery, and hardware from Feb 1–4, 2024.',
    category: 'Events',
    author: 'Editorial Team',
    authorBio: 'Arian Saeed Industrial Group Communications Office.',
    authorImage: '/images/blogs-news/sinamdf/Negotiations2.jpg',
    publishDate: '2024-02-01',
    readTime: '2 min read',
    image: '/images/blogs-news/sinamdf/Negotiations2.jpg',
    views: 1890,
    likes: 95,
    tags: ['Wood Industry', 'Exhibition', 'Tehran']
  },
  {
    id: 104,
    title: 'Dr. Saeedi Foundation for Entrepreneurs and Geniuses',
    content: `
      <p>The Dr. Saeedi Foundation mobilizes philanthropic resources to support education, research, entrepreneurship, innovation, and infrastructure across key scientific domains. Its mission is to align donors and endowments with national priorities to address societal needs in science and innovation.</p>
    `,
    excerpt: 'A mission-driven foundation empowering education, research, entrepreneurship, and innovation.',
    category: 'Philanthropy',
    author: 'Editorial Team',
    authorBio: 'Arian Saeed Industrial Group Communications Office.',
    authorImage: '/images/blogs-news/Agriculture/45.jpg',
    publishDate: '2024-10-15',
    readTime: '3 min read',
    image: '/images/blogs-news/Agriculture/45.jpg',
    views: 1214,
    likes: 64,
    tags: ['Foundation', 'Entrepreneurship', 'Education']
  },
  {
    id: 105,
    title: 'Annual Demand for Six Million Cubic Meters of Wood for Industries',
    content: `
      <p>According to the executor of the wood cultivation plan, 2–2.5 million m³ of wood is supplied annually from fast-growing species through public–private collaboration. Continued technical and credit support is essential to sustaining and expanding this strategic initiative.</p>
    `,
    excerpt: '2–2.5 million m³ supplied annually; ongoing support is vital for the cultivation program.',
    category: 'Wood Industry',
    author: 'Editorial Team',
    authorBio: 'Arian Saeed Industrial Group Communications Office.',
    authorImage: '/images/blogs-news/sinamdf/unnamed.jpg',
    publishDate: '2024-08-22',
    readTime: '4 min read',
    image: '/images/blogs-news/sinamdf/unnamed.jpg',
    views: 990,
    likes: 51,
    tags: ['Wood', 'Industry', 'Supply']
  },
  {
    id: 106,
    title: 'Necessity of Developing Wood Cultivation in Chaharmahal and Bakhtiari',
    content: `
      <p>With decreasing water resources, reduced precipitation, and climate change shifting snow to rain, erosion risks have increased across Chaharmahal and Bakhtiari. Expanding vegetation cover and fast-growing tree cultivation has become a regional necessity.</p>
    `,
    excerpt: 'Climate realities demand expanded vegetation cover and fast-growing tree cultivation.',
    category: 'Environment',
    author: 'Editorial Team',
    authorBio: 'Arian Saeed Industrial Group Communications Office.',
    authorImage: '/images/blogs-news/sinamdf/choosing_the_finest_hardwood.avif',
    publishDate: '2024-07-10',
    readTime: '3 min read',
    image: '/images/blogs-news/sinamdf/choosing_the_finest_hardwood.avif',
    views: 812,
    likes: 39,
    tags: ['Environment', 'Wood Cultivation', 'Climate']
  }
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
      title: 'Article Not Found | Arian Saeed Industrial Group Inc'
    }
  }

  return {
    title: `${article.title} | Arian Saeed Industrial Group Inc`,
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
