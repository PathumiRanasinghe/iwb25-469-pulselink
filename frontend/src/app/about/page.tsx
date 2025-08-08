"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    setIsClient(true);
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(20)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Floating Particles - Only render on client */}
        {isClient && (
          <div className="absolute inset-0">
            {particles.map((particle, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-red-400/30 rounded-full animate-float-${i % 4 + 1}`}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full animate-pulse-slow blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse-slow-delayed blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full animate-spin-slow blur-3xl" />
        
        {/* Medical Cross Patterns */}
        <div className="absolute top-10 right-10 text-red-400/10 animate-pulse-glow">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2h2v8h8v2h-8v8h-2v-8H3v-2h8V2z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-20 text-blue-400/10 animate-pulse-glow-delayed">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2h2v8h8v2h-8v8h-2v-8H3v-2h8V2z"/>
          </svg>
        </div>
        
        {/* Heartbeat Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400/50 to-transparent animate-heartbeat-line" />
      </div>
      {/* Hero Section */}
      <section 
        className="relative h-[50vh] bg-cover bg-center flex items-center justify-center overflow-hidden z-10"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 transition-all duration-1000 hover:bg-black/40"></div>
        
        {/* Additional animated elements for hero */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-white/30 rounded-full animate-bounce-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-red-400/40 rounded-full animate-bounce-slow-delayed" />
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce-slow" />
        </div>
        
        <div className="relative z-10 text-center text-white animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-4 animate-pulse-glow hover:scale-105 text-green-400 transition-transform duration-300 cursor-default">
            About PulseLink
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-slide-in-delayed hover:text-gray-200 transition-colors duration-300 cursor-default">
            Connecting lives through innovative medical technology and compassionate care
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Mission Section */}
        <section className="mb-16 animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="transform hover:translate-x-2 transition-transform duration-300">
              <h2 className="text-3xl font-bold text-white-900 mb-6 hover:text-green-400 transition-colors duration-300 cursor-default">
                Our Mission
              </h2>
              <p className="text-lg text-light-yellow-700 mb-6 hover:text-sky-300 transition-colors duration-300 cursor-default leading-relaxed">
                At PulseLink, we believe that every life is precious and every second counts. Our mission is to 
                revolutionize the way medical emergencies are handled by creating seamless connections between 
                those who need help and those who can provide it.
              </p>
              <p className="text-lg text-light-yellow-700 hover:text-sky-300 transition-colors duration-300 cursor-default leading-relaxed">
                Through cutting-edge technology and a network of dedicated healthcare professionals, we're 
                building a world where no one has to face a medical emergency alone.
              </p>
            </div>
            <div className="bg-red-50 p-8 rounded-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 group-hover:rotate-12 transition-all duration-300 group-hover:shadow-lg">
                  <svg className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  Saving Lives
                </h3>
                <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  Every connection we facilitate has the potential to save a life and bring hope to families.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center text-white-900 mb-12 hover:text-green-400 transition-colors duration-300 cursor-default">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-blue-50 transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 group-hover:rotate-12 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Speed</h3>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                Every second matters in medical emergencies. We prioritize rapid response and instant connections.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-green-50 transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 animation-delay-200">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-700 group-hover:rotate-12 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">Trust</h3>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                We maintain the highest standards of security and privacy to ensure safe, reliable connections.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-purple-50 transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 animation-delay-400">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-700 group-hover:rotate-12 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">Community</h3>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                We believe in the power of community and the willingness of people to help one another.
              </p>
            </div>
          </div>
        </section>
        

        {/* Story Section */}
        <section className="mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center text-white-900 mb-12 hover:text-green-400 transition-colors duration-300 cursor-default">
            Our Story
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-blue-50 transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 group-hover:rotate-12 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">The Beginning</h3>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-sm leading-relaxed">
                PulseLink was born from a simple yet powerful realization: in critical medical situations, 
                the difference between life and death often comes down to time and access to the right resources.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-green-50 transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 animation-delay-200">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-700 group-hover:rotate-12 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">Evolution</h3>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-sm leading-relaxed">
                What started as a vision to connect blood donors with recipients has evolved into a comprehensive 
                platform that bridges gaps in emergency medical care across all medical specialties.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-red-50 transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 animation-delay-400">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 group-hover:rotate-12 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">Today</h3>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-sm leading-relaxed">
                Today, PulseLink serves as a vital link in the chain of care, ensuring that when someone needs 
                help, they can find it quickly and efficiently. Every success story motivates us to continue innovating.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center text-white-900 mb-12 hover:text-green-400 transition-colors duration-300 cursor-default">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:shadow-lg rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors duration-300 animate-pulse-slow group-hover:scale-125 transform transition-transform duration-300">
                1000+
              </div>
              <div className="text-red-300 group-hover:text-red-700 transition-colors duration-300 font-medium">
                Lives Connected
              </div>
            </div>
            <div className="p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:shadow-lg rounded-xl animation-delay-100">
              <div className="text-4xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors duration-300 animate-pulse-slow group-hover:scale-125 transform transition-transform duration-300">
                24/7
              </div>
              <div className="text-red-300 group-hover:text-red-700 transition-colors duration-300 font-medium">
                Available Support
              </div>
            </div>
            <div className="p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:shadow-lg rounded-xl animation-delay-200">
              <div className="text-4xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors duration-300 animate-pulse-slow group-hover:scale-125 transform transition-transform duration-300">
                50+
              </div>
              <div className="text-red-300 group-hover:text-red-700 transition-colors duration-300 font-medium">
                Partner Hospitals
              </div>
            </div>
            <div className="p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:shadow-lg rounded-xl animation-delay-300">
              <div className="text-4xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors duration-300 animate-pulse-slow group-hover:scale-125 transform transition-transform duration-300">
                95%
              </div>
              <div className="text-red-300 group-hover:text-red-700 transition-colors duration-300 font-medium">
                Success Rate
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-30px) translateX(15px); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-25px) translateX(-10px); }
          66% { transform: translateY(-5px) translateX(20px); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-35px) translateX(-15px); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(-20px); }
          75% { transform: translateY(-25px) translateX(10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          }
          50% { 
            text-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.4);
          }
        }
        
        @keyframes pulse-glow-delayed {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes bounce-slow-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes heartbeat-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInDelayed {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 5s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slow-delayed { animation: pulse-slow-delayed 5s ease-in-out infinite 1s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-pulse-glow-delayed { animation: pulse-glow-delayed 4s ease-in-out infinite 2s; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-slow-delayed { animation: bounce-slow-delayed 4s ease-in-out infinite 1s; }
        .animate-heartbeat-line { animation: heartbeat-line 8s linear infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slide-in-delayed { animation: slideInDelayed 1s ease-out 0.5s both; }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}
