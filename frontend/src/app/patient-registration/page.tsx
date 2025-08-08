"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PatientRegistrationPage() {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    
    // Medical Information
    bloodType: "",
    generalPractitioner: "",
    practitionerRegistration: "",
    diagnosis: "",
    comorbidities: "",
    
    // Organ Request Information
    requestedOrgan: "",
    bloodType2: "",
    riskFatality: "",
    urgencyLevel: "",
    estimatedSurvival: "",
    
    // Identification and Verification
    identificationType: "",
    idNumber: "",
    
    // Consent
    consentInformation: false,
    consentSharing: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      console.log("Patient registration:", formData);
      // Handle form submission logic here
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        
        {/* Floating Medical Elements */}
        <div className="absolute top-10 right-10 text-red-400/20 animate-pulse-slow">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2h2v8h8v2h-8v8h-2v-8H3v-2h8V2z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-10 text-blue-400/20 animate-bounce-slow">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full animate-pulse-slow blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse-slow-delayed blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/PulseLink logo.png"
                alt="PulseLink Logo"
                width={48}
                height={48}
                className="mr-3"
              />
              <h1 className="text-3xl font-bold text-white">PulseLink</h1>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">Register Here</h2>
            <p className="text-sky-300">Organ Requesting Patient Details Form</p>
          </div>

          {/* Main Form */}
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700/50">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information Section */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Last Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., (+94) 812-345"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                {/* Gender Selection */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gender
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 bg-gray-700"
                      />
                      <span className="ml-2 text-gray-300">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 bg-gray-700"
                      />
                      <span className="ml-2 text-gray-300">Female</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === "other"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 bg-gray-700"
                      />
                      <span className="ml-2 text-gray-300">Other</span>
                    </label>
                  </div>
                </div>
                
                {/* Address */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 1st street, New York, NY, 10001"
                  />
                </div>
                
                {/* Emergency Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Contact name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Emergency Phone Number
                    </label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., (+94) 812-345"
                    />
                  </div>
                </div>
              </section>

              {/* Medical Information Section */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-6">Medical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Blood Type
                    </label>
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      General Practitioner
                    </label>
                    <input
                      type="text"
                      name="generalPractitioner"
                      value={formData.generalPractitioner}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Doctor's Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Practitioner Registration Number
                    </label>
                    <input
                      type="text"
                      name="practitionerRegistration"
                      value={formData.practitionerRegistration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Registration Number"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Diagnosis
                    </label>
                    <textarea
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Renal failure related disease"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Comorbidities
                    </label>
                    <textarea
                      name="comorbidities"
                      value={formData.comorbidities}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Any diabetes, hypertension"
                    />
                  </div>
                </div>
              </section>

              {/* Organ Request Information Section */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-6">Organ Request Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Requested Organ
                    </label>
                    <select
                      name="requestedOrgan"
                      value={formData.requestedOrgan}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Organ</option>
                      <option value="kidney">Kidney</option>
                      <option value="liver">Liver</option>
                      <option value="heart">Heart</option>
                      <option value="lung">Lung</option>
                      <option value="pancreas">Pancreas</option>
                      <option value="cornea">Cornea</option>
                      <option value="bone">Bone</option>
                      <option value="skin">Skin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Blood Type
                    </label>
                    <select
                      name="bloodType2"
                      value={formData.bloodType2}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Risk Fatality
                    </label>
                    <select
                      name="riskFatality"
                      value={formData.riskFatality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Critically life-limiting</option>
                      <option value="high">High</option>
                      <option value="moderate">Moderate</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Urgency Level
                    </label>
                    <select
                      name="urgencyLevel"
                      value={formData.urgencyLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Urgency</option>
                      <option value="critical">Critical</option>
                      <option value="urgent">Urgent</option>
                      <option value="routine">Routine</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estimated Survival
                    </label>
                    <textarea
                      name="estimatedSurvival"
                      value={formData.estimatedSurvival}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 6 weeks (current) vs multiple years"
                    />
                  </div>
                </div>
              </section>

              {/* Identification and Verification Section */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-6">Identification and Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Identification Type
                    </label>
                    <select
                      name="identificationType"
                      value={formData.identificationType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Birth Certificate</option>
                      <option value="national_id">National ID</option>
                      <option value="passport">Passport</option>
                      <option value="drivers_license">Driver's License</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Identification Number
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., A12345"
                    />
                  </div>
                </div>
              </section>

              {/* Patient Consent Agreement Section */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-6">Patient Consent Agreement</h3>
                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="consentInformation"
                      checked={formData.consentInformation}
                      onChange={handleInputChange}
                      required
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700 mt-1"
                    />
                    <span className="ml-3 text-sm text-gray-300">
                      I confirm that all the information provided above is accurate and truthful to the best of my knowledge.
                    </span>
                  </label>
                  
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="consentSharing"
                      checked={formData.consentSharing}
                      onChange={handleInputChange}
                      required
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700 mt-1"
                    />
                    <span className="ml-3 text-sm text-gray-300">
                      I agree to allow my medical data sharing with relevant healthcare providers and I consent to being contacted by the hospital for further medical evaluation.
                    </span>
                  </label>
                </div>
              </section>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Application...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
              
              {/* Back to Home Link */}
              <div className="text-center pt-4">
                <Link href="/" className="text-red-400 hover:text-red-300 transition-colors">
                  ← Back to Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slow-delayed { animation: pulse-slow-delayed 5s ease-in-out infinite 1s; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
