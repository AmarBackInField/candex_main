import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className="relative w-full bg-black text-white py-6 rounded-t-3xl">
      {/* Background meteors effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold max-w-2xl mb-8">
          Your hiring journey is not a marathon <br /> anymore. It's AI-powered momentum.
        </h1>

        {/* Buttons */}
        <div className="flex gap-4 mt-6 mb-16">
          <Link to="/book-demo" className="bg-black border border-gray-600 text-white px-6 py-3 rounded-full shadow hover:bg-gray-900 transition-all duration-300 inline-block">
            Book a demo
          </Link>
          <Link to="/join-waitlist" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition-all duration-300 inline-block">
            Join waitlist
          </Link>
        </div>
      </div>

      {/* Huge background text */}
      <div className="absolute bottom-20 md:bottom-28 left-1/2 transform -translate-x-1/2 text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400 opacity-20 select-none">
        CANDEXAI<span className="text-gray-400 text-3xl md:text-4xl align-super">™</span>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 w-full flex justify-between items-center px-6 text-xs text-gray-400">
        <p>© CandexAI Inc. 2025</p>
        <div className="space-x-3">
          <a href="#" className="hover:underline transition-all duration-200">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline transition-all duration-200">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;