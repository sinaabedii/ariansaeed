import Script from 'next/script'
import { SITE_CONFIG } from '@/lib/constants'

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Arian Saeed Industrial Group Inc.',
    alternateName: 'ASIGI',
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    foundingDate: '1982',
    founder: {
      '@type': 'Person',
      name: 'Arian Saeed',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IR',
      addressLocality: 'Tehran',
      addressRegion: 'Tehran',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@ariansaeed.com',
    },
    sameAs: [
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.instagram,
      SITE_CONFIG.links.twitter,
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '1200',
    },
    areaServed: {
      '@type': 'Place',
      name: 'International',
    },
    knowsAbout: [
      'Wood-based panels manufacturing',
      'MDF production',
      'Petrochemical products',
      'Construction services',
      'Artificial Intelligence',
      'Investment services',
      'International trade',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/articles?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}
