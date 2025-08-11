'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageLoader from '../../../components/PageLoader';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We will get back to you within 24 hours.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📞',
      title: 'Emergency Hotline',
      value: '+1 (555) 911-ORGAN',
      description: '24/7 Emergency organ transport coordination',
      color: 'text-sky-300'
    },
    {
      icon: '🏥',
      title: 'Medical Center',
      value: '+1 (555) 123-PULSE',
      description: 'General inquiries and hospital partnerships',
      color: 'text-green-400'
    },
    {
      icon: '✉️',
      title: 'Email Support',
      value: 'support@pulselink.org',
      description: 'Non-urgent inquiries and technical support',
      color: 'text-sky-300'
    },
    {
      icon: '📍',
      title: 'Main Office',
      value: '123 Medical Plaza, Healthcare City, HC 12345',
      description: 'Visit our headquarters for in-person consultations',
      color: 'text-green-400'
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slideDown 0.4s ease-out forwards;
        }
        
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-700 { animation-delay: 700ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-900 { animation-delay: 900ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-1100 { animation-delay: 1100ms; }
        .animation-delay-1200 { animation-delay: 1200ms; }
      `}</style>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/PulseLink logo.png"
                alt="PulseLink Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-white text-xl font-bold">PulseLink</span>
            </Link>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Home
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-white px-3 py-2 transition-colors border-b-2 border-red-500">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-green-400 animate-pulse">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-up animation-delay-200">
            We're here to help save lives. Whether you need emergency assistance, have questions about our services, 
            or want to become a partner, our team is ready to assist you 24/7.
          </p>
          <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-4 max-w-2xl mx-auto animate-slide-up animation-delay-400">
            <p className="text-sky-300 font-semibold">🚨 For life-threatening emergencies, call 911 immediately</p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12 animate-slide-up">Contact Methods</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="text-4xl mb-4 animate-bounce" style={{animationDelay: `${index * 200}ms`}}>{method.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                <p className={`${method.color} font-medium mb-2`}>{method.value}</p>
                <p className="text-gray-300 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Departments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 animate-slide-up animation-delay-300 transform hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-3xl font-bold text-white mb-6 animate-slide-in-left">Send us a Message</h2>
              {submitMessage ? (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6 animate-slide-down">
                  <p className="text-green-300">{submitMessage}</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in animation-delay-500">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="animate-slide-in-left animation-delay-600">
                    <label className="block text-gray-300 text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-500 transition-all duration-300 transform focus:scale-105"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="animate-slide-in-right animation-delay-700">
                    <label className="block text-gray-300 text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-500 transition-all duration-300 transform focus:scale-105"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="animate-slide-in-left animation-delay-800">
                    <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-500 transition-all duration-300 transform focus:scale-105"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="animate-slide-in-right animation-delay-900">
                    <label className="block text-gray-300 text-sm font-medium mb-2">Inquiry Type</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-sky-500 transition-all duration-300 transform focus:scale-105"
                    >
                      <option value="general" className="bg-gray-800">General Inquiry</option>
                      <option value="emergency" className="bg-gray-800">Emergency Services</option>
                      <option value="partnership" className="bg-gray-800">Hospital Partnership</option>
                      <option value="technical" className="bg-gray-800">Technical Support</option>
                      <option value="patient" className="bg-gray-800">Patient Services</option>
                    </select>
                  </div>
                </div>
                
                <div className="animate-slide-up animation-delay-1000">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-500 transition-all duration-300 transform focus:scale-105"
                    placeholder="Brief description of your inquiry"
                  />
                </div>
                
                <div className="animate-slide-up animation-delay-1100">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-500 transition-all duration-300 transform focus:scale-105 resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>
                
                <div className="animate-slide-up animation-delay-1200">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-sky-500 to-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-sky-600 hover:to-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-500/20 to-green-500/20 border border-sky-500/30 rounded-xl p-8 text-center animate-slide-up animation-delay-600 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in animation-delay-800">Emergency Organ Transport</h3>
            <p className="text-gray-300 mb-6 animate-fade-in animation-delay-1000">
              If you need immediate organ transport coordination or have a time-critical medical emergency, 
              please use our dedicated emergency hotline for fastest response.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up animation-delay-1200">
              <a 
                href="tel:+15559110ORGAN" 
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg animate-pulse"
              >
                🚨 Emergency: +1 (555) 911-ORGAN
              </a>
              <a 
                href="mailto:emergency@pulselink.org" 
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                📧 emergency@pulselink.org
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 PulseLink. Saving lives through technology. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
