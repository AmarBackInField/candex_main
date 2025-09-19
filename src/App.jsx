import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import WorkflowSection from './components/WorkflowSection';
import BenefitsSection from './components/BenefitsSection';
import JobRolesSection from './components/JobRolesSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';
import ScrollStack from './components/ScrollStack';
import JoinWaitlistPage from './components/JoinWaitlistPage';
import BookDemoPage from './components/BookDemoPage';

// Home page component
const HomePage = () => (
  <div className="w-full">
    <HeroSection />
    <WorkflowSection />
    <BenefitsSection />
    <JobRolesSection />
   
    <ScrollStack />
    <FAQSection />
    <FooterSection />
  </div>
);

function App() {
  return (
    <Router>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join-waitlist" element={<JoinWaitlistPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
