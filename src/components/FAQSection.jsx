import React, { useState, useEffect, useRef } from 'react';

const FAQSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default
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

  const faqs = [
    {
      question: "How does CandexAI's voice AI detect resume fraud?",
      answer: "Our Echo agent conducts dynamic conversational interviews, asking specific questions about claimed projects and experience. For example, if a candidate claims React expertise, Echo asks 'Why did you choose Redux over Context API in your project?' Most fraudulent candidates cannot explain their own supposed work, revealing inconsistencies that traditional screening misses."
    },
    {
      question: "What makes the 5-agent system different from other hiring tools?",
      answer: "Unlike single-function tools, our agents work in orchestrated concert: Nova hunts and filters talent across platforms, Echo validates through voice conversations, Atlas integrates all intelligence, Chase handles outreach, and Sage provides real-time consultation. This creates the first complete AI hiring ecosystem, not just another resume parser."
    },
    {
      question: "How accurate is the cross-platform fraud detection?",
      answer: "We achieve 95% accuracy by analyzing GitHub commit patterns, LinkedIn employment history, portfolio authenticity, and technical discussions across 12+ platforms. Our system catches AI-generated portfolios, inflated skills, and ghost-written projects by cross-referencing data points that traditional methods cannot detect."
    },
    {
      question: "Can CandexAI handle different technical roles and skill levels?",
      answer: "Absolutely. Our AI adapts to 50+ technical roles across engineering, product, data, sales, and marketing. For AI/ML roles, we analyze Kaggle contributions; for designers, we examine Behance portfolios; for developers, we assess GitHub repositories. The system intelligently adjusts validation criteria based on role requirements."
    },
    {
      question: "What's the typical ROI and implementation timeline?",
      answer: "Companies see 75% cost reduction (from $40K+ to under $10K per hire) and 87% faster processing (15 days to 72 hours). Implementation takes 2-3 weeks including integration with existing ATS systems, team training, and workflow customization. Most clients break even within the first 5 hires."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div 
      ref={sectionRef}
      className="w-full py-20 bg-gradient-to-b from-white to-gray-50 relative"
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

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
            Frequently Asked <span className="font-normal">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Everything you need to know about our revolutionary AI hiring platform
          </p>
        </div>

        {/* FAQ Items */}
        <div className={`space-y-4 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 rounded-xl"
              >
                <h3 className="text-lg font-medium text-gray-800 pr-8 leading-relaxed">
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="text-gray-400"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-6">
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-600 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`mt-16 text-center transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-medium text-gray-800 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team is here to help you understand how CandexAI can transform your hiring process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-200 hover:shadow-lg">
                Schedule a Demo
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 px-8 py-3 rounded-full text-base font-medium transition-all duration-200">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;