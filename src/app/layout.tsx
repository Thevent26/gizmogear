import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://gizmogear.tech'),
  title: {
    default: 'GizmoGear — Zambian Tech, Through Honest Eyes',
    template: '%s | GizmoGear',
  },
  description: 'Real reviews. Real tests. Real opinions. Zambia\'s tech scene, through honest eyes. No sponsored content, no fluff — just someone actually using the tech and telling you what works in Zambia.',
  keywords: ['tech Zambia', 'gadget reviews Zambia', 'smartphones Zambia', 'Starlink Zambia', 'AI assistants', 'technology Africa', 'Lusaka tech', 'Zambian tech blog'],
  authors: [{ name: 'Tech Joe' }],
  creator: 'Tech Joe',
  openGraph: {
    type: 'website',
    locale: 'en_ZM',
    url: 'https://gizmogear.tech',
    siteName: 'GizmoGear',
    title: 'GizmoGear — Zambian Tech, Through Honest Eyes',
    description: 'Real reviews. Real tests. Real opinions. Zambia\'s tech scene, through honest eyes.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'GizmoGear — Zambian Tech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GizmoGear — Zambian Tech, Through Honest Eyes',
    description: 'Real reviews. Real tests. Real opinions. Zambia\'s tech scene, through honest eyes.',
    creator: '@GizmoGear',
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0a0a0f] text-white antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
