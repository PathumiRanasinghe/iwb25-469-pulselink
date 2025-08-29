"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getHospital } from "@/utils/auth";

export default function DonorRegistrationPage() {
  const [formData, setFormData] = useState({
    // Donor Identification
    fullName: "",
    estimatedAge: "",
    dateTimeOfDeath: "",
    gender: "",
    causeOfDeath: "",
    brainDeathConfirmed: "",

    // Medical Suitability
    bloodGroup: "",
    knownComorbidities: "",
    wasOnVentilation: "",
    availableOrgans: [] as string[], // Replace availableOrgansForRetrieval string with an array

    // Consent Source
    consentType: "",
    nextOfKinName: "",
    relationshipToDonor: "",
    contactNumber: "",
    signature: null as File | null,

    // Hospital & Action
    hospitalName: "",
    unitWard: "",
    loggedByStaffName: "",
    role: "",
    personFillingForm: "",
  });

  const [currentOrgan, setCurrentOrgan] = useState(""); // Add a new state for the current organ input

  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Effect to pre-fill hospital information when available
  useEffect(() => {
    const hospitalInfo = getHospital();
    if (hospitalInfo) {
      setFormData((prev) => ({
        ...prev,
        hospitalName: hospitalInfo.hospitalName,
      }));
    }
  }, []);

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
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Please upload an image (JPG, PNG) or PDF file");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        signature: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage(null);

    try {
      // Get logged in hospital info
      const hospitalInfo = getHospital();

      // Prepare the data to send to API
      const donorData = {
        // Donor Identification
        fullName: formData.fullName,
        estimatedAge: formData.estimatedAge,
        dateTimeOfDeath: formData.dateTimeOfDeath,
        gender: formData.gender,
        causeOfDeath: formData.causeOfDeath,
        brainDeathConfirmed: formData.brainDeathConfirmed,

        // Medical Suitability
        bloodGroup: formData.bloodGroup,
        knownComorbidities: formData.knownComorbidities,
        wasOnVentilation: formData.wasOnVentilation,
        availableOrgansForRetrieval: formData.availableOrgans,

        // Consent Source
        consentType: formData.consentType,
        nextOfKinName: formData.nextOfKinName,
        relationshipToDonor: formData.relationshipToDonor,
        contactNumber: formData.contactNumber,

        // Hospital & Action - use cookie data if available
        hospitalName: hospitalInfo?.hospitalName || formData.hospitalName,
        hospitalEmail: hospitalInfo?.contactEmail, // Add the hospital email from cookies
        unitWard: formData.unitWard,
        loggedByStaffName: formData.loggedByStaffName,
        role: formData.role,
        personFillingForm: formData.personFillingForm,
      };

      // Make API call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/donors/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donorData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "Donor registration submitted successfully!",
        });
        // Reset form after successful submission
        setFormData({
          // Reset all form fields
          fullName: "",
          estimatedAge: "",
          dateTimeOfDeath: "",
          gender: "",
          causeOfDeath: "",
          brainDeathConfirmed: "",
          bloodGroup: "",
          knownComorbidities: "",
          wasOnVentilation: "",
          availableOrgans: [],
          consentType: "",
          nextOfKinName: "",
          relationshipToDonor: "",
          contactNumber: "",
          signature: null,
          hospitalName: hospitalInfo?.hospitalName || "",
          unitWard: "",
          loggedByStaffName: "",
          role: "",
          personFillingForm: "",
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: result.message || "Failed to register donor",
        });
      }
    } catch (error) {
      console.error("Error registering donor:", error);
      setSubmitMessage({
        type: "error",
        text: "An error occurred while trying to register the donor",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOrgan = () => {
    if (currentOrgan.trim() === "") return;

    setFormData((prev) => ({
      ...prev,
      availableOrgans: [...prev.availableOrgans, currentOrgan.trim()],
    }));
    setCurrentOrgan("");
  };

  const handleRemoveOrgan = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      availableOrgans: prev.availableOrgans.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddOrgan();
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
                <div>
                  <h1 className="text-xl font-bold text-white">PulseLink</h1>
                  <p className="text-sm text-gray-400">
                    Organ Donor (Deceased) Intake Form
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400">For Medical Staff Use</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Donor Identification Section */}
            <section className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Donor Identification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full name of Donor
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: Adam"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Estimated Age
                  </label>
                  <input
                    type="text"
                    name="estimatedAge"
                    value={formData.estimatedAge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="If exact DOB unavailable"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date & Time of Death
                  </label>
                  <input
                    type="datetime-local"
                    name="dateTimeOfDeath"
                    value={formData.dateTimeOfDeath}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>

                {/* Gender Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Gender
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="relative flex items-center p-4 bg-gradient-to-r from-gray-700/40 to-gray-600/40 border border-gray-500/50 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-gray-600/50 hover:to-gray-500/50 hover:border-gray-400/60 hover:shadow-lg hover:shadow-green-400/5 transition-all duration-300 ease-in-out transform hover:scale-[1.02] backdrop-blur-sm">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-green-400 focus:ring-green-400/50 focus:ring-2 border-gray-500 bg-gray-700/60 transition-all duration-200"
                      />
                      <span className="ml-3 text-gray-300 font-medium">
                        Male
                      </span>
                      {formData.gender === "male" && (
                        <div className="absolute top-2 right-2">
                          <svg
                            className="w-4 h-4 text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </label>
                    <label className="relative flex items-center p-4 bg-gradient-to-r from-gray-700/40 to-gray-600/40 border border-gray-500/50 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-gray-600/50 hover:to-gray-500/50 hover:border-gray-400/60 hover:shadow-lg hover:shadow-green-400/5 transition-all duration-300 ease-in-out transform hover:scale-[1.02] backdrop-blur-sm">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-green-400 focus:ring-green-400/50 focus:ring-2 border-gray-500 bg-gray-700/60 transition-all duration-200"
                      />
                      <span className="ml-3 text-gray-300 font-medium">
                        Female
                      </span>
                      {formData.gender === "female" && (
                        <div className="absolute top-2 right-2">
                          <svg
                            className="w-4 h-4 text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </label>
                    <label className="relative flex items-center p-4 bg-gradient-to-r from-gray-700/40 to-gray-600/40 border border-gray-500/50 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-gray-600/50 hover:to-gray-500/50 hover:border-gray-400/60 hover:shadow-lg hover:shadow-green-400/5 transition-all duration-300 ease-in-out transform hover:scale-[1.02] backdrop-blur-sm">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === "other"}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-green-400 focus:ring-green-400/50 focus:ring-2 border-gray-500 bg-gray-700/60 transition-all duration-200"
                      />
                      <span className="ml-3 text-gray-300 font-medium">
                        Other
                      </span>
                      {formData.gender === "other" && (
                        <div className="absolute top-2 right-2">
                          <svg
                            className="w-4 h-4 text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cause of Death
                  </label>
                  <input
                    type="text"
                    name="causeOfDeath"
                    value={formData.causeOfDeath}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: Road Traffic Accident, Stroke"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Brain Death Confirmed
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative flex items-center p-3 bg-gradient-to-r from-gray-700/40 to-gray-600/40 border border-gray-500/50 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-gray-600/50 hover:to-gray-500/50 transition-all duration-300 backdrop-blur-sm">
                      <input
                        type="radio"
                        name="brainDeathConfirmed"
                        value="yes"
                        checked={formData.brainDeathConfirmed === "yes"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-400 focus:ring-green-400/50 border-gray-500 bg-gray-700/60"
                      />
                      <span className="ml-3 text-gray-300 font-medium">
                        Yes
                      </span>
                    </label>
                    <label className="relative flex items-center p-3 bg-gradient-to-r from-gray-700/40 to-gray-600/40 border border-gray-500/50 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-gray-600/50 hover:to-gray-500/50 transition-all duration-300 backdrop-blur-sm">
                      <input
                        type="radio"
                        name="brainDeathConfirmed"
                        value="no"
                        checked={formData.brainDeathConfirmed === "no"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-400 focus:ring-green-400/50 border-gray-500 bg-gray-700/60"
                      />
                      <span className="ml-3 text-gray-300 font-medium">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Medical Suitability Section */}
            <section className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Medical Suitability
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Blood Group
                  </label>
                  <div className="relative group">
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 hover:border-gray-400/60 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:scale-[1.02] appearance-none cursor-pointer backdrop-blur-sm"
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Select Blood Group
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
                    Known Comorbidities
                  </label>
                  <input
                    type="text"
                    name="knownComorbidities"
                    value={formData.knownComorbidities}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: Diabetes, Hypertension"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Was the donor on ventilation?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative flex items-center p-3 bg-gradient-to-r from-gray-700/40 to-gray-600/40 border border-gray-500/50 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-gray-600/50 hover:to-gray-500/50 transition-all duration-300 backdrop-blur-sm">
                      <input
                        type="radio"
                        name="wasOnVentilation"
                        value="yes"
                        checked={formData.wasOnVentilation === "yes"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-400 focus:ring-green-400/50 border-gray-500 bg-gray-700/60"
                      />
                      <span className="ml-3 text-gray-300 font-medium">
                        Yes
                      </span>
                    </label>
                    <label className="relative flex items-center p-3 bg-gradient-to-r from-gray-700/40 to-gray-600/40 border border-gray-500/50 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-gray-600/50 hover:to-gray-500/50 transition-all duration-300 backdrop-blur-sm">
                      <input
                        type="radio"
                        name="wasOnVentilation"
                        value="no"
                        checked={formData.wasOnVentilation === "no"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-400 focus:ring-green-400/50 border-gray-500 bg-gray-700/60"
                      />
                      <span className="ml-3 text-gray-300 font-medium">No</span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Available Organs for Retrieval
                  </label>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={currentOrgan}
                        onChange={(e) => setCurrentOrgan(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                        placeholder="ex: Kidney, Liver, Heart, Cornea"
                      />
                      <button
                        type="button"
                        onClick={handleAddOrgan}
                        className="flex items-center justify-center px-4 py-3 bg-green-600 rounded-xl text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400/70 transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    {formData.availableOrgans.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formData.availableOrgans.map((organ, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-1 bg-gray-700/60 text-white px-3 py-1.5 rounded-lg"
                          >
                            <span>{organ}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveOrgan(index)}
                              className="text-gray-300 hover:text-red-400 focus:outline-none"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {formData.availableOrgans.length === 0 && (
                      <p className="text-sm text-gray-400 italic">
                        No organs added yet. Add organs one by one.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Consent Source Section */}
            <section className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Consent Source
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Consent Type
                  </label>
                  <div className="relative group">
                    <select
                      name="consentType"
                      value={formData.consentType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 hover:border-gray-400/60 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:scale-[1.02] appearance-none cursor-pointer backdrop-blur-sm"
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Select Consent Type
                      </option>
                      <option
                        value="prior"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Prior Consent
                      </option>
                      <option
                        value="family"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Family Consent
                      </option>
                      <option
                        value="medical"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Medical Decision
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
                    Next of Kin Name
                  </label>
                  <input
                    type="text"
                    name="nextOfKinName"
                    value={formData.nextOfKinName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="If family consent obtained"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Relationship to Donor
                  </label>
                  <div className="relative group">
                    <select
                      name="relationshipToDonor"
                      value={formData.relationshipToDonor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 hover:border-gray-400/60 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:scale-[1.02] appearance-none cursor-pointer backdrop-blur-sm"
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Select Relationship
                      </option>
                      <option
                        value="parent"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Parent
                      </option>
                      <option
                        value="spouse"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Spouse
                      </option>
                      <option
                        value="sibling"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Sibling
                      </option>
                      <option
                        value="child"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Child
                      </option>
                      <option
                        value="other"
                        style={{ backgroundColor: "#374151", color: "#d1d5db" }}
                      >
                        Other
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
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: (+94) 712-345678"
                  />
                </div>

                {/* Signature Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Signature
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="signature"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="signature"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-200"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">
                            Image or scanned PDF
                          </span>
                        </p>
                      </div>
                    </label>
                    {formData.signature && (
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
                              {formData.signature.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                signature: null,
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

            {/* Hospital & Action Section */}
            <section className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Hospital & Action
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: ABC Hospital"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Unit / Ward
                  </label>
                  <input
                    type="text"
                    name="unitWard"
                    value={formData.unitWard}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: A&E, ICU"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Logged by (Staff Name)
                  </label>
                  <input
                    type="text"
                    name="loggedByStaffName"
                    value={formData.loggedByStaffName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Person filling this form"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-600/60 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/70 focus:border-green-400/50 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="ex: Doctor, Nurse"
                  />
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                    Submitting...
                  </div>
                ) : (
                  "Submit donor form"
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

          {/* Submit Message */}
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
