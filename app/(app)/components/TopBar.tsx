'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function TopBarContent() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-8 py-2.5 flex items-center justify-end gap-6">
        {/* Navigation Links */}
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
        </div>
      </div>
    </nav>
  )
}

export function TopBar() {
  return <TopBarContent />
}
