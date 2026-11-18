import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub API' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection, githubUrl }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a 
          href="#home" 
          className="navbar-brand" 
          onClick={(e) => handleNavClick(e, 'home')}
          aria-label="Back to home"
        >
          <div className="brand-icon-wrapper">
            <Code2 size={22} className="brand-icon" />
          </div>
          <span className="brand-text">
            Dev<span className="gradient-text">Portfolio</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav" aria-label="Main navigation">
          <ul className="nav-list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="nav-item">
                  <a
                    href={`#${link.id}`}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && <span className="active-pill" layoutid="activePill" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button & GitHub CTA */}
        <div className="navbar-actions desktop-nav">
          <a
            href={githubUrl || "https://github.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline nav-github-btn"
            aria-label="GitHub Profile (opens in new tab)"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
            <ExternalLink size={12} className="external-icon" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <div 
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <div 
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile navigation menu"
      >
        <div className="mobile-drawer-header">
          <div className="brand-icon-wrapper">
            <Code2 size={20} className="brand-icon" />
          </div>
          <span className="brand-text">Navigation</span>
          <button
            type="button"
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="mobile-nav-item">
                  <a
                    href={`#${link.id}`}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="mobile-active-dot" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <a
            href={githubUrl || "https://github.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mobile-github-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <GithubIcon size={18} />
            <span>Visit GitHub Profile</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}
