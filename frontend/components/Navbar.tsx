"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/PulseLink logo.png"
                alt="PulseLink Logo"
                width={32}
                height={32}
                className="mr-3 drop-shadow-lg"
              />
              <span className="text-xl font-bold text-white drop-shadow-xl">PulseLink</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-white hover:text-red-300 transition-colors drop-shadow-lg font-medium">
              About
            </Link>
            <Link href="/services" className="text-white hover:text-red-300 transition-colors drop-shadow-lg font-medium">
              Services
            </Link>
            <Link href="/contact" className="text-white hover:text-red-300 transition-colors drop-shadow-lg font-medium">
              Contact
            </Link>
            <Link href="/dashboard" className="text-white hover:text-red-300 transition-colors drop-shadow-lg font-medium">
              Dashboard
            </Link>
            <Link 
              href="/login" 
              className=" text-white hover:text-red-300 transition-colors drop-shadow-lg font-semibold"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-300 focus:outline-none drop-shadow-lg"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/30 backdrop-blur-lg border-t border-white/20 rounded-b-lg">
              <Link href="/" className="block px-3 py-2 text-white hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors">
                Home
              </Link>
              <Link href="/about" className="block px-3 py-2 text-white hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors">
                About
              </Link>
              <Link href="/services" className="block px-3 py-2 text-white hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors">
                Services
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-white hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors">
                Contact
              </Link>
              <Link href="/dashboard" className="block px-3 py-2 text-white hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors">
                Dashboard
              </Link>
              <Link 
                href="/login" 
                className="block px-3 py-2  text-white rounded-lg mt-2 font-semibold shadow-lg"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
