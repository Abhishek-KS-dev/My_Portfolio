import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Send, MapPin, Copy, Check, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

const [isSending, setIsSending] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.message) {
    setToastMessage('⚠️ Please fill out all required fields.');
    setTimeout(() => setToastMessage(''), 3000);
    return;
  }

  setIsSending(true);

  emailjs.send(
    'service_vva9ubr',
    'template_ula08sd',
    {
      name: formData.name,
      email: formData.email,
      title: formData.subject || 'No subject',
      message: formData.message,
    },
    'eaDU_swOv1083hISG'
  )
    .then(() => {
      setToastMessage('✅ Thank you! Your message has been sent.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch(() => {
      setToastMessage('❌ Something went wrong. Please try again.');
    })
    .finally(() => {
      setIsSending(false);
      setTimeout(() => setToastMessage(''), 4500);
    });
};

  return (
    <section id="contact" style={{ padding: '90px 0 120px 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Mail size={15} />
            <span>Contact & Connect</span>
          </div>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Great Together</span>
          </h2>
          <p className="section-subtitle">
            Whether you have a project idea, internship opportunity, or technical question, feel free to drop me a message!
          </p>
        </div>

        {/* Toast Notification Alert */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--accent-primary)',
              boxShadow: '0 10px 30px var(--accent-glow)',
              padding: '14px 24px',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.92rem',
              zIndex: 500
            }}
          >
            {toastMessage}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {/* Left Column: Quick Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Direct Email Card */}
            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Direct Email
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>
                    {personalInfo.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail} className="copy-email-btn"
                title="Copy email to clipboard"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  color: copied ? '#10b981' : 'var(--text-primary)',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Social Cards */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
                Professional Profiles
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    transition: 'border-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                >
                  <GithubIcon size={20} style={{ color: 'var(--accent-primary)' }} />
                  <span>GitHub (@Abhishek-KS-dev)</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    transition: 'border-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                >
                  <LinkedinIcon size={20} style={{ color: 'var(--accent-primary)' }} />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--accent-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)'
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Location
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>
                  {personalInfo.location}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
              Send a Direct Message
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Internship / Collaboration Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your message or inquiry here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '6px' }}>
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
