"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-20 min-h-screen flex items-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Medical background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          {/* Content */}
          <div className="space-y-8 text-center max-w-4xl">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                Trusted and Reliable
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 drop-shadow-md">
                Organ and Tissue Transplant Organization
              </p>
            </div>
            
            <p className="text-lg text-gray-200 leading-relaxed drop-shadow-md">
              We connect donors with recipients through our advanced matching system, 
              ensuring safe and efficient organ and tissue transplantation services. 
              Your generosity can save lives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Become a Donor
              </Link>
              <Link 
                href="/patient-registration"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center transform hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Need an Organ
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/30 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white drop-shadow-lg">1000+</div>
                <div className="text-sm text-gray-200">Lives Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white drop-shadow-lg">500+</div>
                <div className="text-sm text-gray-200">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white drop-shadow-lg">24/7</div>
                <div className="text-sm text-gray-200">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
