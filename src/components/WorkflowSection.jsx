import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';

// Enhanced Circle component with glow effects
const Circle = forwardRef(({ className = "", children, size = "size-12", glow = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-10 flex ${size} items-center justify-center rounded-full border-2 border-gray-200 bg-white p-3 shadow-lg hover:scale-105 transition-all duration-300 ${glow ? 'shadow-2xl ring-4 ring-purple-200 ring-opacity-50' : ''} ${className}`}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// Agent Circle component with image support
const AgentCircle = forwardRef(({ className = "", agent, size = "size-16", glow = false }, ref) => {
  const agentImages = {
    atlas: '/Atlas - The Memory Keeper.png',
    chase: '/Chase - The Connection Specialist.png', 
    echo: '/Echo - The Voice Detective.png',
    sage: '/Sage - The Oracle.png',
    nova: '/nova.png'
  };

  return (
    <div
      ref={ref}
      className={`z-10 flex ${size} items-center justify-center rounded-full border-2 border-gray-200 bg-white p-1 shadow-lg hover:scale-105 transition-all duration-300 ${glow ? 'shadow-2xl ring-4 ring-purple-200 ring-opacity-50' : ''} ${className}`}
    >
      <img 
        src={agentImages[agent]} 
        alt={agent}
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  );
});

AgentCircle.displayName = "AgentCircle";

// Improved AnimatedBeam component with container-relative positioning
const AnimatedBeam = ({ 
  containerRef,
  fromRef, 
  toRef, 
  color = "#3b82f6", 
  width = 2, 
  duration = 2, 
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
          <stop offset="0%" stopColor={color} stopOpacity="0">
            <animate 
              attributeName="stop-opacity" 
              values="0;1;0" 
              dur={`${duration}s`} 
              begin={`${delay}s`} 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="50%" stopColor={color} stopOpacity="1">
            <animate 
              attributeName="stop-opacity" 
              values="0;1;0" 
              dur={`${duration}s`} 
              begin={`${delay}s`} 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="100%" stopColor={color} stopOpacity="0">
            <animate 
              attributeName="stop-opacity" 
              values="0;1;0" 
              dur={`${duration}s`} 
              begin={`${delay}s`} 
              repeatCount="indefinite" 
            />
          </stop>
        </linearGradient>
        <marker
          id={`arrow-${gradientId}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={color} />
        </marker>
      </defs>
      <path
        d={path}
        stroke={`url(#${gradientId})`}
        strokeWidth={width}
        fill="none"
        markerEnd={`url(#arrow-${gradientId})`}
        opacity="0.8"
      />
    </svg>
  );
};

// Enhanced AnimatedBeam with more dynamic effects
const EnhancedAnimatedBeam = ({ 
  containerRef,
  fromRef, 
  toRef, 
  color = "#3b82f6", 
  width = 3, 
  duration = 2, 
  delay = 0,
  curvature = 0,
  pulse = true
}) => {
  const [path, setPath] = useState("");
  const gradientId = `gradient-${Math.random().toString(36).substring(7)}`;
  
  const updateBeamPath = useCallback(() => {
    if (!fromRef.current || !toRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const fromRect = fromRef.current.getBoundingClientRect();
    const toRect = toRef.current.getBoundingClientRect();
    
    const fromX = fromRect.left - containerRect.left + fromRect.width / 2;
    const fromY = fromRect.top - containerRect.top + fromRect.height / 2;
    const toX = toRect.left - containerRect.left + toRect.width / 2;
    const toY = toRect.top - containerRect.top + toRect.height / 2;
    
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const controlX = midX;
    const controlY = midY - curvature;
    
    const newPath = curvature === 0 
      ? `M ${fromX} ${fromY} L ${toX} ${toY}`
      : `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;
    
    setPath(newPath);
  }, [fromRef, toRef, containerRef, curvature]);

  useEffect(() => {
    updateBeamPath();
    window.addEventListener('resize', updateBeamPath);
    return () => window.removeEventListener('resize', updateBeamPath);
  }, [updateBeamPath]);

  if (!path) return null;

  return (
    <svg className="pointer-events-none absolute inset-0 z-0" width="100%" height="100%">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0">
            <animate 
              attributeName="stop-opacity" 
              values="0;1;0" 
              dur={`${duration}s`} 
              begin={`${delay}s`} 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="50%" stopColor={color} stopOpacity="1">
            <animate 
              attributeName="stop-opacity" 
              values="0.5;1;0.5" 
              dur={`${duration}s`} 
              begin={`${delay}s`} 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="100%" stopColor={color} stopOpacity="0">
            <animate 
              attributeName="stop-opacity" 
              values="0;1;0" 
              dur={`${duration}s`} 
              begin={`${delay}s`} 
              repeatCount="indefinite" 
            />
          </stop>
        </linearGradient>
      </defs>
      <path
        d={path}
        stroke={`url(#${gradientId})`}
        strokeWidth={width}
        fill="none"
        opacity={pulse ? "0.8" : "0.6"}
        className={pulse ? "animate-pulse" : ""}
      />
    </svg>
  );
};

// Main WorkflowSection component with new 6-step workflow
const WorkflowSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { type: 'user', text: "Compare the technical skills of our top 3 frontend candidates" },
    { type: 'bot', text: "Based on comprehensive analysis: Sarah excels in React ecosystem (5+ years, built scalable apps at Google). Marcus shows strong Vue.js expertise with exceptional problem-solving skills from his open-source contributions. Jennifer brings unique Angular + TypeScript experience with proven leadership in 3 major enterprise projects. Each candidate scored 95%+ in technical assessments." }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const containerRef = useRef(null);

  // Refs for the new 6-step workflow
  const jobPortalRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const integrationAgentRef = useRef(null); // Step 1: Chase - Integration
  const parsingAgentRef = useRef(null);     // Step 2: Atlas - Data Parsing
  const validationAgentRef = useRef(null);  // Step 3: Echo - Voice Validation  
  const filteringAgentRef = useRef(null);   // Step 4: Sage - Final Filtering
  const schedulingAgentRef = useRef(null);  // Step 5: Nova - Interview Scheduling
  const chatbotRef = useRef(null);          // Step 6: Chatbot Interface

  // Additional workflow elements
  const databaseRef = useRef(null);
  const applicationsRef = useRef(null);
  const filteredAppsRef = useRef(null);
  const interviewsRef = useRef(null);

  // Sample tough questions for the chatbot demo
  const toughQuestions = [
    "Which candidate showed the strongest problem-solving skills during technical assessments?",
    "Compare communication styles: who would work best with our distributed team?",
    "Analyze GitHub activity patterns - who demonstrates consistent code quality?",
    "Based on screening calls, who has the most growth potential?",
    "Which candidate's experience aligns best with our tech stack migration?",
    "Compare leadership qualities from their past project experiences"
  ];

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!currentQuestion.trim() || isThinking) return;
    
    const newUserMessage = { type: 'user', text: currentQuestion };
    setChatMessages(prev => [...prev, newUserMessage]);
    setCurrentQuestion('');
    setIsThinking(true);
    
    // Simulate thinking time for tough questions
    setTimeout(() => {
      setIsThinking(false);
      setIsStreaming(true);
      
      // Simulate streaming response
      const responses = [
        "Based on comprehensive analysis of 1000+ data points across GitHub, LinkedIn, screening calls, and technical assessments: Marcus demonstrates exceptional algorithmic thinking with 300+ solved LeetCode problems and consistent 4.8/5.0 code review scores. His system architecture approach shows deep understanding of scalability patterns, making him ideal for our microservices migration.",
        "Analyzing communication patterns from voice screening: Jennifer scored highest in clarity (9.2/10) and technical explanation ability. Her past experience leading distributed teams at Microsoft shows she can bridge technical and business requirements effectively. Her responses demonstrated cultural alignment with our values.",
        "Cross-referencing GitHub activity, Stack Overflow contributions, and peer feedback: David shows remarkable consistency with daily commits over 2+ years, meaningful open-source contributions to React ecosystem, and mentoring 15+ junior developers. His growth trajectory indicates strong potential for senior technical leadership.",
        "From technical assessment correlation with screening calls: Sarah's practical problem-solving approach combined with 98% test coverage in her projects and excellent communication during the screening call makes her our top candidate for the full-stack position. Her experience scaling applications at Google directly matches our current challenges."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const words = randomResponse.split(' ');
      let currentText = '';
      
      words.forEach((word, index) => {
        setTimeout(() => {
          currentText += (index === 0 ? '' : ' ') + word;
          setChatMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[newMessages.length - 1]?.type === 'bot' && newMessages[newMessages.length - 1]?.streaming) {
              newMessages[newMessages.length - 1] = { type: 'bot', text: currentText, streaming: true };
            } else {
              newMessages.push({ type: 'bot', text: currentText, streaming: true });
            }
            return newMessages;
          });
          
          if (index === words.length - 1) {
            setTimeout(() => {
              setIsStreaming(false);
              setChatMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { type: 'bot', text: currentText, streaming: false };
                return newMessages;
              });
            }, 200);
          }
        }, index * 150);
      });
    }, 1500);
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Animate through steps
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 6);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  // Icons object remains the same
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
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.39-.14.65-.5.65-.92 0-.55-.45-1-1-1-.17 0-.33.04-.48.11-.78.28-1.61.41-2.58.41-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 1.12-.23 2.18-.64 3.15-.06.14-.10.29-.10.44 0 .55.45 1 1 1 .42 0 .78-.26.92-.65C21.79 14.34 22 13.19 22 12c0-5.52-4.48-10-10-10z"/>
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
    clock: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14" stroke="white" strokeWidth="2" fill="none"/>
      </svg>
    ),
    database: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6">
        <path d="M12 4C8.133 4 5 5.591 5 7.556c0 1.964 3.133 3.555 7 3.555s7-1.591 7-3.555C19 5.591 15.867 4 12 4zM5 9.333V12c0 1.964 3.133 3.556 7 3.556s7-1.592 7-3.556V9.333c0 1.965-3.133 3.556-7 3.556s-7-1.591-7-3.556zM5 14.667V17.2c0 1.964 3.133 3.556 7 3.556s7-1.592 7-3.556v-2.533c0 1.965-3.133 3.556-7 3.556s-7-1.591-7-3.556z"/>
      </svg>
    )
  };

  return (
    <div className="w-full py-20 bg-white relative">
      {/* Professional Grid Background */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Professional Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-block mb-6 px-6 py-2 bg-gray-100 border border-gray-200 text-gray-700 text-sm font-medium rounded-full">
            AI Hiring Workflow
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-black mb-8 leading-tight">
            Complete AI Hiring Process
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light">
            Our 5-agent system transforms your entire hiring process from job portal integration to final candidate selection
          </p>
        </div>

        {/* Main Workflow Container */}
        <div 
          ref={containerRef}
          className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-12 overflow-hidden">
            
            {/* Step 1: Job Platform Integration */}
            <div className="mb-20">
              <div className="flex items-center justify-center mb-8">
                <div className="px-8 py-4 rounded-full bg-gray-100 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-black">
                    Step 1: Job Platform Integration
              </h3>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-16 mb-12">
                {/* Job Portals */}
                <div className="grid grid-cols-2 gap-8">
                  <Circle ref={jobPortalRefs[0]} className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
                    <Icons.linkedin />
                  </Circle>
                  <Circle ref={jobPortalRefs[1]} className="bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
                    <Icons.indeed />
                  </Circle>
                  <Circle ref={jobPortalRefs[2]} className="bg-gradient-to-br from-green-50 to-green-100 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
                    <Icons.glassdoor />
                  </Circle>
                  <Circle ref={jobPortalRefs[3]} className="bg-gradient-to-br from-cyan-50 to-cyan-100 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
                    <Icons.naukri />
                  </Circle>
                </div>
                
                {/* Integration Agent - Chase */}
                <AgentCircle 
                  ref={integrationAgentRef} 
                  agent="chase" 
                  size="size-20" 
                  className="bg-gradient-to-br from-purple-100 to-pink-100 shadow-2xl" 
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Chase - The Connection Specialist</h3>
                <p className="text-gray-600">Integrates with multiple job platforms using animated beam connections</p>
              </div>
              
              {/* Enhanced Animated Beams with Sequential Animation */}
              {jobPortalRefs.map((ref, index) => (
                <EnhancedAnimatedBeam
                  key={index}
                  containerRef={containerRef}
                  fromRef={ref}
                  toRef={integrationAgentRef}
                  color="#3b82f6"
                  duration={2}
                  delay={index * 0.5}
                  pulse={true}
                  width={3}
                />
              ))}

              {/* Floating Data Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: '3s'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Step 2: Data Parsing & Multi-Platform Intelligence */}
            <div className="mb-20">
              <div className="flex items-center justify-center mb-8">
                <div className="px-8 py-4 rounded-full bg-gray-100 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-black">
                    Step 2: Multi-Platform Intelligence Gathering
              </h3>
              </div>
              </div>
              
              {/* Atlas-Centered Platform Scraping Layout */}
              <div className="relative flex justify-center items-center mb-12">
                <div className="relative w-96 h-96">
                  {/* Center Atlas Agent */}
                  <div className="absolute z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <AgentCircle 
                      ref={parsingAgentRef} 
                      agent="atlas" 
                      size="size-24" 
                      className="bg-gradient-to-br from-orange-100 to-red-100 shadow-2xl" 
              />
            </div>

                  {/* Platforms in Circle - No individual beams as they intersect */}
                  {[
                    { icon: Icons.github, name: "GitHub", angle: 0 },
                    { icon: Icons.linkedin, name: "LinkedIn", angle: 45 },
                    { icon: Icons.stackoverflow, name: "Stack Overflow", angle: 90 },
                    { icon: Icons.portfolio, name: "Portfolios", angle: 135 },
                    { icon: Icons.kaggle, name: "Kaggle", angle: 180 },
                    { icon: Icons.behance, name: "Behance", angle: 225 },
                    { icon: Icons.medium, name: "Medium", angle: 270 },
                    { icon: Icons.twitter, name: "Twitter", angle: 315 }
                  ].map((platform, index) => {
                    const angle = (platform.angle) * (Math.PI / 180);
                    const radius = 150;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    
                    return (
                      <div
                        key={index}
                        className="absolute z-10"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <Circle className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg hover:shadow-xl transition-all duration-300" size="size-12">
                          <platform.icon />
                        </Circle>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Atlas - The Memory Keeper</h3>
                <p className="text-gray-600 mb-4">Scrapes GitHub, LinkedIn, Stack Overflow & 50+ platforms for comprehensive candidate validation</p>
              </div>
              
              
              {/* Connection from data scraping to calling */}
              {/* <div className="flex items-center justify-center gap-16 mb-8">
                <div className="text-center">
                  <Circle ref={filteredAppsRef} size="size-16" className="bg-gradient-to-br from-green-50 to-emerald-100 shadow-xl mb-4" glow={activeStep === 1}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#059669">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                </Circle>
                  <p className="text-sm text-gray-600">Enriched Profiles Ready</p>
                </div>
              </div> */}
              
            
            </div>

            {/* Step 3: AI Voice Screening & Validation */}
            <div className="mb-20">
              <div className="flex items-center justify-center mb-8">
                <div className="px-8 py-4 rounded-full bg-gray-100 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-black">
                    Step 3: AI Voice Screening & Validation
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-12 mb-12">
                <div className="text-center">
                
                </div>
                
                {/* Echo Agent with Call Animation */}
                <div className="text-center relative">
                  <AgentCircle 
                    ref={validationAgentRef} 
                    agent="echo" 
                    size="size-24" 
                    className="bg-gradient-to-br from-green-100 to-emerald-100 shadow-2xl relative" 
                  />
                  
                  {/* Animated Call Icons */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="animate-bounce">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  
                  {/* Call Wave Animations */}
                  <div className="absolute inset-0 -m-4">
                    <div className="absolute inset-0 border-2 border-green-400 rounded-full opacity-20 animate-ping" style={{animationDuration: '2s'}}></div>
                    <div className="absolute inset-0 border-2 border-green-400 rounded-full opacity-10 animate-ping" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Circle ref={databaseRef} size="size-16" className="bg-gradient-to-br from-purple-50 to-indigo-100 shadow-xl mb-4">
                    <Icons.database />
                  </Circle>
                  <p className="text-sm text-gray-600">Validated Database</p>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Echo - The Voice Detective</h3>
                <p className="text-gray-600 mb-4">Conducts automated screening calls to validate candidate information and assess communication skills</p>
              </div>
           

              
              {/* Removed intersecting beams */}
            </div>

            {/* Step 4: Final Filtering */}
            <div className="mb-20">
              <div className="flex items-center justify-center mb-8">
                <div className="px-8 py-4 rounded-full bg-gray-100 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-black">
                    Step 4: Final AI Filtering
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-16 mb-12">
                <AgentCircle 
                  ref={filteringAgentRef} 
                  agent="sage" 
                  size="size-20" 
                  className="bg-gradient-to-br from-purple-100 to-indigo-100 shadow-2xl" 
                  glow={activeStep === 3}
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Sage - The Oracle</h3>
                <p className="text-gray-600">Applies final filtering algorithms to select top candidates</p>
              </div>
              
              {/* Removed intersecting beams */}
            </div>

            {/* Step 5: Interview Scheduling */}
            <div className="mb-20">
              <div className="flex items-center justify-center mb-8">
                <div className="px-8 py-4 rounded-full bg-gray-100 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-black">
                    Step 5: Smart Interview Scheduling
              </h3>
                </div>
              </div>
              
              {/* Enhanced Scheduling Flow */}
              <div className="flex items-center justify-center gap-16 mb-12">
                {/* Nova Agent with Animation */}
                <div className="text-center relative">
                  <AgentCircle 
                    ref={schedulingAgentRef} 
                    agent="nova" 
                    size="size-24" 
                    className="bg-gradient-to-br from-pink-100 to-rose-100 shadow-2xl" 
                  />
                  
                  {/* Animated Scheduling Indicators */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.89-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                  </div>
                  
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  
                  {/* Coordination Lines Animation */}
                  <div className="absolute inset-0 -m-6">
                    <div className="absolute inset-0 border-2 border-pink-300 rounded-full opacity-30 animate-ping" style={{animationDuration: '2s'}}></div>
                    <div className="absolute inset-0 border-2 border-blue-300 rounded-full opacity-20 animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
                  </div>
                </div>

                {/* Final Scheduled Interviews */}
                <div className="text-center">
                  <Circle ref={interviewsRef} size="size-16" className="bg-gradient-to-br from-amber-50 to-yellow-100 shadow-xl mb-4">
                    <Icons.calendar />
                  </Circle>
                  <p className="text-sm text-gray-600">25 Interviews<br/>Scheduled</p>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-black mb-2">Nova - The Smart Scheduler</h3>
                <p className="text-gray-600 mb-4">Coordinates interviews with intelligent time management and automated communication</p>
              </div>

              {/* Enhanced Features Description */}
              <div className="text-center mb-8">
                <div className="bg-gray-50 rounded-xl p-6 max-w-4xl mx-auto border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <strong>Intelligent Coordination:</strong> Nova analyzes interviewer calendars, candidate availability, and time zones to optimize scheduling. Automatically sends personalized meeting links, calendar invites, and reminder sequences while handling rescheduling requests seamlessly.
                  </p>
                </div>
              </div>

              {/* Smart Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Time Zone Intelligence</h4>
                  <p className="text-sm text-gray-600">Automatically converts and optimizes meeting times across global time zones</p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      <line x1="9" y1="9" x2="15" y2="9"/>
                      <line x1="9" y1="13" x2="15" y2="13"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Smart Communication</h4>
                  <p className="text-sm text-gray-600">Sends personalized interview details and handles rescheduling automatically</p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Calendar Integration</h4>
                  <p className="text-sm text-gray-600">Syncs with Google, Outlook, and other calendar platforms seamlessly</p>
                </div>
              </div>
              
              {/* Removed intersecting beams */}
            </div>

            {/* Step 6: Interactive AI Candidate Assistant */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <div className="px-8 py-4 rounded-full bg-gray-100 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-black">
                    Step 6: Intelligent Candidate Assistant
              </h3>
                </div>
              </div>
              
              <div className="flex items-center justify-center mb-12">
                <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full border border-gray-200" ref={chatbotRef}>
                  {/* Perplexity-style Chat Header */}
                  <div className="flex items-center px-6 py-4 border-b border-gray-100">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                      <img src="/Sage - The Oracle.png" alt="Sage" className="w-6 h-6 rounded-md object-cover" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-black">Sage</h4>
                      <p className="text-sm text-gray-500">AI Candidate Assistant</p>
                    </div>
                  </div>

                  {/* Perplexity-style Chat Messages */}
                  <div className="max-h-96 overflow-y-auto p-6">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className="mb-6">
                        {msg.type === 'user' ? (
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                              <img src="/hr.jpg" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 leading-relaxed">{msg.text}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                              <img src="/Sage - The Oracle.png" alt="Sage" className="w-6 h-6 rounded-md object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 leading-relaxed">{msg.text}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Clean Thinking State */}
                    {isThinking && (
                      <div className="flex items-start space-x-3 mb-6">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                          <img src="/Sage - The Oracle.png" alt="Sage" className="w-6 h-6 rounded-md object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                            </div>
                            <span className="text-sm text-gray-500">Analyzing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Perplexity-style Chat Input */}
                  <div className="border-t border-gray-100 p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {toughQuestions.slice(0, 3).map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentQuestion(question);
                            handleChatSubmit(question);
                          }}
                          className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-200 transition-all duration-200"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                    
                    <form onSubmit={handleChatSubmit} className="relative">
                      <input
                        type="text"
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        placeholder="Ask anything about candidates..."
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-800 placeholder-gray-400"
                        disabled={isThinking || isStreaming}
                      />
                      <button
                        type="submit"
                        disabled={isThinking || isStreaming || !currentQuestion.trim()}
                        className="absolute right-2 top-2 p-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-black mb-2">Sage - AI Candidate Assistant</h3>
                <p className="text-gray-600 mb-4">Ask questions about candidates using comprehensive AI analysis</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-50 rounded-xl p-6 max-w-4xl mx-auto border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <strong>Comprehensive Analysis:</strong> Sage analyzes 1000+ data points per candidate including GitHub commits, LinkedIn activity, screening call transcripts, technical assessments, behavioral analysis, and cross-platform validation.
                  </p>
                </div>
              </div>
              
              {/* Removed intersecting beams */}
            </div>
          </div>
        </div>

        {/* Professional Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {[
            { value: "5", label: "AI Agents" },
            { value: "1000+", label: "Applications Processed" },
            { value: "25", label: "Final Candidates" },
            { value: "72hrs", label: "Complete Process" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl font-light text-black mb-3">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowSection;