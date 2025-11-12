'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

function TopBarContent() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Search:', searchQuery)
  }

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-8 py-2.5 flex items-center justify-end gap-6">
        {/* Navigation Links and Search */}
        <div className="flex items-center gap-6 text-xs">
          <Link
            href="/about"
            className={`hover:text-gray-900 transition-colors ${
              pathname === '/about' ? 'text-gray-900 font-medium' : 'text-gray-600'
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`hover:text-gray-900 transition-colors ${
              pathname === '/contact' ? 'text-gray-900 font-medium' : 'text-gray-600'
            }`}
          >
            Contact
          </Link>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs px-2.5 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 w-28"
            />
          </form>
        </div>
      </div>
    </nav>
  )
}

export function TopBar() {
  return <TopBarContent />
}
