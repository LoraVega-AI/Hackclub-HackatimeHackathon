'use client';

import { Twitter, Facebook, Instagram } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="w-full bg-gray-800/98 backdrop-blur-md border-t border-gray-700/60 rounded-t-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] h-screen flex items-center -mt-28 pt-36 relative z-10 overflow-hidden">
      <div className="w-full flex items-center px-12 py-16">
        <div className="flex gap-16 items-center w-full">
          {/* Large Portrait Image - Main Focus */}
          <div className="flex-shrink-0">
            <div className="w-[500px] h-[650px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/30 to-purple-500/30 shadow-2xl -mt-8">
              <div className="w-full h-full bg-gray-700 rounded-2xl flex items-center justify-center">
                <svg
                  width="400"
                  height="400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-500"
                >
                  <circle cx="12" cy="8" r="4" fill="currentColor" />
                  <path
                    d="M6 20C6 16 9 14 12 14C15 14 18 16 18 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Underline */}
            <div className="w-16 h-0.5 bg-blue-400"></div>

            {/* Name */}
            <h2 className="text-white font-bold text-5xl">Elon Musk</h2>

            {/* Title */}
            <p className="text-gray-400 font-semibold text-lg">CEO / Lead Design</p>

            {/* Biography */}
            <p className="text-gray-300 font-medium text-base leading-relaxed max-w-2xl">
              SpaceX designs, manufactures and launches advanced rockets and spacecraft. 
              The company was founded in 2002 to revolutionize space technology, with the 
              ultimate goal of enabling people to live on other planets. Elon Musk serves 
              as CEO and Lead Designer, overseeing the development of rockets and spacecraft 
              for missions to Earth orbit and ultimately to Mars and beyond.
            </p>

            {/* Bottom Section with Signature and Social Icons */}
            <div className="flex items-end justify-between mt-4">
              <div className="flex items-center gap-6">
                {/* Small Image/Icon */}
                <div className="w-20 h-20 rounded-lg bg-gray-700/50 flex items-center justify-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Signature */}
                <div className="text-white font-bold text-xl italic" style={{ fontFamily: 'cursive' }}>
                  Elon Musk
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-700/50 hover:bg-gray-700 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-200"
                >
                  <Twitter className="w-5 h-5" strokeWidth={2.5} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-700/50 hover:bg-gray-700 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-200"
                >
                  <Facebook className="w-5 h-5" strokeWidth={2.5} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-700/50 hover:bg-gray-700 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

