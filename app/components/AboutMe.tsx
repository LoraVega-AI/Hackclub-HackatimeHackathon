'use client';

import { Sparkles, Code, Palette, Zap } from 'lucide-react';

export default function AboutMe() {
  return (
    <div className="w-full bg-gray-800/98 backdrop-blur-md border-t border-gray-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.3)] py-20 px-12 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-16 items-start">
          {/* Left Side: Content */}
          <div className="flex flex-col gap-8 flex-1 max-w-4xl">
            {/* Section Title */}
            <div className="relative flex items-center gap-4">
              <h2 className="text-blue-400 font-bold text-3xl mb-2">ABOUT</h2>
              {/* Decorative icon */}
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-blue-400" strokeWidth={2.5} />
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                </div>
              </div>
              {/* Wavy underline - changed to blue */}
              <svg className="absolute -bottom-2 left-0" width="200" height="8" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 4 Q50 0, 100 4 T200 4" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Opening Statement */}
            <div className="flex flex-col gap-4">
              <p className="text-gray-300 font-medium text-base leading-relaxed">
                Full-stack developer with 5 years of experience specializing in scalable Node.js APIs and React frontends. 
                I bring a unique blend of technical expertise and creative problem-solving to every project, delivering 
                high-performance applications that exceed client expectations.
              </p>
              <p className="text-gray-300 font-medium text-base leading-relaxed">
                My design philosophy centers on creating intuitive, user-centered experiences that seamlessly blend 
                functionality with aesthetic appeal. I focus on clean, modern interfaces that prioritize usability 
                while maintaining visual impact.
              </p>
            </div>
          </div>

          {/* Right Side: Decorative Elements */}
          <div className="flex-shrink-0 w-64 relative">
            {/* Floating decorative icons */}
            <div className="flex flex-col gap-8 items-center">
              {/* Top icon */}
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border-2 border-blue-400/30 flex items-center justify-center backdrop-blur-sm animate-float">
                <Code className="w-8 h-8 text-blue-400" strokeWidth={2.5} />
              </div>
              
              {/* Middle decorative circles */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400/40 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-blue-400/60"></div>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400/40 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-blue-400" strokeWidth={2.5} />
                </div>
              </div>

              {/* Bottom icon */}
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border-2 border-blue-400/30 flex items-center justify-center backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}>
                <Zap className="w-8 h-8 text-blue-400" strokeWidth={2.5} />
              </div>

              {/* Floating dots */}
              <div className="absolute top-1/4 right-0 w-3 h-3 rounded-full bg-blue-400/40 animate-pulse"></div>
              <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-blue-500/50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/4 right-4 w-2.5 h-2.5 rounded-full bg-blue-400/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

