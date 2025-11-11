'use client';

import { Search, Heart, ShoppingBag, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="w-full flex justify-center px-4 pt-4">
      <nav className="w-full max-w-[95%] bg-gray-800/98 backdrop-blur-md border border-gray-700/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] px-6 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2L12 6L16 8L12 10L10 14L8 10L4 8L8 6L10 2Z"
                  fill="white"
                />
              </svg>
            </button>

            {/* Search Bar */}
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-5 h-5 text-gray-400" strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2.5 w-80 bg-gray-700/60 border border-gray-600/80 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 font-medium text-sm"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-blue-400 font-bold text-base hover:text-blue-300 transition-colors duration-200 relative"
            >
              Systems
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 rounded-full"></span>
            </a>
            <a
              href="#"
              className="text-gray-300 font-semibold text-base hover:text-gray-200 transition-colors duration-200"
            >
              Illustrations
            </a>
            <a
              href="#"
              className="text-gray-300 font-semibold text-base hover:text-gray-200 transition-colors duration-200"
            >
              Templates
            </a>
            <a
              href="#"
              className="text-gray-300 font-semibold text-base hover:text-gray-200 transition-colors duration-200"
            >
              Mockups
            </a>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-300 hover:text-gray-100 hover:bg-gray-700/50 rounded-lg transition-all duration-200">
              <Heart className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button className="p-2 text-gray-300 hover:text-gray-100 hover:bg-gray-700/50 rounded-lg transition-all duration-200">
              <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button className="p-2 text-gray-300 hover:text-gray-100 hover:bg-gray-700/50 rounded-lg transition-all duration-200">
              <Bell className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {/* User Profile */}
            <div className="relative ml-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden relative shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="8" r="4" fill="white" />
                    <path
                      d="M6 20C6 16 9 14 12 14C15 14 18 16 18 20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-blue-600 border-2 border-gray-800 flex items-center justify-center shadow-sm">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 1L6 4L9 5L6 6L5 9L4 6L1 5L4 4L5 1Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

