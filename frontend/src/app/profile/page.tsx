"use client";

import Image from "next/image";
import React from "react";

export default function ProfilePage() {
  // Simulated user data
  const [editMode, setEditMode] = React.useState(false);
  const [name, setName] = React.useState("Dr. John Smith");
  const [email, setEmail] = React.useState("johnsmith@mail.com");
  const user = {
    hospitalName: "ABC Hospital",
    contactPerson: name,
    username: "johnsmith_test",
    contactEmail: email,
    contactPhone: "+1 (555) 573 - 4331",
    address: "14 street, New York, NY - 5101",
    avatar: "/profile-icon.jpg",
    joined: "Jan 2025",
    timezone: "GMT +2:00 Europe",
    notification: "Email every notification",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
      <div className="w-full max-w-4xl px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Card: Profile Details */}
          <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl border border-blue-200/30 shadow-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              My profile
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-blue-100 mb-1">
                    Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg bg-white/30 text-black px-3 py-2 border border-blue-300/30 focus:outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={user.contactPerson}
                      readOnly
                      className="w-full rounded-lg bg-white/20 text-white px-3 py-2 border border-blue-300/30 focus:outline-none"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm text-blue-100 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={user.username}
                    readOnly
                    className="w-full rounded-lg bg-white/20 text-white px-3 py-2 border border-blue-300/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-blue-100 mb-1">
                    E-mail
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg bg-white/30 text-black px-3 py-2 border border-blue-300/30 focus:outline-none"
                    />
                  ) : (
                    <input
                      type="email"
                      value={user.contactEmail}
                      readOnly
                      className="w-full rounded-lg bg-white/20 text-white px-3 py-2 border border-blue-300/30 focus:outline-none"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm text-blue-100 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={"password123"}
                    readOnly
                    className="w-full rounded-lg bg-white/20 text-white px-3 py-2 border border-blue-300/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 mt-6 text-center">
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  {editMode ? (
                    <>
                      <button
                        type="button"
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-lg transition-colors shadow-lg"
                        onClick={() => setEditMode(false)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-8 rounded-lg transition-colors shadow-lg"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg transition-colors shadow-lg"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Info
                    </button>
                  )}
                  <a
                    href="/"
                    className="bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-8 rounded-lg transition-colors shadow-lg text-center"
                  >
                    Home
                  </a>
                </div>
              </div>
            </form>
            <p className="text-xs text-blue-200 mt-4">
              * Mel no commune aperian
            </p>
          </div>
          {/* Right Card: Avatar & Stats */}
          <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl border border-blue-200/30 shadow-2xl p-8 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={user.avatar}
                  alt="Profile"
                  width={150}
                  height={150}
                  className="object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg border-2 border-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-xl font-bold text-white mb-1">
                {user.contactPerson}
              </h1>
              <span className="text-blue-200 text-lg mb-2">
                {user.hospitalName}
              </span>
              <span className="text-blue-100 text-sm">
                Joined: {user.joined}
              </span>
            </div>

            <form className="w-full grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm text-blue-100 mb-1">
                  Timezone
                </label>
                <input
                  type="text"
                  value={user.timezone}
                  readOnly
                  className="w-full rounded-lg bg-white/20 text-white px-3 py-2 border border-blue-300/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-blue-100 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={user.address}
                  readOnly
                  className="w-full rounded-lg bg-white/20 text-white px-3 py-2 border border-blue-300/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-blue-100 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={user.contactPhone}
                  readOnly
                  className="w-full rounded-lg bg-white/20 text-white px-3 py-2 border border-blue-300/30 focus:outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
