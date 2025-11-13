import React from 'react'
import './globals.css'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { Footer } from './components/Footer'

export const metadata = {
  description:
    'Roscoe Studio - A multi-disciplinary practice producing work across murals, digital design, sports artwork, and applied craft.',
  title: 'Roscoe Studio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ '--sidebar-width': '16rem' } as React.CSSProperties}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Sidebar />
        <div
          className="transition-all duration-300 flex flex-col flex-1"
          style={{ marginLeft: 'var(--sidebar-width, 16rem)' }}
        >
          <TopBar />
          <div className="flex-1 pt-4">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
