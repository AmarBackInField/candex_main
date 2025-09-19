import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';

// Circle component
const Circle = forwardRef(({ className = "", children, size = "size-12" }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-10 flex ${size} items-center justify-center rounded-full border-2 border-gray-200 bg-white p-4 shadow-lg hover:scale-105 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// Improved AnimatedBeam component with moving effect
const AnimatedBeam = ({ 
  containerRef,
  fromRef, 
  toRef, 
  color = "#3b82f6", 
  width = 3, 
  duration = 3, 
  delay = 0,
  curvature = 0 
}) => {
  const [path, setPath] = useState("");
  const gradientId = `gradient-${Math.random().toString(36).substring(7)}`;
  
  // Function to update the beam path
  const updateBeamPath = useCallback(() => {
    if (!fromRef.current || !toRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const fromRect = fromRef.current.getBoundingClientRect();
    const toRect = toRef.current.getBoundingClientRect();
    
    // Calculate positions relative to the container
    const fromX = fromRect.left - containerRect.left + fromRect.width / 2;
    const fromY = fromRect.top - containerRect.top + fromRect.height / 2;
    const toX = toRect.left - containerRect.left + toRect.width / 2;
    const toY = toRect.top - containerRect.top + toRect.height / 2;
    
    // Calculate control points for curved path
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    
    // Apply curvature
    const controlX = midX;
    const controlY = midY - curvature;
    
    const newPath = curvature === 0 
      ? `M ${fromX} ${fromY} L ${toX} ${toY}`
      : `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;
    
    setPath(newPath);
  }, [fromRef, toRef, containerRef, curvature]);

  useEffect(() => {
    // Initial calculation
    updateBeamPath();
    
    // Update on window resize
    window.addEventListener('resize', updateBeamPath);
    
    return () => {
      window.removeEventListener('resize', updateBeamPath);
    };
  }, [updateBeamPath]);

  if (!path) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <marker
          id={`arrow-${gradientId}`}
          markerWidth="12"
          markerHeight="12"
          refX="11"
          refY="6"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M2,2 L2,10 L10,6 z" fill={color} />
        </marker>
      </defs>
      <path
        d={path}
        stroke={`url(#${gradientId})`}
        strokeWidth={width}
        fill="none"
        strokeDasharray="20 10"
        strokeDashoffset="0"
        markerEnd={`url(#arrow-${gradientId})`}
        opacity="0.9"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;-30;0"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

// Main WorkflowSection component
const WorkflowSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Refs for all workflow elements
  const jobPortalRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const novaRef = useRef(null);
  const resourceRefs = Array(12).fill(null).map(() => useRef(null));
  const echoRef = useRef(null);
  const atlasRef = useRef(null);
  const chaseRef = useRef(null);
  const sageRef = useRef(null);
  const finalCandidatesRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Icons object - LEAVE EMPTY FOR USER TO FILL
  const Icons = {
    linkedin: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0077B5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    indeed: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#003A9B">
        <path d="M11.566 21.563v-8.762c0-.772-.099-1.434-.397-1.986-.298-.551-.694-.862-1.29-.862-.596 0-1.09.311-1.489.862-.397.551-.596 1.214-.596 1.986v8.762c0 .331-.232.563-.563.563s-.563-.232-.563-.563v-8.762c0-1.214.298-2.295.927-3.177.629-.881 1.456-1.322 2.482-1.322s1.853.441 2.482 1.322c.629.882.927 1.963.927 3.177v8.762c0 .331-.232.563-.563.563s-.562-.232-.562-.563z"/>
        <circle cx="12" cy="4" r="2"/>
      </svg>
    ),
    glassdoor: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0CAA41">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.39-.14.65-.5.65-.92 0-.55-.45-1-1-1-.17 0-.33.04-.48.11-.78.28-1.61.41-2.58.41-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 1.12-.23 2.18-.64 3.15-.06.14-.10.29-.10.44 0 .55.45 1 1 1.42 0 .78-.26.92-.65C21.79 14.34 22 13.19 22 12c0-5.52-4.48-10-10-10z"/>
      </svg>
    ),
    naukri: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#4A90E2">
        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
        <path d="M10 14l-2-2-1.41 1.41L10 16.83l6-6L14.59 9.17 10 14z" fill="white"/>
      </svg>
    ),
    github: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#333">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    portfolio: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF6B6B">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    kaggle: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#20BEFF">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.236.118-.353.354-.353h2.431c.234 0 .351.117.351.353v11.812l6.273-6.272c.141-.141.305-.211.492-.211h3.139c.164 0 .259.047.281.141.023.094-.016.164-.117.211l-5.906 5.859 6.32 8.133c.094.117.117.187.117.281z"/>
      </svg>
    ),
    behance: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#1769FF">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.179.577.12 1.074.297 1.488.532.414.235.738.547.97.936.230.389.346.868.346 1.433 0 .62-.14 1.139-.42 1.557-.279.418-.688.756-1.226.1014-.54.26-1.186.45-1.933.57-.748.12-1.616.18-2.604.18H2.5v-5.33h4.438zm11.25.139c.45 0 .84.08 1.17.24.33.16.6.36.81.61s.36.54.45.87c.09.33.135.66.135.99 0 .3-.015.57-.045.81-.03.24-.105.45-.225.63-.12.18-.3.315-.54.405-.24.09-.57.135-.99.135-.51 0-.93-.135-1.26-.405-.33-.27-.525-.675-.585-1.215h-4.95c0 .3.03.57.09.81.06.24.18.45.36.63.18.18.42.315.72.405.3.09.66.135 1.08.135.66 0 1.2-.15 1.62-.45.42-.3.63-.75.63-1.35h2.85c0 .78-.18 1.425-.54 1.935-.36.51-.81.9-1.35 1.17s-1.14.405-1.8.405c-.81 0-1.515-.18-2.115-.54-.6-.36-1.065-.87-1.395-1.53-.33-.66-.495-1.425-.495-2.295 0-.78.165-1.47.495-2.07.33-.6.78-1.065 1.35-1.395.57-.33 1.215-.495 1.935-.495zm-11.97 6.87c.84 0 1.425-.18 1.755-.54.33-.36.495-.87.495-1.53 0-.66-.165-1.17-.495-1.53-.33-.36-.915-.54-1.755-.54H2.5v4.14h3.718z"/>
      </svg>
    ),
    ai: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6">
        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
      </svg>
    ),
    phone: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10B981">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
    stackoverflow: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#F48024">
        <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092L6.785 12.743zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.155z"/>
      </svg>
    ),
    dribbble: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#EA4C89">
        <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.73 2.252 3.862 2.464 6.159-2.58-.55-4.78-.55-6.717-.55-.364 0-.728.024-1.088.072-.239-.578-.5-1.161-.785-1.744 2.943-1.201 4.864-2.882 6.126-3.937z"/>
      </svg>
    ),
    medium: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ),
    devto: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A0A0A">
        <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.84-.02c.42 0 .63-.05.84-.23.18-.14.35-.36.35-.82V10.87c0-.47-.17-.69-.35-.82z"/>
      </svg>
    ),
    codepen: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
        <path d="M12 2.5L22.5 9v6L12 21.5 1.5 15V9L12 2.5z" fill="none" stroke="#000" strokeWidth="1.5"/>
      </svg>
    ),
    hackerrank: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#2EC866">
        <path d="M12 0c1.285 0 2.4.099 2.4 2.571V6l5.6 5.6-5.6 5.657v3.172C14.4 23.9 13.285 24 12 24s-2.4-.1-2.4-2.571V17.257L4 11.6 9.6 6V2.57C9.6.1 10.715 0 12 0z"/>
      </svg>
    ),
    twitter: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DA1F2">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    leetcode: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFA116">
        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039z"/>
      </svg>
    ),
    calendar: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#6366F1">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </svg>
    ),
    database: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6">
        <path d="M12 4C8.133 4 5 5.591 5 7.556c0 1.964 3.133 3.555 7 3.555s7-1.591 7-3.555C19 5.591 15.867 4 12 4zM5 9.333V12c0 1.964 3.133 3.556 7 3.556s7-1.592 7-3.556V9.333c0 1.965-3.133 3.556-7 3.556s-7-1.591-7-3.556zM5 14.667V17.2c0 1.964 3.133 3.556 7 3.556s7-1.592 7-3.556v-2.533c0 1.965-3.133 3.556-7 3.556s-7-1.591-7-3.556z"/>
      </svg>
    ),
    // Add these new agent-specific icons:
nova: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#8B5CF6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  echo: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#10B981">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    </svg>
  ),
  atlas: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#F59E0B">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  chase: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#3B82F6">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  ),
  sage: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#8B5CF6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
  };

  return (
    <div className="w-full py-20 bg-gradient-to-b from-gray-50 to-white relative">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
            Complete <span className="font-normal">AI Hiring Workflow</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            From job portal connections to scheduled interviews - watch our 5-agent system transform your entire hiring process
          </p>
        </div>

        {/* Main Workflow */}
        <div 
          ref={containerRef}
          className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12 overflow-hidden min-h-[800px]">
            
            {/* Step 1: Job Portals to Nova */}
            <div className="mb-20">
              <h3 className="text-xl font-medium text-center mb-12 text-gray-800">
                1. Job Portals → Nova (Talent Hunter)
              </h3>
              <div className="flex items-center justify-center gap-16 mb-10">
                {/* Job Portals */}
                <div className="flex flex-col gap-8">
                  <Circle ref={jobPortalRefs[0]} size="size-16" className="bg-blue-50">
                    {Icons.linkedin && <Icons.linkedin />}
                  </Circle>
                  <Circle ref={jobPortalRefs[1]} size="size-16" className="bg-indigo-50">
                    {Icons.indeed && <Icons.indeed />}
                  </Circle>
                  <Circle ref={jobPortalRefs[2]} size="size-16" className="bg-green-50">
                    {Icons.glassdoor && <Icons.glassdoor />}
                  </Circle>
                  <Circle ref={jobPortalRefs[3]} size="size-16" className="bg-blue-50">
                    {Icons.naukri && <Icons.naukri />}
                  </Circle>
                </div>
                
                {/* Nova Agent */}
                <Circle ref={novaRef} size="size-24" className="bg-purple-50 border-purple-200">
                  {Icons.nova && <Icons.nova />}
                </Circle>
              </div>
              
              <div className="flex justify-center gap-16 text-center">
                <div className="max-w-24">
                  <p className="text-sm font-medium text-gray-800 mb-1">Job Portals</p>
                  <p className="text-xs text-gray-500">LinkedIn, Indeed, Glassdoor, Naukri</p>
                </div>
                <div className="max-w-32">
                  <p className="text-sm font-medium text-gray-800 mb-1">Nova - Talent Hunter</p>
                  <p className="text-xs text-gray-500">Mass Profile Analysis & Filtering</p>
                </div>
              </div>
              
              {/* Animated Beams from Job Portals to Nova */}
              {jobPortalRefs.map((ref, index) => (
                <AnimatedBeam
                  key={index}
                  containerRef={containerRef}
                  fromRef={ref}
                  toRef={novaRef}
                  color="#8B5CF6"
                  duration={2.5}
                  delay={index * 0.3}
                  width={4}
                />
              ))}
            </div>

            {/* Step 2: Multi-Platform Intelligence Gathering */}
            <div className="mb-20">
              <h3 className="text-xl font-medium text-center mb-12 text-gray-800">
                2. Multi-Platform Intelligence Gathering
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-6 justify-items-center mb-10">
                {resourceRefs.slice(0, 12).map((ref, index) => (
                  <Circle key={index} ref={ref} size="size-14" className="bg-gray-50">
                    {/* Icons will be filled by user */}
                  </Circle>
                ))}
              </div>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-6 text-center text-xs text-gray-600 mb-8">
                <div>GitHub</div>
                <div>LinkedIn</div>
                <div>Portfolio</div>
                <div>Kaggle</div>
                <div>Behance</div>
                <div>Stack Overflow</div>
                <div>Dribbble</div>
                <div>Medium</div>
                <div>Dev.to</div>
                <div>CodePen</div>
                <div>HackerRank</div>
                <div>Twitter</div>
              </div>
              
              {/* Animated Beams from Nova to Resources */}
              {resourceRefs.slice(0, 12).map((ref, index) => (
                <AnimatedBeam
                  key={index}
                  containerRef={containerRef}
                  fromRef={novaRef}
                  toRef={ref}
                  color="#10B981"
                  duration={2}
                  delay={index * 0.1 + 1}
                  width={3}
                  curvature={30}
                />
              ))}
            </div>

            {/* Step 3: Echo Voice Validation */}
            <div className="mb-20">
              <h3 className="text-xl font-medium text-center mb-12 text-gray-800">
                3. Echo (Voice Detective) - Conversational Validation
              </h3>
              <div className="flex items-center justify-center gap-16 mb-10">
                <Circle ref={echoRef} size="size-24" className="bg-green-50 border-green-200">
                  {Icons.echo && <Icons.echo />}
                </Circle>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800 mb-1">Echo - Voice Detective</p>
                <p className="text-xs text-gray-500">AI Voice Interviews & Fraud Detection</p>
              </div>
              
              {/* Animated Beam from Nova to Echo */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={novaRef}
                toRef={echoRef}
                color="#10B981"
                duration={2.5}
                delay={2}
                width={4}
                curvature={50}
              />
            </div>

            {/* Step 4: Atlas Knowledge Integration */}
            <div className="mb-20">
              <h3 className="text-xl font-medium text-center mb-12 text-gray-800">
                4. Atlas (Memory Keeper) - Intelligence Integration
              </h3>
              <div className="flex items-center justify-center gap-16 mb-10">
                <Circle ref={atlasRef} size="size-24" className="bg-orange-50 border-orange-200">
                  {Icons.atlas && <Icons.atlas />}
                </Circle>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800 mb-1">Atlas - Memory Keeper</p>
                <p className="text-xs text-gray-500">Data Integration & Candidate Ranking</p>
              </div>
              
              {/* Animated Beam from Echo to Atlas */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={echoRef}
                toRef={atlasRef}
                color="#F59E0B"
                duration={2.5}
                delay={2.5}
                width={4}
                curvature={40}
              />
            </div>

            {/* Step 5: Chase Connection Specialist */}
            <div className="mb-20">
              <h3 className="text-xl font-medium text-center mb-12 text-gray-800">
                5. Chase (Connection Specialist) - Candidate Outreach
              </h3>
              <div className="flex items-center justify-center gap-16 mb-10">
                <Circle ref={chaseRef} size="size-24" className="bg-blue-50 border-blue-200">
                  {Icons.chase && <Icons.chase />}
                </Circle>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800 mb-1">Chase - Connection Specialist</p>
                <p className="text-xs text-gray-500">Automated Outreach & Scheduling</p>
              </div>
              
              {/* Animated Beam from Atlas to Chase */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={atlasRef}
                toRef={chaseRef}
                color="#3B82F6"
                duration={2.5}
                delay={3}
                width={4}
                curvature={30}
              />
            </div>

            {/* Step 6: Sage Oracle & Final Candidates */}
            <div className="mb-16">
              <h3 className="text-xl font-medium text-center mb-12 text-gray-800">
                6. Sage (Oracle) + Final Interview Scheduling
              </h3>
              <div className="flex items-center justify-center gap-16 mb-10">
                <Circle ref={sageRef} size="size-24" className="bg-purple-50 border-purple-200">
                  {Icons.sage && <Icons.sage />}
                </Circle>
                <Circle ref={finalCandidatesRef} size="size-20" className="bg-yellow-50 border-yellow-200">
                  {Icons.calendar && <Icons.calendar />}
                </Circle>
              </div>
              <div className="flex justify-center gap-16 text-center">
                <div className="max-w-32">
                  <p className="text-sm font-medium text-gray-800 mb-1">Sage - Oracle</p>
                  <p className="text-xs text-gray-500">Real-time Consultation & Insights</p>
                </div>
                <div className="max-w-32">
                  <p className="text-sm font-medium text-gray-800 mb-1">Interview Ready</p>
                  <p className="text-xs text-gray-500">Top 25 Scheduled Candidates</p>
                </div>
              </div>
              
              {/* Animated Beam from Chase to Sage */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={chaseRef}
                toRef={sageRef}
                color="#8B5CF6"
                duration={2.5}
                delay={3.5}
                width={4}
                curvature={25}
              />
              
              {/* Animated Beam from Sage to Final Candidates */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={sageRef}
                toRef={finalCandidatesRef}
                color="#EAB308"
                duration={2.5}
                delay={4}
                width={4}
                curvature={20}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-8 mt-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {[
            { value: "1000+", label: "Applications Processed", color: "text-blue-600" },
            { value: "5 Agents", label: "Working in Concert", color: "text-purple-600" },
            { value: "95%", label: "Fraud Detection Rate", color: "text-green-600" },
            { value: "25", label: "Final Interview Candidates", color: "text-orange-600" },
            { value: "72hrs", label: "Complete Process", color: "text-cyan-600" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className={`text-3xl font-light mb-2 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowSection;