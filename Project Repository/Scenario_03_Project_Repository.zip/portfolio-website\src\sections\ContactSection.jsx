import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import './ContactSection.css';

export function ContactSection({ personal, contact }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Subject line is required (at least 3 characters).';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message with at least 10 characters.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusMessage({
        type: 'error',
        text: 'Please correct the highlighted fields before sending.'
      });
      return;
    }

    // Build authentic mailto link with encoded parameters
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Hello ${personal.name},\n\nFrom: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}\n\n---\nSent via Portfolio Contact Form`
    );
    const mailtoUrl = `mailto:${personal.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    // Clear errors and inform user honestly
    setErrors({});
    setStatusMessage({
      type: 'info',
      text: 'Opening your default mail client with prefilled details. You can also send directly to the address on the left.'
    });

    // Launch mailto
    window.location.href = mailtoUrl;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="contact" className="section contact-section" aria-label="Contact">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-kicker">
            <MessageSquare size={14} />
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-description">
            Whether you have an engineering opportunity, a question about my projects, or want to collaborate, feel free to reach out.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="contact-info-col">
            <div className="card contact-details-card">
              <h3 className="contact-card-title">Contact Channels</h3>
              <p className="contact-card-sub">
                Open to junior software developer, frontend engineer, or technical internship roles.
              </p>

              {/* Email direct copy box */}
              <div className="email-copy-box">
                <div className="email-box-content">
                  <Mail size={18} className="email-box-icon" />
                  <div>
                    <span className="email-box-label">Direct Email</span>
                    <a href={`mailto:${personal.email}`} className="email-box-val font-mono">
                      {personal.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="copy-btn"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Location item */}
              <div className="contact-meta-row">
                <div className="meta-row-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="meta-row-label">Location</span>
                  <span className="meta-row-value">{personal.location}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="social-channels-group">
                <h4 className="social-channels-heading">Profiles &amp; Repositories</h4>
                
                <div className="social-links-vertical">
                  <a
                    href={personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-channel-link"
                  >
                    <div className="social-icon-wrapper">
                      <GithubIcon size={18} />
                    </div>
                    <div className="social-link-info">
                      <span className="social-title">GitHub Profile</span>
                      <span className="social-sub font-mono">github.com/{personal.githubUsername}</span>
                    </div>
                    <ExternalLink size={14} className="social-ext-icon" />
                  </a>

                  <a
                    href={personal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-channel-link"
                  >
                    <div className="social-icon-wrapper">
                      <LinkedinIcon size={18} />
                    </div>
                    <div className="social-link-info">
                      <span className="social-title">LinkedIn Network</span>
                      <span className="social-sub">Professional Profile &bull; Placeholder</span>
                    </div>
                    <ExternalLink size={14} className="social-ext-icon" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Form UI */}
          <div className="contact-form-col">
            <div className="card contact-form-card">
              <h3 className="contact-card-title">Send a Direct Message</h3>
              
              {/* Honest Notice */}
              <div className="form-honest-notice">
                <AlertCircle size={15} className="notice-icon" />
                <span>
                  {contact.notice}
                </span>
              </div>

              {statusMessage && (
                <div 
                  className={`status-alert ${statusMessage.type === 'error' ? 'status-alert-error' : 'status-alert-info'}`}
                  role="alert"
                >
                  {statusMessage.type === 'error' ? (
                    <AlertCircle size={16} />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="interactive-form">
                
                {/* Name & Email in 2 columns on tablet/desktop */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Your Name <span className="req-star">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      required
                    />
                    {errors.name && (
                      <span id="error-name" className="field-error-text" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Your Email <span className="req-star">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      required
                    />
                    {errors.email && (
                      <span id="error-email" className="field-error-text" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject <span className="req-star">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Junior Frontend Role / Technical Collaboration"
                    className={`form-input ${errors.subject ? 'input-error' : ''}`}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'error-subject' : undefined}
                    required
                  />
                  {errors.subject && (
                    <span id="error-subject" className="field-error-text" role="alert">
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message Body */}
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="req-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    required
                  />
                  {errors.message && (
                    <span id="error-message" className="field-error-text" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary submit-btn">
                  <Send size={16} />
                  <span>Send Message via Mailto</span>
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
