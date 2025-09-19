import React, { useState, useEffect, useRef } from 'react';

const JobRolesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  // Job roles categorized by department
  const jobRoles = {
    engineering: [
      "Full Stack Developer", "Frontend Developer", "Backend Developer", "DevOps Engineer", 
      "Cloud Engineer (AWS/Azure/GCP)", "Data Scientist", "Machine Learning Engineer", 
      "AI/ML Researcher", "Software Architect", "Site Reliability Engineer", "QA/Test Engineer",
      "Cybersecurity Analyst", "Mobile App Developer", "Game Developer", "Blockchain Developer"
    ],
    product: [
      "Product Manager", "Technical Product Manager", "Product Owner", "Product Analyst",
      "UX Designer", "UI Designer", "UX Researcher", "Design Researcher", "Product Designer",
      "Associate Product Manager", "Senior Product Manager", "Principal Product Manager"
    ],
    data: [
      "Data Analyst", "Business Intelligence Analyst", "Data Engineer", "Analytics Engineer",
      "Quantitative Analyst", "Research Scientist", "Statistician", "Business Analyst",
      "Data Visualization Specialist", "Database Administrator"
    ],
    sales: [
      "Sales Development Representative", "Account Executive", "Enterprise Sales Executive",
      "Account Manager", "Sales Manager", "Inside Sales Representative", 
      "Business Development Representative (BDR)", "Customer Success Manager",
      "Sales Operations Manager", "Revenue Operations Manager"
    ],
    marketing: [
      "Digital Marketing Manager", "Growth Marketing Manager", "Content Marketing Manager",
      "Performance Marketing Specialist", "Email Marketing Manager", "SEO Specialist",
      "Paid Ads Specialist (Google/Facebook)", "Social Media Manager", "Marketing Analyst",
      "Lifecycle Marketing Manager", "Brand Manager", "Marketing Operations Manager"
    ]
  };

  // Flatten all roles for scrolling
  const allRoles = Object.values(jobRoles).flat();

  const ScrollingRow = ({ roles, direction = 1, speed = 50 }) => {
    return (
      <div className="flex whitespace-nowrap overflow-hidden">
        <div 
          className={`flex gap-8 items-center animate-scroll-${direction > 0 ? 'left' : 'right'}`}
          style={{
            animationDuration: `${speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          {[...roles, ...roles].map((role, index) => (
            <div 
              key={index}
              className="flex-shrink-0 px-6 py-3 bg-white rounded-full border-[0.5px] border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <span className="text-gray-700 font-medium text-sm md:text-base group-hover:text-blue-600 transition-colors duration-300">
                {role}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={sectionRef}
      className="w-full py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
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
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
            Works for <span className="font-normal">all jobs</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            Our AI agents adapt to any technical role across industries - from engineering to product, data to sales
          </p>
        </div>

        {/* Scrolling Job Roles */}
        <div className={`space-y-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Row 1 - Engineering & Technical */}
          <ScrollingRow 
            roles={jobRoles.engineering} 
            direction={1} 
            speed={60}
          />
          
          {/* Row 2 - Product & Design */}
          <ScrollingRow 
            roles={jobRoles.product} 
            direction={-1} 
            speed={45}
          />
          
          {/* Row 3 - Data & Analytics */}
          <ScrollingRow 
            roles={jobRoles.data} 
            direction={1} 
            speed={55}
          />
          
          {/* Row 4 - Sales & Business */}
          <ScrollingRow 
            roles={jobRoles.sales} 
            direction={-1} 
            speed={50}
          />
          
          {/* Row 5 - Marketing & Growth */}
          <ScrollingRow 
            roles={jobRoles.marketing} 
            direction={1} 
            speed={65}
          />
        </div>

        {/* Gradient Overlays for fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-20"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-20"></div>

        {/* Bottom Stats */}
        <div className={`mt-20 text-center transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group">
              <div className="text-3xl font-light text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-sm text-gray-600">Technical Roles</div>
            </div>
            <div className="group">
              <div className="text-3xl font-light text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">5</div>
              <div className="text-sm text-gray-600">Major Departments</div>
            </div>
            <div className="group">
              <div className="text-3xl font-light text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-sm text-gray-600">Role Adaptation</div>
            </div>
            <div className="group">
              <div className="text-3xl font-light text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">AI-Powered</div>
              <div className="text-sm text-gray-600">Smart Matching</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for scrolling animations */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }
        
        /* Pause animation on hover */
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default JobRolesSection;