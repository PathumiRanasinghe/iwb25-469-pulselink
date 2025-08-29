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
    generalPractitioner: "",
    practitionerRegistration: "",
    diagnosis: "",
    comorbidities: "",

    // Organ Request Information
    requestedOrgan: "",
    bloodType: "",
    riskFatality: "",
    urgencyLevel: "",
    estimatedSurvival: "",
    crossMatchReport: null as File | null,

    // Identification and Verification
    identificationType: "",
    idNumber: "",

    // Consent
    consentInformation: false,
    consentSharing: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      // Check file type
      const allowedTypes = [
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a TXT, DOC, DOCX, or PDF file");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        crossMatchReport: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage(null);

    try {
      // Check if consent is given
      if (!formData.consentInformation || !formData.consentSharing) {
        setSubmitMessage({
          type: "error",
          text: "You must agree to the consent terms to register",
        });
        setIsLoading(false);
        return;
      }

      // Prepare the data to send to API
      const patientData = {
        fullName: formData.fullName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,

        generalPractitioner: formData.generalPractitioner,
        practitionerRegistration: formData.practitionerRegistration,
        diagnosis: formData.diagnosis,
        comorbidities: formData.comorbidities,

        requestedOrgan: formData.requestedOrgan,
        bloodType: formData.bloodType,
        riskFatality: formData.riskFatality,
        urgencyLevel: formData.urgencyLevel,
        estimatedSurvival: formData.estimatedSurvival,

        identificationType: formData.identificationType,
        idNumber: formData.idNumber,
      };

      // Make API call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/patients/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        }
      );
      console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patients/register`);

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "Patient registered successfully!",
        });
        // Optional: Reset form after successful submission
        setFormData({
          fullName: "",
          lastName: "",
          phoneNumber: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          emergencyContactName: "",
          emergencyContactPhone: "",
          bloodType: "",
          generalPractitioner: "",
          practitionerRegistration: "",
          diagnosis: "",
          comorbidities: "",
          requestedOrgan: "",
          riskFatality: "",
          urgencyLevel: "",
          estimatedSurvival: "",
          identificationType: "",
          idNumber: "",
          consentInformation: false,
          consentSharing: false,
          crossMatchReport: null,
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: result.message || "Failed to register patient",
        });
      }
    } catch (error) {
      console.error("Error registering patient:", error);
      setSubmitMessage({
        type: "error",
        text: "An error occurred while trying to register the patient",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src="/PulseLink logo.png"
                  alt="PulseLink Logo"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div></div>
              </div>
              <p className="text-sm text-gray-400">Patient Registration</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Show success/error message */}
          {submitMessage && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitMessage.type === "success"
                  ? "bg-green-800/50 text-green-200"
                  : "bg-red-800/50 text-red-200"
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <section className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Personal Information
              </h3>
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
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="First Name"
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
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
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
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: (+94) 712-345678"
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
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
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
                  className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                  placeholder="ex: 1st street, New York, NY, 10001"
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
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
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
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: (+94) 712-345678"
                  />
                </div>
              </div>
            </section>

            {/* Medical Information Section */}
            <section className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Medical Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    General Practitioner
                  </label>
                  <input
                    type="text"
                    name="generalPractitioner"
                    value={formData.generalPractitioner}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
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
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
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
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: Renal failure related disease"
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
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: diabetes, hypertension"
                  />
                </div>
              </div>
            </section>

            {/* Organ Request Information Section */}
            <section className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Organ Request Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Requested Organ
                  </label>
                  <div className="relative group">
                    <select
                      name="requestedOrgan"
                      value={formData.requestedOrgan}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 hover:border-gray-400/60 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:scale-[1.02] appearance-none cursor-pointer backdrop-blur-sm"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 12px center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "16px",
                      }}
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Select Organ
                      </option>
                      <option
                        value="kidney"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Kidney
                      </option>
                      <option
                        value="liver"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Liver
                      </option>
                      <option
                        value="heart"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Heart
                      </option>
                      <option
                        value="lung"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Lung
                      </option>
                      <option
                        value="pancreas"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Pancreas
                      </option>
                      <option
                        value="cornea"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Cornea
                      </option>
                      <option
                        value="bone"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Bone
                      </option>
                      <option
                        value="skin"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Skin
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Blood Type
                  </label>
                  <div className="relative group">
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 hover:border-gray-400/60 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:scale-[1.02] appearance-none cursor-pointer backdrop-blur-sm"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 12px center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "16px",
                      }}
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Select Blood Type
                      </option>
                      <option
                        value="A+"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        A+
                      </option>
                      <option
                        value="A-"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        A-
                      </option>
                      <option
                        value="B+"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        B+
                      </option>
                      <option
                        value="B-"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        B-
                      </option>
                      <option
                        value="AB+"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        AB+
                      </option>
                      <option
                        value="AB-"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        AB-
                      </option>
                      <option
                        value="O+"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        O+
                      </option>
                      <option
                        value="O-"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        O-
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Risk Fatality
                  </label>
                  <div className="relative group">
                    <select
                      name="riskFatality"
                      value={formData.riskFatality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 hover:border-gray-400/60 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:scale-[1.02] appearance-none cursor-pointer backdrop-blur-sm"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 12px center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "16px",
                      }}
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Critically life-limiting
                      </option>
                      <option
                        value="high"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        High
                      </option>
                      <option
                        value="moderate"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Moderate
                      </option>
                      <option
                        value="low"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Low
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Urgency Level
                  </label>
                  <div className="relative group">
                    <select
                      name="urgencyLevel"
                      value={formData.urgencyLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 hover:border-gray-400/60 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:scale-[1.02] appearance-none cursor-pointer backdrop-blur-sm"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 12px center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "16px",
                      }}
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Select Urgency
                      </option>
                      <option
                        value="critical"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Critical
                      </option>
                      <option
                        value="urgent"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Urgent
                      </option>
                      <option
                        value="routine"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Routine
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
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
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    placeholder="ex: 6 weeks (current) vs multiple years"
                  />
                </div>

                Crossmatch Test Report Upload
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Crossmatch Test Report
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="crossMatchReport"
                      accept=".txt,.doc,.docx,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="crossMatchReport"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-200"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          TXT, DOC, DOCX or PDF (MAX. 10MB)
                        </p>
                      </div>
                    </label>
                    {formData.crossMatchReport && (
                      <div className="mt-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 text-green-400 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-gray-300">
                              {formData.crossMatchReport.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                crossMatchReport: null,
                              }))
                            }
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Identification and Verification Section */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-6">
                Identification and Verification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Identification Type
                  </label>
                  <div className="relative group">
                    <select
                      name="identificationType"
                      value={formData.identificationType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 appearance-none backdrop-blur-sm hover:bg-gradient-to-r hover:from-gray-600/60 hover:to-gray-500/60 pr-10"
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Select Identification Type
                      </option>
                      <option
                        value="national_id"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        National ID
                      </option>
                      <option
                        value="passport"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Passport
                      </option>
                      <option
                        value="drivers_license"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Driver&apos;s License
                      </option>
                      <option
                        value="birth_certificate"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Birth Certificate
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
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
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    placeholder="ex: A12345"
                  />
                </div>
              </div>
            </section>

            {/* Patient Consent Agreement Section */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-6">
                Patient Consent Agreement
              </h3>
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
                    I confirm that all the information provided above is
                    accurate and truthful to the best of my knowledge.
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
                    I agree to allow my medical data sharing with relevant
                    healthcare providers and I consent to being contacted by the
                    hospital for further medical evaluation.
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
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting Application...
                  </div>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>

            {/* Back to Home Link */}
            <div className="text-center pt-4">
              <Link
                href="/"
                className="text-sky-300 hover:text-sky-300 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
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
          pointer-events: none;
        }

        .shape {
          position: absolute;
          background: linear-gradient(
            45deg,
            rgba(34, 197, 94, 0.1),
            rgba(34, 197, 94, 0.05)
          );
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 120px;
          height: 120px;
          left: 20%;
          animation-delay: 5s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          left: 70%;
          animation-delay: 10s;
        }

        .shape-4 {
          width: 100px;
          height: 100px;
          left: 80%;
          animation-delay: 15s;
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
      `}</style>
    </div>
  );
}
