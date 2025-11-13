'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const categoryLabels: Record<string, string> = {
  murals: 'Murals',
  digital: 'Digital',
  sports: 'Sports',
  applied: 'Applied',
}

const serviceLabels: Record<string, string> = {
  sites: 'Sites',
  branding: 'Branding',
  illustration: 'Illustration',
  'print-design': 'Print Design',
  packaging: 'Packaging',
  environmental: 'Environmental',
  motion: 'Motion',
  photography: 'Photography',
}

export function Sidebar() {
  const router = useRouter()
  // Start with false (expanded) to match server-side render, then update on mount
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Load state from localStorage after mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved === 'true') {
      setIsCollapsed(true)
    }
  }, [])

  // Update CSS variable when collapsed state changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '4rem' : '16rem')
      localStorage.setItem('sidebar-collapsed', String(isCollapsed))
    }
  }, [isCollapsed, mounted])

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 group ${
        isCollapsed ? 'w-16 hover:w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button - Always visible, minimal when collapsed */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-4 right-0 translate-x-1/2 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300 z-10 shadow-sm ${
          isCollapsed ? 'w-6 h-6' : 'w-8 h-8'
        }`}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg
          className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180 w-3 h-3' : 'w-4 h-4'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Logo when Collapsed - using min version */}
      {isCollapsed && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <Link href="/" className="flex flex-col items-center hover:opacity-80 transition-opacity">
            <Image
              src="/roscoestudio-min.png"
              alt="Roscoe Studio"
              width={35}
              height={88}
              className="object-contain"
            />
          </Link>
        </div>
      )}

      {/* Logo at top when expanded */}
      {!isCollapsed && (
        <div className="absolute top-4 left-0 right-0 px-6 pb-6">
          <Link href="/" className="flex justify-center hover:opacity-80 transition-opacity">
            <Image
              src="/package.png"
              alt="Roscoe Studio"
              width={140}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>
      )}

      {/* Sidebar Content */}
      <div
        className={`h-full pt-32 transition-opacity duration-300 ${
          isCollapsed ? 'opacity-0 pointer-events-none overflow-hidden' : 'opacity-100'
        }`}
      >
        <nav className="p-6 space-y-6">
          <div>
            <p className="text-sm text-gray-600 leading-relaxed">
              A multi-disciplinary practice producing work across murals, digital design, sports
              artwork, and applied craft.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 group/projects">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Projects
            </h2>
            <ul className="space-y-2 opacity-0 group-hover/projects:opacity-100 transition-opacity duration-200">
              <li>
                <Link
                  href="/"
                  className="block text-sm text-gray-700 hover:text-gray-900 hover:pl-2 transition-all"
                >
                  All
                </Link>
              </li>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/?category=${key}`}
                    className="block text-sm text-gray-700 hover:text-gray-900 hover:pl-2 transition-all"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-6 group/services">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Services
            </h2>
            <ul className="space-y-2 opacity-0 group-hover/services:opacity-100 transition-opacity duration-200">
              {Object.entries(serviceLabels).map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/?service=${key}`}
                    className="block text-sm text-gray-700 hover:text-gray-900 hover:pl-2 transition-all"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  // TODO: Implement search functionality
                  console.log('Search:', searchQuery)
                }}
                className="w-full"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              </form>
            </div>
            <Link
              href="/admin"
              className="block text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Admin →
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  )
}
