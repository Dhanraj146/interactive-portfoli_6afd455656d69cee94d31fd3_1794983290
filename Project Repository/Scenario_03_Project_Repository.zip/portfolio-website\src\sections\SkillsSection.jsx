import React from 'react';
import { 
  Layers, 
  Layout, 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  Check 
} from 'lucide-react';
import './SkillsSection.css';

const CATEGORY_ICONS = {
  frontend: Layout,
  programmingLanguages: Code2,
  backendFundamentals: Server,
  databases: Database,
  developerTools: Wrench
};

export function SkillsSection({ skills }) {
  const categoryKeys = Object.keys(skills);

  return (
    <section id="skills" className="section skills-section" aria-label="Skills & Competencies">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-kicker">
            <Layers size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-description">
            Carefully curated technical competencies structured across modern frontend architecture, core programming languages, databases, and development tooling.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {categoryKeys.map((key) => {
            const cat = skills[key];
            const Icon = CATEGORY_ICONS[key] || Layers;

            return (
              <div key={key} className="card skill-category-card">
                
                {/* Category Header */}
                <div className="category-header">
                  <div className="category-icon-wrapper">
                    <Icon size={22} className="category-icon" />
                  </div>
                  <div>
                    <h3 className="category-title">{cat.category}</h3>
                    <p className="category-subtitle">{cat.description}</p>
                  </div>
                </div>

                {/* Skills Tags List */}
                <div className="skills-tags-container">
                  {cat.items.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-pill">
                      <span className="skill-name">{skill.name}</span>
                      {skill.badge && (
                        <span className="skill-badge-tag">{skill.badge}</span>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Competency Standard Notice */}
        <div className="skills-footer-notice">
          <Check size={16} className="notice-icon" />
          <span>
            Skills reflect practical project application, academic coursework, and hands-on coding practice. Proficiency ratings are intentionally unrated to avoid fabricated metrics.
          </span>
        </div>

      </div>
    </section>
  );
}
