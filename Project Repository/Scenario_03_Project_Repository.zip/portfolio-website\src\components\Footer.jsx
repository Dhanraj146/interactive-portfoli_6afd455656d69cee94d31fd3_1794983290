import React from 'react';
import { Code2, Mail, ArrowUp, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import './Footer.css';

export function Footer({ personal }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-container" aria-label="Site Footer">
      <div className="container">
        
        {/* Main Footer Row */}
        <div className="footer-main-row">
          
          {/* Brand & Developer Info */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="brand-icon-wrapper">
                <Code2 size={20} className="brand-icon" />
              </div>
              <span className="brand-text">
                {personal.name}'s <span className="gradient-text">Portfolio</span>
              </span>
            </div>
            
            <p className="footer-bio">
              Junior Software Engineer dedicated to frontend excellence, semantic web design, and seamless public API integration.
            </p>

            <div className="footer-tech-stack font-mono">
              <span>React</span> &bull; <span>Vite</span> &bull; <span>GitHub API</span> &bull; <span>CSS3</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
              </li>
              <li>
                <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a>
              </li>
              <li>
                <a href="#github" onClick={(e) => scrollToSection(e, 'github')}>GitHub API</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="footer-social-col">
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-social-links">
              <a 
                href={personal.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
                <span>GitHub</span>
              </a>

              <a 
                href={personal.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>

              <a 
                href={`mailto:${personal.email}`}
                className="footer-social-btn"
                aria-label="Direct Email"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="scroll-top-btn"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Evaluation Notice */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {currentYear} {personal.name}. Designed &amp; engineered for academic capstone presentation.
          </p>
          <p className="footer-eval-note">
            Built with React &bull; All external data dynamically retrieved via GitHub REST API.
          </p>
        </div>

      </div>
    </footer>
  );
}
