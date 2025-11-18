import type { Metadata } from 'next'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Our Team',
  description: 'Contact Arian Saeed Industrial Group for inquiries, partnerships, or career opportunities. Reach out to our team in Tehran and connect with our global offices across 12 countries.',
  keywords: [
    'contact us',
    'get in touch',
    'contact information',
    'business inquiries',
    'partnership opportunities',
    'Tehran office',
    'contact form',
    'email us',
    'phone number',
    'office location',
  ],
  openGraph: {
    title: 'Contact Us - Arian Saeed Industrial Group Inc.',
    description: 'Get in touch with our team for inquiries and partnership opportunities.',
    url: 'https://www.ariansaeed.com/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.ariansaeed.com/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </>
  )
}
