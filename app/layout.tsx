import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-gray-950 h-full overflow-visible">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
