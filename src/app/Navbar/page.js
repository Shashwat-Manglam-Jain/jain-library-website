'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blogs', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Uploads', href: '/Form', isButton: true },
]

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (href) => pathname === href

  return (
    <header className="bg-gradient-to-br from-gray-900 to-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/In-jain.svg/1200px-In-jain.svg.png"
              alt="Jain Flag"
              width={40}
              height={40}
              className="rounded-xl shadow"
            />
            <span className="text-xl sm:text-2xl font-bold">Keval Gyan</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-6">
            {navLinks.slice(0, 4).map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className={`transition-colors font-semibold ${
                  isActive(href)
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                {name}
              </Link>
            ))}
            <Link
              href="/Form"
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isActive('/Form')
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Uploads
            </Link>
          </nav>

          {/* Search & Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="h-10 px-3 rounded-md bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700">
              Feedback
            </button>
            <button className="px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-200">
              Learn
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="sm:hidden flex flex-col gap-4 pb-4 border-t border-gray-700 mt-2">
            {navLinks.slice(0, 4).map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-center font-semibold transition-colors ${
                  isActive(href)
                    ? 'text-blue-400'
                    : 'text-white hover:text-blue-400'
                }`}
              >
                {name}
              </Link>
            ))}
            <Link
              href="/Form"
              onClick={() => setIsMenuOpen(false)}
              className={`block mx-auto px-4 py-2 rounded-lg font-semibold transition-colors ${
                isActive('/Form')
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Uploads
            </Link>

            <input
              type="text"
              placeholder="Search..."
              className="mt-3 mx-auto w-11/12 px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="mx-auto mt-2 px-4 py-2 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700">
              Feedback
            </button>
            <button className="mx-auto mt-2 px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-200">
              Learn
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
