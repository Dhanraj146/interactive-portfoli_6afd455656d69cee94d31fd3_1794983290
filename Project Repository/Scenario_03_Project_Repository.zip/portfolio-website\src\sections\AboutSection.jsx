import React from 'react';
import { 
  GraduationCap, 
  Target, 
  Compass, 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Building2 
} from 'lucide-react';
import './AboutSection.css';

export function AboutSection({ personal, education, interests, goals }) {
  return (
    <section id="about" className="section about-section" aria-label="About Me">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-kicker">
            <Compass size={14} />
            <span>Background & Journey</span>
          </div>
          <h2 className="section-title">
            About <span className="gradient-text">My Path</span>
          </h2>
          <p className="section-description">
            A committed junior software engineer focused on building robust, accessible frontend architectures and real-time API-driven web applications.
          </p>
        </div>

        {/* Grid Layout: Biography & Education + Goals */}
        <div className="about-grid">
          
          {/* Left Column: Biography & Interests */}
          <div className="about-left-col">
            
            {/* Bio Card */}
            <div className="card bio-card">
              <h3 className="card-heading">
                <Code2 size={20} className="card-heading-icon" />
                <span>Professional Overview</span>
              </h3>
              
              <div className="bio-paragraphs">
                {personal.bio.map((paragraph, idx) => (
                  <p key={idx} className="bio-text">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Development Interests */}
              <div className="interests-wrapper">
                <h4 className="subheading">Technical Focus Areas</h4>
                <div className="interests-grid">
                  {interests.map((interest, idx) => (
                    <div key={idx} className="interest-item">
                      <div className="interest-bullet">
                        <CheckCircle2 size={16} className="bullet-icon" />
                      </div>
                      <div>
                        <strong className="interest-title">{interest.title}:</strong>{' '}
                        <span className="interest-desc">{interest.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Professional Goals Card */}
            <div className="card goals-card">
              <h3 className="card-heading">
                <Target size={20} className="card-heading-icon target-icon" />
                <span>Engineering Goals</span>
              </h3>
              <ul className="goals-list">
                {goals.map((goal, idx) => (
                  <li key={idx} className="goal-item">
                    <span className="goal-num font-mono">0{idx + 1}</span>
                    <span className="goal-text">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Education Timeline */}
          <div className="about-right-col">
            <div className="card education-card">
              <h3 className="card-heading">
                <GraduationCap size={22} className="card-heading-icon grad-icon" />
                <span>Academic Foundation</span>
              </h3>
              <p className="education-note">
                Authentic educational milestones with clear, configurable placeholders.
              </p>

              <div className="timeline">
                {education.map((edu, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="marker-dot" />
                      {idx !== education.length - 1 && <div className="marker-line" />}
                    </div>

                    <div className="timeline-content">
                      <div className="timeline-badge-row">
                        <span className="badge badge-cyan">{edu.status}</span>
                        <span className="timeline-period">
                          <Calendar size={12} />
                          <span>{edu.period}</span>
                        </span>
                      </div>

                      <h4 className="timeline-degree">{edu.degree}</h4>
                      
                      <div className="timeline-institution">
                        <Building2 size={14} />
                        <span>{edu.institution}</span>
                      </div>

                      <p className="timeline-details">{edu.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-callout">
                <Sparkles size={16} className="callout-icon" />
                <p>
                  Committed to continual learning through self-driven projects, online engineering curricula, and hands-on open source development.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
