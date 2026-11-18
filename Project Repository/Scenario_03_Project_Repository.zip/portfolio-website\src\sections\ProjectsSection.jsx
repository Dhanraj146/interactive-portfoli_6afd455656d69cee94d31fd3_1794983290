import React from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Star, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import './ProjectsSection.css';

export function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="section projects-section bg-grid" aria-label="Projects">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-kicker">
            <FolderGit2 size={14} />
            <span>Featured Portfolio Works</span>
          </div>
          <h2 className="section-title">
            Crafted <span className="gradient-text">Applications</span>
          </h2>
          <p className="section-description">
            Representative software applications demonstrating modular component design, state management, API consumption, and clean user interfaces.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="card project-card">
              
              {/* Card Header & Badges */}
              <div className="project-card-header">
                <div className="project-badge-row">
                  {project.tag && (
                    <span className="badge badge-cyan">{project.tag}</span>
                  )}
                  {project.featured && (
                    <span className="badge badge-emerald">
                      <Sparkles size={11} />
                      <span>Flagship</span>
                    </span>
                  )}
                </div>

                {/* External Action Links */}
                <div className="project-links">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-link"
                      aria-label={`Source code for ${project.title}`}
                      title="View Source Code"
                    >
                      <GithubIcon size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-link"
                      aria-label={`Live demo for ${project.title}`}
                      title="View Live Application"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              {/* Technologies List */}
              <div className="project-tech-stack">
                {project.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer CTA & Placeholder Indicator */}
              <div className="project-footer">
                {project.id === 'portfolio-app' ? (
                  <span className="project-status-note">
                    <Sparkles size={13} className="sparkle-icon" />
                    <span>Active Website (Self)</span>
                  </span>
                ) : (
                  <span className="project-status-note placeholder-note">
                    <Info size={13} />
                    <span>Realistic Demonstration Placeholder</span>
                  </span>
                )}

                <div className="project-buttons">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link-action"
                    >
                      <span>Code</span>
                      <GithubIcon size={13} />
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link-action btn-link-demo"
                    >
                      <span>Demo</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
