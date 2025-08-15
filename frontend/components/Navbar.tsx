"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsUserLoggedIn(
        window.localStorage.getItem("isUserLoggedIn") === "true"
      );
    }
    // Close dropdown on outside click
    function handleClickOutside(event: { target: any; }) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("isUserLoggedIn");
    setIsUserLoggedIn(false);
    setShowProfileDropdown(false);
    window.location.href = "/";
  };

  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="PulseLink Logo"
                width={50}
                height={50}
                className="mr-3"
              />
              <span className="text-xl font-bold text-white drop-shadow-xl">
                PulseLink
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-white hover:text-red-300 transition-all duration-300 drop-shadow-lg font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/services"
              className="text-white hover:text-red-300 transition-all duration-300 drop-shadow-lg font-medium relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-red-300 transition-all duration-300 drop-shadow-lg font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/login?admin=true"
              className="text-white hover:text-red-300 transition-colors drop-shadow-lg font-medium"
            >
              Dashboard
            </Link>
            {!isUserLoggedIn ? (
              <Link
                href="/login"
                className=" text-white hover:text-red-300 transition-colors drop-shadow-lg font-semibold"
              >
                Login
              </Link>
            ) : (
              <div className="ml-4 flex items-center relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileDropdown((prev) => !prev)}
                  className="focus:outline-none"
                >
                  <Image
                    src="/profile-icon.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full border border-white/30 shadow-lg"
                  />
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-6 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-white hover:bg-gray-800 rounded-t-lg"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded-b-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-300 focus:outline-none drop-shadow-lg"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/30 backdrop-blur-lg border-t border-white/20 rounded-b-lg">
              <Link
                href="/"
                className="block px-3 py-2 text-white hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-white hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                About
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 text-white hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-white hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/(auth)/login?admin=true"
                className="block px-3 py-2 text-white hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
              {!isUserLoggedIn ? (
                <Link
                  href="/login"
                  className="block px-3 py-2  text-white rounded-lg mt-2 font-semibold shadow-lg"
                >
                  Login
                </Link>
              ) : (
                <div
                  className="px-3 py-2 flex items-center relative"
                  ref={profileRef}
                >
                  <button
                    onClick={() => setShowProfileDropdown((prev) => !prev)}
                    className="focus:outline-none"
                  >
                    <Image
                      src="/profile-icon.png"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full border border-white/30 shadow-lg"
                    />
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-6 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-white hover:bg-gray-800 rounded-t-lg"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded-b-lg"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
