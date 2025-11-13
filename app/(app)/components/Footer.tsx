import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto bg-white">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 py-6 sm:py-4">
        {/* Mobile: Stacked layout, Desktop: Side by side */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          {/* Social Links */}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs text-gray-600">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors font-medium"
            >
              Instagram
            </Link>
            <Link
              href="https://shopify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors font-medium"
            >
              Shopify
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors font-medium"
            >
              GitHub
            </Link>
          </div>
          {/* Copyright - appears below on mobile, to the right on desktop */}
          <div className="text-xs text-gray-500">© {new Date().getFullYear()} Roscoe Studio</div>
        </div>
      </div>
    </footer>
  )
}
