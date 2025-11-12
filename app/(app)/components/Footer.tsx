import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto">
      <div className="max-w-[1600px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-6">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="https://shopify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              Shopify
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              GitHub
            </Link>
          </div>
          <div className="text-gray-400">© {new Date().getFullYear()} Roscoe Studio</div>
        </div>
      </div>
    </footer>
  )
}
