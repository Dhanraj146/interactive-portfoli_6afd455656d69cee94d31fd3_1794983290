import React from 'react';
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  Terminal, 
  Code, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import './HeroSection.css';

export function HeroSection({ personal }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="section hero-section bg-grid" aria-label="Introduction">
      <div className="container hero-container">
        
        {/* Left Column: Content */}
        <div className="hero-content">
          
          {/* Status Badge */}
          <div className="hero-status-badge">
            <span className="pulse-indicator" />
            <span className="status-text">{personal.statusBadge}</span>
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{personal.name}</span>
          </h1>

          <p className="hero-headline">
            {personal.title}
          </p>

          <p className="hero-tagline">
            {personal.tagline}
          </p>

          {/* Location & Metadata */}
          <div className="hero-metadata">
            <div className="meta-item">
              <MapPin size={16} className="meta-icon" />
              <span>{personal.location}</span>
            </div>
            <div className="meta-item">
              <Code size={16} className="meta-icon" />
              <span>React &bull; JavaScript &bull; GitHub REST API</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="hero-cta-group">
            <button 
              type="button" 
              onClick={() => scrollTo('projects')} 
              className="btn btn-primary"
            >
              <span>View Projects</span>
              <ArrowRight size={16} />
            </button>

            <button 
              type="button" 
              onClick={() => scrollTo('contact')} 
              className="btn btn-secondary"
            >
              <Mail size={16} />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="hero-social-links">
            <span className="social-label">Find me on:</span>
            
            <a 
              href={personal.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn"
              aria-label={`GitHub profile for ${personal.githubUsername}`}
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
              <ExternalLink size={12} className="meta-ext" />
            </a>

            <a 
              href={personal.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn"
              aria-label="LinkedIn profile (editable placeholder)"
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
              <ExternalLink size={12} className="meta-ext" />
            </a>
          </div>

        </div>

        {/* Right Column: Visual Avatar / Developer Terminal Card */}
        <div className="hero-visual">
          <div className="terminal-card">
            
            {/* Terminal Window Header */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="terminal-title">
                <Terminal size={14} />
                <span>developer-profile.json</span>
              </div>
              <div className="terminal-badge">LIVE</div>
            </div>

            {/* Terminal Code Body */}
            <div className="terminal-body">
              <div className="avatar-graphic-container">
                <div className="avatar-ring">
                  <div className="avatar-inner">
                    <span className="avatar-monogram">{personal.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="code-snippet font-mono">
                <p className="code-line">
                  <span className="token-keyword">const</span> <span className="token-var">developer</span> = &#123;
                </p>
                <p className="code-line indent">
                  <span className="token-key">name</span>: <span className="token-string">"{personal.name}"</span>,
                </p>
                <p className="code-line indent">
                  <span className="token-key">role</span>: <span className="token-string">"Junior Software Engineer"</span>,
                </p>
                <p className="code-line indent">
                  <span className="token-key">stack</span>: [<span className="token-string">"React"</span>, <span className="token-string">"Vite"</span>, <span className="token-string">"ES6+"</span>],
                </p>
                <p className="code-line indent">
                  <span className="token-key">github</span>: <span className="token-string">"@{personal.githubUsername}"</span>,
                </p>
                <p className="code-line indent">
                  <span className="token-key">status</span>: <span className="token-success">"Ready to Build"</span>
                </p>
                <p className="code-line">&#125;;</p>
              </div>

              <div className="terminal-footer">
                <Sparkles size={14} className="sparkle-icon" />
                <span>Dynamic GitHub REST API Loaded Below</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
