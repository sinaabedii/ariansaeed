# راهنمای اتصال فرانت به بک‌اند

این فایل شامل نمونه کدهای TypeScript/JavaScript برای اتصال Next.js به Django Backend است.

## 🔧 تنظیمات اولیه

### 1. ایجاد API Client

ایجاد فایل `src/lib/api.ts`:

```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export const api = {
  baseUrl: API_BASE_URL,
  
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  postFormData(endpoint: string, formData: FormData) {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header for FormData
    }).then(res => res.json());
  },
};
```

### 2. تنظیم Environment Variables

ایجاد/ویرایش `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 📨 Contact Form Integration

### آپدیت `ContactForm.tsx`

```typescript
// src/components/contact/ContactForm.tsx
'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { api } from '@/lib/api'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await api.post('/api/contact/', formData)
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message || 'Message sent successfully!'
        })
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' })
      }
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
        Send Us a Message
      </h2>
      
      {submitStatus.type && (
        <div className={`mb-4 p-4 rounded-lg ${
          submitStatus.type === 'success' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            required
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}
```

---

## 💼 Careers Integration

### 1. Jobs Service

ایجاد `src/services/careersService.ts`:

```typescript
// src/services/careersService.ts
import { api } from '@/lib/api'

export interface Job {
  id: number
  title: string
  slug: string
  department: string
  location: string
  employment_type: string
  description: string
  featured: boolean
  views_count: number
  applications_count: number
  created_at: string
}

export interface JobDetail extends Job {
  requirements: string
  responsibilities: string
  benefits: string
  salary_min: number | null
  salary_max: number | null
  salary_currency: string
  status: string
  application_deadline: string | null
  updated_at: string
}

export const careersService = {
  async getJobs(params?: {
    page?: number
    department?: string
    employment_type?: string
    search?: string
  }) {
    const queryString = new URLSearchParams(params as any).toString()
    return api.get(`/api/careers/jobs/?${queryString}`)
  },

  async getJobDetail(id: number): Promise<JobDetail> {
    return api.get(`/api/careers/jobs/${id}/`)
  },

  async getFeaturedJobs(): Promise<Job[]> {
    return api.get('/api/careers/jobs/featured/')
  },

  async getDepartments(): Promise<{ departments: string[] }> {
    return api.get('/api/careers/jobs/departments/')
  },

  async submitResume(formData: FormData) {
    return api.postFormData('/api/careers/resume/', formData)
  },
}
```

### 2. آپدیت `JobListings.tsx`

```typescript
// src/components/careers/JobListings.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { MapPin, Clock, Briefcase } from 'lucide-react'
import ResumeModal from './ResumeModal'
import { careersService, type Job } from '@/services/careersService'

export default function JobListings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      const response = await careersService.getJobs()
      setJobs(response.results || [])
    } catch (error) {
      console.error('Failed to load jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  if (loading) {
    return <div className="py-24 text-center">Loading jobs...</div>
  }

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Open Positions
          </h2>
          <p className="text-lg text-gray-600">Find your next opportunity</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-600">No open positions at the moment.</p>
          ) : (
            jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {job.department}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.employment_type}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="px-6 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <ResumeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedJob(null)
        }}
        job={selectedJob}
      />
    </section>
  )
}
```

### 3. آپدیت `ResumeModal.tsx`

```typescript
// در قسمت handleSubmit:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const submitData = new FormData()
    submitData.append('full_name', formData.fullName)
    submitData.append('email', formData.email)
    submitData.append('phone', formData.phone)
    submitData.append('position', formData.position)
    submitData.append('location', formData.location)
    submitData.append('experience', formData.experience)
    submitData.append('cover_letter', formData.coverLetter)
    
    if (fileInputRef.current?.files?.[0]) {
      submitData.append('resume_file', fileInputRef.current.files[0])
    }
    
    if (job?.id) {
      submitData.append('job_id', job.id.toString())
    }

    const response = await careersService.submitResume(submitData)
    
    if (response.success) {
      setIsSubmitted(true)
      
      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
        // Reset form...
      }, 3000)
    }
  } catch (error: any) {
    alert(error.message || 'Failed to submit resume')
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## 📰 Articles Integration

### 1. Articles Service

ایجاد `src/services/articlesService.ts`:

```typescript
// src/services/articlesService.ts
import { api } from '@/lib/api'

export interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  category: number
  category_name: string
  author: string
  publish_date: string
  image_url: string
  views_count: number
  likes_count: number
  read_time: number
  featured: boolean
}

export const articlesService = {
  async getArticles(params?: {
    page?: number
    category?: number
    search?: string
    ordering?: string
  }) {
    const queryString = new URLSearchParams(params as any).toString()
    return api.get(`/api/articles/?${queryString}`)
  },

  async getArticleDetail(id: number) {
    return api.get(`/api/articles/${id}/`)
  },

  async getFeaturedArticles(): Promise<Article[]> {
    return api.get('/api/articles/featured/')
  },

  async likeArticle(id: number) {
    return api.post(`/api/articles/${id}/like/`, {})
  },

  async trackView(id: number) {
    return api.post(`/api/articles/${id}/view/`, {})
  },

  async getCategories() {
    return api.get('/api/articles/categories/')
  },
}
```

### 2. آپدیت `ArticlesList.tsx`

```typescript
// src/components/articles/ArticlesList.tsx
'use client'

import { useState, useEffect } from 'react'
import { articlesService, type Article } from '@/services/articlesService'
// ... rest of imports

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    loadArticles()
  }, [currentPage])

  const loadArticles = async () => {
    try {
      const response = await articlesService.getArticles({ page: currentPage })
      setArticles(response.results || [])
      setTotalPages(Math.ceil(response.count / 12))
    } catch (error) {
      console.error('Failed to load articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (articleId: number) => {
    try {
      await articlesService.likeArticle(articleId)
      // Refresh articles to get updated like count
      loadArticles()
    } catch (error: any) {
      console.error('Failed to like article:', error)
    }
  }

  // ... rest of component
}
```

---

## 🔄 Auto-refresh & Real-time Updates

اگر می‌خواهید داده‌ها به صورت خودکار به‌روز شوند:

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    loadJobs() // or loadArticles()
  }, 60000) // Refresh every 60 seconds

  return () => clearInterval(interval)
}, [])
```

---

## ✅ آماده برای استفاده!

حالا فرانت شما به بک‌اند متصل است و می‌توانید:
- ✅ فرم تماس را ارسال کنید
- ✅ لیست شغل‌ها را دریافت کنید
- ✅ رزومه آپلود کنید
- ✅ مقالات را مشاهده و لایک کنید

برای تست کامل، هر دو سرور را اجرا کنید:
```bash
# Terminal 1 - Backend
cd backend
python manage.py runserver

# Terminal 2 - Frontend
cd ../
npm run dev
```
