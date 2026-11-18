import React from 'react';
import { portfolioConfig } from './config/portfolioConfig';
import { useGithub } from './hooks/useGithub';
import { useScrollSpy } from './hooks/useScrollSpy';

import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { GithubSection } from './sections/GithubSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'github', 'contact'];

export default function App() {
  const activeSection = useScrollSpy(SECTION_IDS, 100);
  const githubState = useGithub(portfolioConfig.personal.githubUsername);

  return (
    <div className="portfolio-app-root">
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Main Responsive Navigation */}
      <Navbar 
        activeSection={activeSection} 
        githubUrl={portfolioConfig.personal.githubUrl} 
      />

      {/* Main Semantic Landmark */}
      <main id="main-content" tabIndex="-1">
        <HeroSection personal={portfolioConfig.personal} />
        
        <AboutSection 
          personal={portfolioConfig.personal} 
          education={portfolioConfig.education}
          interests={portfolioConfig.interests}
          goals={portfolioConfig.goals}
        />

        <SkillsSection skills={portfolioConfig.skills} />

        <ProjectsSection projects={portfolioConfig.projects} />

        <GithubSection 
          githubState={githubState} 
          defaultUsername={portfolioConfig.personal.githubUsername} 
        />

        <ContactSection 
          personal={portfolioConfig.personal} 
          contact={portfolioConfig.contact} 
        />
      </main>

      {/* Site Footer */}
      <Footer personal={portfolioConfig.personal} />
    </div>
  );
}
