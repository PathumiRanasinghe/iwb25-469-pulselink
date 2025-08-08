'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const [stats, setStats] = useState({
    availableDonors: 12,
    urgentRecipients: 5,
    totalRegistered: 1245,
    totalRecipientWaiting: 857,
    averageMatchTime: 42
  });

  // Sample data for tables
  const donors = [
    { name: 'John Doe', bloodType: 'A+', organs: 'Kidneys' },
    { name: 'Jane Smith', bloodType: 'O-', organs: 'Lungs' },
    { name: 'Michael Johnson', bloodType: 'B+', organs: 'Corneas' }
  ];

  const recipients = [
    { name: 'Sarah Wilson', bloodType: 'A+', neededOrgan: 'Kidney', urgencyLevel: 'High' },
    { name: 'David Brown', bloodType: 'O-', neededOrgan: 'Liver', urgencyLevel: 'Medium' },
    { name: 'Emily Davis', bloodType: 'B+', neededOrgan: 'Heart', urgencyLevel: 'Low' }
  ];

  const hospitalTransports = [
    { organ: 'Kidney', hospital: 'City Hospital' },
    { organ: 'Liver', hospital: 'County Hospital' },
    { organ: 'Heart', hospital: 'General Hospital' }
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-blue-500/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Image 
                src="/PulseLink logo.png" 
                alt="PulseLink" 
                width={32} 
                height={32}
                className="rounded"
              />
              <span className="text-xl font-bold text-white">PulseLink</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">{currentTime}</span>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">A</span>
              </div>
              <span className="text-gray-300">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome, Admin</h1>
          <p className="text-gray-300">Monitor and manage organ transplant operations</p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Live Organ Matching Activity */}
          <div className="lg:col-span-2 bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover-glow">
            <h2 className="text-xl font-semibold mb-6 text-white">Live Organ Matching Activity</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {/* Available Donors */}
              <div className="bg-gray-700/50 rounded-lg p-4 text-center hover-glow">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Available Donors</h3>
                <div className="text-3xl font-bold text-green-400">{stats.availableDonors}</div>
              </div>

              {/* Urgent Recipients */}
              <div className="bg-gray-700/50 rounded-lg p-4 text-center hover-glow">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Urgent Recipients</h3>
                <div className="text-3xl font-bold text-red-400">{stats.urgentRecipients}</div>
              </div>

              {/* Daily Transplant Chart Placeholder */}
              <div className="bg-gray-700/50 rounded-lg p-4 hover-glow">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Daily Transplant</h3>
                <div className="h-16 flex items-end space-x-1">
                  {[40, 65, 30, 80, 45, 70, 55].map((height, index) => (
                    <div
                      key={index}
                      className="bg-blue-400 w-2 rounded-t transition-all duration-300 hover:bg-green-400"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* System Stats */}
              <div className="bg-gray-700/50 rounded-lg p-4 text-center hover-glow">
                <h3 className="text-sm font-medium text-gray-300 mb-2">System Stats</h3>
                <div className="text-sm text-gray-300">
                  <div>Avg {stats.averageMatchTime} hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map and Statistics */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover-glow">
            <div className="h-48 bg-gray-700/30 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="text-gray-400">Hospital Network Map</div>
              {/* Map markers simulation with animation */}
              <div className="absolute top-4 left-8 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-12 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-8 left-16 w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-12 right-8 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Total Registered</span>
                <span className="text-white font-semibold">{stats.totalRegistered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Total Recipient Waiting</span>
                <span className="text-white font-semibold">{stats.totalRecipientWaiting}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Average Match Time</span>
                <span className="text-white font-semibold">{stats.averageMatchTime} hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Donors Table */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover-glow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Donors</h3>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Add New Donor
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-300 text-sm">
                    <th className="text-left pb-3">Donor Name</th>
                    <th className="text-left pb-3">Blood Type</th>
                    <th className="text-left pb-3">Organs</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {donors.map((donor, index) => (
                    <tr key={index} className="text-gray-200 hover:bg-gray-700/30 transition-colors">
                      <td className="py-2">{donor.name}</td>
                      <td className="py-2">{donor.bloodType}</td>
                      <td className="py-2">{donor.organs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recipients Table */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover-glow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Recipients</h3>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Add New Recipient
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-300 text-sm">
                    <th className="text-left pb-3">Patient Name</th>
                    <th className="text-left pb-3">Blood Type</th>
                    <th className="text-left pb-3">Needed Organ</th>
                    <th className="text-left pb-3">Urgency</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {recipients.map((recipient, index) => (
                    <tr key={index} className="text-gray-200 hover:bg-gray-700/30 transition-colors">
                      <td className="py-2">{recipient.name}</td>
                      <td className="py-2">{recipient.bloodType}</td>
                      <td className="py-2">{recipient.neededOrgan}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          recipient.urgencyLevel === 'High' ? 'bg-red-500/20 text-red-300' :
                          recipient.urgencyLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {recipient.urgencyLevel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hospital Transport */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover-glow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Hospital</h3>
              <div className="text-sm text-gray-300">ICU Bed Occ</div>
            </div>
            <div className="mb-4">
              <div className="h-16 flex items-end justify-center">
                <svg viewBox="0 0 200 50" className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    points="0,40 50,30 100,35 150,20 200,25"
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-gray-300 text-sm mb-3">Organ Transport</div>
              {hospitalTransports.map((transport, index) => (
                <div key={index} className="flex justify-between py-2 hover:bg-gray-700/30 rounded transition-colors">
                  <span className="text-gray-200">{transport.organ}</span>
                  <span className="text-gray-300 text-sm">{transport.hospital}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/patient-registration" className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover-glow">
            <div className="text-lg font-semibold">Patient Registration</div>
            <div className="text-sm opacity-80">Register new patients</div>
          </Link>
          <Link href="/donor-registration" className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover-glow">
            <div className="text-lg font-semibold">Donor Registration</div>
            <div className="text-sm opacity-80">Register new donors</div>
          </Link>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover-glow">
            <div className="text-lg font-semibold">Match Analysis</div>
            <div className="text-sm opacity-80">Run compatibility checks</div>
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover-glow">
            <div className="text-lg font-semibold">Emergency Alert</div>
            <div className="text-sm opacity-80">Critical cases</div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>PulseLink - Organ Transplant Management System | Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Floating Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      {/* Floating Shapes CSS */}
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
          animation: float 15s infinite linear;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 60px;
          height: 60px;
          left: 80%;
          animation-delay: 5s;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          left: 50%;
          animation-delay: 2s;
        }

        .shape-4 {
          width: 50px;
          height: 50px;
          left: 70%;
          animation-delay: 8s;
        }

        .shape-5 {
          width: 40px;
          height: 40px;
          left: 90%;
          animation-delay: 3s;
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

        /* Enhanced hover effects for interactive elements */
        .hover-glow {
          transition: all 0.3s ease;
        }

        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}