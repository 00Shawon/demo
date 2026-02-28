import { Cormorant_Garamond, Inter, Amiri } from 'next/font/google'
import './globals.css'
import PageLoader from '@/components/PageLoader'

const cormorant = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
})

export const metadata = {
  title: 'Rafa & Shawon | Wedding',
  description: 'Join us as we celebrate our union blessed by Allah',
  openGraph: {
    title: 'Rafa & Shawon | Wedding',
    description: 'Join us as we celebrate our union blessed by Allah',
    images: ['/og-image.jpg'],
  },
}

import CustomCursor from '@/components/CustomCursor'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${amiri.variable}`}>
      <body className="antialiased bg-bone text-graphite">
        <PageLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}