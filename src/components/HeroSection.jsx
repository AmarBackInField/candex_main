"use client";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Clean Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>


      {/* Enhanced Professional Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300">
        <div className="flex items-center justify-between bg-black px-8 py-3 rounded-full shadow-lg w-96">
          {/* Left Logo Section */}
          <div className="flex items-center space-x-3">
            <img
             src='/logo.jpg'
              alt="candexLogo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-white font-bold text-xl tracking-wide">CandexAI</span>
            <span className="text-sm text-gray-300 align-top">™</span>
          </div>

          {/* Right Button */}
          <Link
            to="/join-waitlist"
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm px-5 py-2 rounded-full transition-all duration-200 inline-block"
          >
            Join waitlist
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        {/* Main Headline */}
        <h1 className={`text-6xl md:text-7xl lg:text-8xl font-normal text-black mb-8 leading-tight tracking-tight transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          Revolutionary AI Hiring
          <br />
          <span className="font-light">Platform for Tech</span>
        </h1>

        {/* Description */}
        <p className={`text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          Transform 1000+ applications into 25 interview-ready candidates in 72 hours. Our 5-agent AI ecosystem eliminates resume fraud, validates technical skills through voice conversations, and reduces hiring costs by 75%.
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Link to="/book-demo" className="bg-white hover:bg-gray-50 text-black border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-full text-base font-medium transition-all duration-200 hover:shadow-sm inline-block">
            Book a demo
          </Link>
          
          <Link to="/join-waitlist" className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full text-base font-medium transition-all duration-200 inline-block">
            Join waitlist
          </Link>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center">
            <div className="text-3xl font-light text-black mb-2">95%</div>
            <div className="text-sm text-gray-500 font-light">Fraud Detection Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-black mb-2">72hrs</div>
            <div className="text-sm text-gray-500 font-light">Application to Interview</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-black mb-2">75%</div>
            <div className="text-sm text-gray-500 font-light">Cost Reduction</div>
          </div>
        </div>
      </div>

      {/* Floating gradient blurs - positioned to match Findly style */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-purple-200/30 to-pink-200/30 rounded-full blur-3xl transform translate-x-1/2" />
    </div>
  );
};

export default HeroSection;