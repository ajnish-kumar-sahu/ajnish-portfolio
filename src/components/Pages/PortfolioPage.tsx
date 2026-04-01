import React from "react";
import { motion } from "framer-motion";
import { Header } from "../Layout/Header";
import { Footer } from "../Layout/Footer";
import { Hero } from "../Sections/Hero";
import { About } from "../Sections/About";
import { Journey } from "../Sections/Journey";
import { Skills } from "../Sections/Skills";
import { Projects } from "../Sections/Projects";
import { Services } from "../Sections/Services";
import { Marketplace } from "../Sections/Marketplace";
import { Testimonials } from "../Sections/Testimonials";
import { Contact } from "../Sections/Contact";
import { ChatbotWidget } from "../Chatbot/ChatbotWidget";
import { ScrollProgress } from "../UI/ScrollProgress";
import { FloatingHireMe } from "../UI/FloatingHireMe";

export const PortfolioPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Services />
        <Marketplace />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Hire Me Button */}
      <FloatingHireMe />

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </motion.div>
  );
};
