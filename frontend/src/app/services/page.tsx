'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  const [activeService, setActiveService] = useState('organ-matching');

  // Scroll to specific service section when component mounts
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveService(hash.substring(1));
      }
    }
  }, []);

  const services = [
    {
      id: 'organ-matching',
      title: 'Organ Matching',
      icon: '🫀',
      description: 'Advanced real-time organ matching system using AI and machine learning algorithms.',
      features: [
        'Blood type compatibility checking',
        'HLA tissue matching analysis',
        'Geographic proximity optimization',
        'Medical urgency prioritization',
        'Cross-match report integration',
        'Real-time availability updates'
      ],
      technologies: ['AI/ML Algorithms', 'Real-time Database', 'Compatibility APIs', 'Medical Data Standards']
    },
    {
      id: 'emergency-transport',
      title: 'Emergency Transport',
      icon: '🚁',
      description: 'Rapid coordination of emergency medical transport for time-critical organ deliveries.',
      features: [
        'Helicopter and ambulance dispatch',
        'GPS route optimization',
        'Real-time tracking systems',
        'Weather condition monitoring',
        'Multi-hospital coordination',
        'Emergency protocol automation'
      ],
      technologies: ['GPS Tracking', 'Google Maps API', 'Weather APIs', 'SMS Gateway (Twilio)', 'Real-time Communication']
    },
    {
      id: 'hospital-network',
      title: 'Hospital Network',
      icon: '🏥',
      description: 'Comprehensive network connecting donor hospitals, transplant centers, and medical facilities.',
      features: [
        'Secure hospital registration',
        'Medical facility verification',
        'Bed availability tracking',
        'Equipment status monitoring',
        'Staff availability updates',
        'Inter-hospital communication'
      ],
      technologies: ['Secure Authentication', 'Hospital Management APIs', 'Real-time Updates', 'Medical Database Integration']
    },
    {
      id: 'patient-management',
      title: 'Patient Management',
      icon: '👥',
      description: 'Complete patient lifecycle management from registration to post-transplant care.',
      features: [
        'Patient registration system',
        'Medical history tracking',
        'Treatment timeline management',
        'Appointment scheduling',
        'Recovery monitoring',
        'Family communication portal'
      ],
      technologies: ['React Hook Form', 'Patient Database', 'Appointment APIs', 'Notification Systems']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive organ transplant management solutions designed to save lives through advanced technology and seamless coordination.
            </p>
            <div className="flex justify-center space-x-4 mb-12">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveService(service.id);
                    document.getElementById(service.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeService === service.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  {service.icon} {service.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`mb-32 ${index % 2 === 0 ? '' : ''}`}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Service Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <span className="text-6xl mr-4">{service.icon}</span>
                    <h2 className="text-4xl font-bold text-white">{service.title}</h2>
                  </div>
                  
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-white mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center bg-gray-700/30 rounded-lg p-3 hover:bg-gray-600/30 transition-colors"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                          <span className="text-gray-200">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Access Dashboard
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Service Visualization */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative h-96 bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700/50">
                  {/* Service-specific visualization */}
                  {service.id === 'organ-matching' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Animated matching visualization */}
                        <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-4xl animate-pulse">
                          🫀
                        </div>
                        <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500/20 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-green-500/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                          AI Match
                        </div>
                      </div>
                    </div>
                  )}

                  {service.id === 'emergency-transport' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Animated transport visualization */}
                        <div className="text-6xl animate-bounce">🚁</div>
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
                        <div className="mt-4 text-center text-white font-semibold">Emergency Transport</div>
                      </div>
                    </div>
                  )}

                  {service.id === 'hospital-network' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-2xl animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          >
                            🏥
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.id === 'patient-management' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">👥</div>
                        <div className="flex space-x-2 justify-center">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className="w-4 h-4 bg-green-400 rounded-full animate-pulse"
                              style={{ animationDelay: `${i * 0.3}s` }}
                            ></div>
                          ))}
                        </div>
                        <div className="mt-4 text-white font-semibold">Patient Care</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>


      {/* Floating Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <style jsx>{`
        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 80px;
          height: 80px;
          left: 80%;
          animation-delay: 7s;
        }

        .shape-3 {
          width: 120px;
          height: 120px;
          left: 50%;
          animation-delay: 14s;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
