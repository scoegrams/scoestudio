'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

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
  // Load initial state from localStorage, default to expanded
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-collapsed')
      return saved === 'true'
    }
    return false
  })

  // Update CSS variable when collapsed state changes
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '3rem' : '16rem')
    // Save state to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', String(isCollapsed))
    }
  }, [isCollapsed])

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 group ${
        isCollapsed ? 'w-12 hover:w-16' : 'w-64'
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

      {/* Vertical Text when Collapsed */}
      {isCollapsed && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
          <Link
            href="/"
            className="flex flex-col items-center text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors leading-tight"
          >
            {'Roscoe Studio'.split('').map((letter, index) => (
              <span key={index} className="block">
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </Link>
        </div>
      )}

      {/* Sidebar Content */}
      <div
        className={`h-full pt-16 transition-opacity duration-300 ${
          isCollapsed ? 'opacity-0 pointer-events-none overflow-hidden' : 'opacity-100'
        }`}
      >
        <nav className="p-6 space-y-6">
          <div>
            <Link
              href="/"
              className="block text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors mb-4"
            >
              Roscoe Studio
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              A multi-disciplinary practice producing work across murals, digital design, sports
              artwork, and applied craft.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Categories
            </h2>
            <ul className="space-y-2">
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

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Services
            </h2>
            <ul className="space-y-2">
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

          <div className="border-t border-gray-200 pt-6">
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
