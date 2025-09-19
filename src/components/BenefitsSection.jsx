import React, { useState, useEffect, useRef } from 'react';

const BenefitsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const benefits = [
    {
      title: "Voice AI validates",
      subtitle: "technical skills instantly",
      description: "First platform to use conversational AI for detecting resume fraud and validating real technical knowledge through dynamic questioning",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <path d="M12 19v4"/>
          <path d="M8 23h8"/>
        </svg>
      ),
      delay: 0
    },
    {
      title: "5-agent ecosystem",
      subtitle: "replaces entire HR teams", 
      description: "Nova hunts talent, Echo validates skills, Atlas remembers everything, Chase coordinates, Sage provides consultation - no human bottlenecks",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      delay: 200
    },
    {
      title: "95% fraud detection",
      subtitle: "through cross-platform analysis",
      description: "Analyze GitHub commits, LinkedIn history, portfolio authenticity, and technical discussions to catch AI-generated resumes and inflated skills",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1h-6c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h6z"/>
          <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/>
        </svg>
      ),
      delay: 400
    }
  ];

  const stats = [
    { value: "First", label: "Voice AI Validation", subtext: "in hiring industry" },
    { value: "5-Agent", label: "AI Ecosystem", subtext: "working in concert" },
    { value: "Cross-Platform", label: "Intelligence", subtext: "fraud detection" },
    { value: "72hr", label: "Complete Process", subtext: "applications to interviews" }
  ];

  return (
    <div 
      ref={sectionRef}
      className="w-full py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Grid Background with Parallax */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Floating Elements with Parallax */}
      <div 
        className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"
        style={{
          transform: `translateY(${scrollY * 0.05}px) rotate(${scrollY * 0.1}deg)`
        }}
      />
      <div 
        className="absolute top-1/4 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl"
        style={{
          transform: `translateY(${scrollY * -0.03}px) rotate(${scrollY * -0.05}deg)`
        }}
      />
      <div 
        className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-xl"
        style={{
          transform: `translateY(${scrollY * 0.02}px) rotate(${scrollY * 0.03}deg)`
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
            Revolutionary AI Hiring <span className="font-normal">Technology</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            The first 5-agent AI system that completely transforms technical hiring from broken to brilliant
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 items-start">
          {/* Left Column - Revolutionary Features */}
          <div className="space-y-16 xl:col-span-2">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                style={{
                  transitionDelay: `${benefit.delay}ms`,
                  transform: `translateY(${scrollY * (0.01 * (index + 1))}px)`
                }}
              >
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 mt-1 p-3 bg-white rounded-lg border border-gray-200 text-gray-700 group-hover:text-blue-600 group-hover:border-blue-200 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-medium text-gray-800 mb-3 group-hover:text-black transition-colors duration-300 leading-tight">
                        {benefit.title}
                      </h3>
                      <div className="text-2xl md:text-3xl font-light text-black mb-4 group-hover:scale-105 transition-transform duration-300 leading-tight">
                        {benefit.subtitle}
                      </div>
                      <div 
                        className="h-px bg-gradient-to-r from-gray-300 to-transparent group-hover:from-blue-400 transition-colors duration-300"
                        style={{
                          width: `${60 + (index * 20)}%`
                        }}
                      />
                    </div>
                    <p className="text-gray-600 font-normal leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-base">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Stats */}
          <div className={`relative transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            <div className="sticky top-24 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-medium text-gray-800 mb-8 text-center">
                  Industry Firsts
                </h3>
                
                <div className="space-y-6">
                  {stats.map((stat, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-lg border border-gray-100 bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        transitionDelay: `${600 + idx * 100}ms`,
                        transform: `translateY(${scrollY * (0.005 * (idx + 1))}px)`
                      }}
                    >
                      <div className="text-xl font-medium text-blue-600 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-lg font-semibold text-gray-800 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {stat.subtext}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Animation Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0s'}} />
              <div className="absolute bottom-8 left-6 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}} />
              <div className="absolute top-1/2 right-6 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;