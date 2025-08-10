// app/about/page.jsx (Server Component - handles metadata)
import AboutClient from './AboutClient'

export const metadata = {
  title: 'About Us - FC ECO | Sustainable Technology Solutions',
  description: 'FC ECO is a leading consultancy at the intersection of IT, AI, and environmental sustainability. Learn about our mission to create scalable impact for clients and communities.',
  keywords: 'FC ECO, environmental technology, AI sustainability, green tech consulting, sustainable solutions',
  openGraph: {
    title: 'About FC ECO - Transforming Tomorrow Through Sustainable Innovation',
    description: 'Discover how FC ECO combines advanced technology with environmental science to create lasting solutions for a greener, smarter world.',
    type: 'website',
    images: [
      {
        url: '/assets/5.webp',
        width: 1200,
        height: 630,
        alt: 'FC ECO - About Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About FC ECO - Sustainable Technology Leaders',
    description: 'Learn about FC ECO\'s mission to shape a sustainable future through advanced technology and environmental science.',
    images: ['/assets/5.webp'],
  },
}

// This is a Server Component - no 'use client' directive
export default function AboutPage() {
  return <AboutClient />
}