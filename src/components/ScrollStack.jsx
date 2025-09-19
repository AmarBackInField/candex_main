import React, { useState, useEffect, useRef, useCallback } from 'react';

// Enhanced ScrollStackItem with better animations
export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card transform transition-all duration-700 ease-out ${itemClassName}`.trim()}>
    {children}
  </div>
);

// Clean subtle grid background for professional look
const ProfessionalGrid = () => (
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
);

// Enhanced Main Agents Showcase Component
const ScrollStack = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState({});
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const isScrolling = useRef(false);
  const animationFrameRef = useRef(null);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    // Enhanced Intersection Observer with better thresholds
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'), 10);
            setActiveIndex(index);
          }
        });
      },
      { 
        threshold: [0.3, 0.7],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    // Observe all slides with delay
    setTimeout(() => {
    const slides = document.querySelectorAll('.agent-slide');
    slides.forEach(slide => observer.observe(slide));
    }, 500);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      observer.disconnect();
    };
  }, []);

  // Professional Agent data with black & white theme
  const agents = [
    {
      id: 1,
      name: "Nova",
      title: "The Talent Hunter",
      tagline: "From 1000 to 100 in minutes",
      description: "Processes massive application volumes by analyzing LinkedIn profiles, GitHub repositories, and portfolios simultaneously. Uses cross-platform intelligence to filter out 90% of unqualified candidates with 95% accuracy.",
      image: "/nova.png",
      color: "from-gray-800 to-black",
      accentColor: "bg-gray-800",
      textColor: "text-gray-800"
    },
    {
      id: 2,
      name: "Echo", 
      title: "The Voice Detective",
      tagline: "Catches lies through conversation",
      description: "First AI to use voice interviews for technical validation. Asks dynamic questions about claimed projects to expose resume fraud and AI-generated portfolios through contextual questioning.",
      image: "/Echo - The Voice Detective.png",
      color: "from-gray-700 to-gray-900",
      accentColor: "bg-gray-700",
      textColor: "text-gray-800"
    },
    {
      id: 3,
      name: "Atlas",
      title: "The Memory Keeper", 
      tagline: "Never forgets, always learns",
      description: "Maintains comprehensive candidate intelligence and interaction history. Uses machine learning to identify patterns in successful hires, creating institutional hiring memory that compounds over time.",
      image: "/Atlas - The Memory Keeper.png",
      color: "from-gray-600 to-gray-800",
      accentColor: "bg-gray-600",
      textColor: "text-gray-800"
    },
    {
      id: 4,
      name: "Chase",
      title: "The Connection Specialist",
      tagline: "From candidate to calendar in 48 hours", 
      description: "Handles personalized outreach and interview coordination at scale. Manages multi-channel communication and optimizes scheduling to prevent qualified candidates from dropping off.",
      image: "/Chase - The Connection Specialist.png",
      color: "from-black to-gray-800",
      accentColor: "bg-black",
      textColor: "text-gray-800"
    },
    {
      id: 5,
      name: "Sage",
      title: "The Oracle",
      tagline: "Your AI hiring consultant, always available",
      description: "Provides real-time consultation and decision intelligence. Explains AI reasoning in human terms and offers predictive insights for interview success with full audit trails.",
      image: "/Sage - The Oracle.png",
      color: "from-gray-500 to-gray-700", 
      accentColor: "bg-gray-500",
      textColor: "text-gray-800"
    }
  ];

  // Enhanced scroll to specific slide with better animation
  const scrollToSlide = useCallback((index) => {
    if (isScrolling.current) return;
    
    isScrolling.current = true;
    setActiveIndex(index);
    
    const slide = document.querySelector(`[data-index="${index}"]`);
    if (slide) {
      slide.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
    
    // Reset scrolling flag after animation completes
    setTimeout(() => {
      isScrolling.current = false;
    }, 1200);
  }, []);

  // Handle image load with animation
  const handleImageLoad = (agentId) => {
    setImageLoaded(prev => ({
      ...prev,
      [agentId]: true
    }));
  };

  // Grid background component
  const GridBackground = () => (
    <div className="absolute inset-0 opacity-10">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );

  // Removed navigation indicators for cleaner look

  // Add custom CSS for full-screen scroll snap animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(5deg); }
        50% { transform: translateY(0px) rotate(10deg); }
        75% { transform: translateY(-5px) rotate(5deg); }
      }
      
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      .shimmer::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
        animation: shimmer 2s ease-in-out infinite;
      }
      
      .scroll-snap-slide {
        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="w-full relative">
      {/* Clean Progress bar */}
      <div className="fixed top-0 left-0 h-0.5 z-50 bg-gray-200">
        <div 
          className="h-full bg-black transition-all duration-700 ease-out"
          style={{ width: `${Math.max(0, activeIndex + 2) * (100 / 7)}%` }}
        />
      </div>
      
      {/* Full-screen content */}
      <div 
        ref={containerRef}
        className="w-full"
      >
        {/* Professional Header section */}
        <section className="scroll-snap-slide bg-white relative">
          <ProfessionalGrid />
          
          <div className="relative z-10 max-w-5xl px-6 text-center">
            <div className="mb-12">
              <div className="inline-block px-6 py-2 bg-gray-100 rounded-full border border-gray-200 mb-8">
                <span className="text-sm font-semibold text-gray-700">
                  AI WORKFORCE
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 leading-tight">
                Meet Your <span className="font-normal">5-Agent AI Team</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light mb-12 leading-relaxed">
              Each agent specializes in a critical aspect of technical hiring, working together to transform your recruitment process
            </p>
            
            <button 
              className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => scrollToSlide(0)}
            >
              Explore AI Agents
            </button>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <svg className="w-6 h-6 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Full-screen Agent slides */}
        {agents.map((agent, index) => (
          <section 
            key={agent.id}
            data-index={index}
            className="scroll-snap-slide agent-slide relative bg-white"
          >
            <ProfessionalGrid />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
                
                {/* Enhanced Content */}
                <div className="space-y-8">
                  
                  {/* Professional Header section */}
                  <div>
                    <div className="flex items-center gap-6 mb-8">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl font-bold text-white">
                          {agent.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-4xl md:text-5xl font-light mb-2 text-black">
                          {agent.name}
                        </h2>
                        <p className="text-xl font-normal text-gray-600">
                          {agent.title}
                        </p>
                      </div>
                    </div>
                    
                    {/* Clean Tagline */}
                    <div className="inline-block px-4 py-2 rounded-full border mb-8 bg-gray-100 border-gray-200">
                      <p className="text-sm font-medium text-gray-700">
                        {agent.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Clean Description */}
                  <div>
                    <p className="text-lg leading-relaxed text-gray-700">
                      {agent.description}
                    </p>
                  </div>

                  {/* Professional Features */}
                  <div className="space-y-3">
                    {[
                      {
                        'Nova': 'Cross-platform intelligence across 50+ platforms',
                        'Echo': 'Advanced voice fraud detection with NLP',
                        'Atlas': 'Pattern recognition and continuous learning',
                        'Chase': 'Automated scheduling with multi-channel outreach',
                        'Sage': 'Real-time insights with predictive analytics'
                      }[agent.name],
                      {
                        'Nova': '95% filtering accuracy with zero false positives',
                        'Echo': 'Dynamic questioning adapted to each candidate',
                        'Atlas': 'Institutional memory that compounds over time',
                        'Chase': '48-hour candidate-to-calendar completion',
                        'Sage': 'Complete decision transparency and audit trails'
                      }[agent.name]
                    ].map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-black" />
                        <span className="font-normal text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Agent Image */}
                <div className="relative">
                  
                  {/* Clean image container */}
                  <div className="relative rounded-2xl p-4 shadow-lg border hover:shadow-xl transition-all duration-300 bg-white border-gray-100">
                    
                    <div className="w-full h-72 rounded-xl overflow-hidden relative bg-gray-50">
                      
                      {/* Loading skeleton */}
                      {!imageLoaded[agent.id] && (
                        <div className="absolute inset-0 animate-pulse bg-gray-200" />
                      )}
                      
                      {/* Actual image */}
                      <img 
                        src={agent.image} 
                        alt={`${agent.name} - ${agent.title}`}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          imageLoaded[agent.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(agent.id)}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = e.target.nextElementSibling;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      
                      {/* Clean fallback */}
                      <div 
                        className="w-full h-full flex items-center justify-center absolute inset-0 bg-gray-100"
                        style={{ display: 'none' }}
                      >
                        <div className="text-center">
                          <div className={`w-24 h-24 rounded-xl bg-gradient-to-br ${agent.color} mx-auto mb-4 flex items-center justify-center`}>
                            <span className="text-3xl font-bold text-white">
                              {agent.name.charAt(0)}
                            </span>
                          </div>
                          <p className="text-xl font-semibold text-black">
                            {agent.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {agent.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Professional Stats section */}
      
      </div>
    </div>
  );
};

export default ScrollStack;