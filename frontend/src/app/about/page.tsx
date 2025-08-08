import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[50vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 transition-all duration-1000 hover:bg-black/40"></div>
        <div className="relative z-10 text-center text-white animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-4 animate-pulse-glow hover:scale-105 transition-transform duration-300 cursor-default">
            About PulseLink
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-slide-in-delayed hover:text-gray-200 transition-colors duration-300 cursor-default">
            Connecting lives through innovative medical technology and compassionate care
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Mission Section */}
        <section className="mb-16 animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="transform hover:translate-x-2 transition-transform duration-300">
              <h2 className="text-3xl font-bold text-white-900 mb-6 hover:text-red-600 transition-colors duration-300 cursor-default">
                Our Mission
              </h2>
              <p className="text-lg text-light-yellow-700 mb-6 hover:text-gray-900 transition-colors duration-300 cursor-default leading-relaxed">
                At PulseLink, we believe that every life is precious and every second counts. Our mission is to 
                revolutionize the way medical emergencies are handled by creating seamless connections between 
                those who need help and those who can provide it.
              </p>
              <p className="text-lg text-light-yellow-700 hover:text-gray-900 transition-colors duration-300 cursor-default leading-relaxed">
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
          <h2 className="text-3xl font-bold text-center text-white-900 mb-12 hover:text-red-600 transition-colors duration-300 cursor-default">
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
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 transform hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center group-hover:text-red-600 transition-colors duration-300">
              Our Story
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed hover:scale-[1.02] transform transition-transform duration-200">
                PulseLink was born from a simple yet powerful realization: in critical medical situations, 
                the difference between life and death often comes down to time and access to the right resources. 
                Our founders witnessed firsthand how delays in medical care can have devastating consequences.
              </p>
              <p className="text-lg text-gray-700 mb-6 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed hover:scale-[1.02] transform transition-transform duration-200">
                What started as a vision to connect blood donors with recipients has evolved into a comprehensive 
                platform that bridges gaps in emergency medical care. We've brought together healthcare professionals, 
                volunteers, and technology experts who share our commitment to saving lives.
              </p>
              <p className="text-lg text-gray-700 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed hover:scale-[1.02] transform transition-transform duration-200">
                Today, PulseLink serves as a vital link in the chain of care, ensuring that when someone needs 
                help, they can find it quickly and efficiently. Every success story motivates us to continue 
                innovating and expanding our reach.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center text-white-900 mb-12 hover:text-red-600 transition-colors duration-300 cursor-default">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:shadow-lg rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors duration-300 animate-pulse-slow group-hover:scale-125 transform transition-transform duration-300">
                1000+
              </div>
              <div className="text-light-blue-700 group-hover:text-light-900 transition-colors duration-300 font-medium">
                Lives Connected
              </div>
            </div>
            <div className="p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:shadow-lg rounded-xl animation-delay-100">
              <div className="text-4xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors duration-300 animate-pulse-slow group-hover:scale-125 transform transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium">
                Available Support
              </div>
            </div>
            <div className="p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:shadow-lg rounded-xl animation-delay-200">
              <div className="text-4xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors duration-300 animate-pulse-slow group-hover:scale-125 transform transition-transform duration-300">
                50+
              </div>
              <div className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium">
                Partner Hospitals
              </div>
            </div>
            <div className="p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:shadow-lg rounded-xl animation-delay-300">
              <div className="text-4xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors duration-300 animate-pulse-slow group-hover:scale-125 transform transition-transform duration-300">
                95%
              </div>
              <div className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium">
                Success Rate
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-red-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of a community that's making a real difference. Whether you're a healthcare professional, 
            a volunteer, or someone who wants to help, there's a place for you at PulseLink.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Become a Volunteer
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Partner With Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
