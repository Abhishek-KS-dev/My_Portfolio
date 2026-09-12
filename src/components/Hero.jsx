import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowRight, Sparkles, Terminal, FileText, Mail, Cpu, FolderCode, Briefcase, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Hero({ openTerminal, openResume }) {
  const isMobile = useIsMobile();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = personalInfo.roles[roleIndex];
    const updateSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
        }
      }
    }, updateSpeed);
    console.log('isMobile:', isMobile);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const getStatIcon = (iconName) => {
    switch (iconName) {
      case 'FolderCode': return <FolderCode size={22} style={{ color: 'var(--accent-primary)' }} />;
      case 'Briefcase': return <Briefcase size={22} style={{ color: 'var(--accent-primary)' }} />;
      case 'Cpu': return <Cpu size={22} style={{ color: 'var(--accent-primary)' }} />;
      case 'GraduationCap': return <GraduationCap size={22} style={{ color: 'var(--accent-primary)' }} />;
      default: return <Sparkles size={22} style={{ color: 'var(--accent-primary)' }} />;
    }
  };

  return (
    <section
      id="home"
      style={{
        paddingTop: '160px',
        paddingBottom: '90px',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container">
        {/* Status Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 20px',
            borderRadius: '40px',
            background: 'var(--accent-light)',
            border: '1px solid var(--accent-glow)',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '28px'
          }}
        >
          <span className="pulsing-dot" />
          <span>{personalInfo.statusBadge}</span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '18px'
          }}
        >
          Building Intelligent Systems & <br />
          <span className="gradient-text">Data-Driven Applications</span>
        </h1>

        {/* Typewriter Subtitle */}
        <div
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            minHeight: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>I am a</span>
          <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
            {displayText}
          </span>
          <span
            style={{
              display: 'inline-block',
              width: '3px',
              height: '1.4em',
              backgroundColor: 'var(--accent-primary)',
              animation: 'pulseGlow 1s infinite'
            }}
          />
        </div>

        {/* Bio Paragraph */}
        <p
          style={{
            maxWidth: '720px',
            fontSize: '1.08rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '36px'
          }}
        >
          {personalInfo.bio}
        </p>

        {/* CTA Buttons Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '50px'
          }}
        >
          <a href="#projects" className="btn-primary">
            <span>Explore Projects</span>
            <ArrowRight size={17} />
          </a>

          <a href="#ml-sandbox" className="btn-secondary">
            <Sparkles size={17} style={{ color: 'var(--accent-primary)' }} />
            <span>Live ML Sandbox</span>
          </a>

          <button onClick={openTerminal} className="btn-secondary">
            <Terminal size={17} style={{ color: 'var(--accent-primary)' }} />
            <span>Launch CLI</span>
          </button>

          <button onClick={openResume} className="btn-secondary">
            <FileText size={17} />
            <span>View Resume</span>
          </button>
        </div>

        {/* Social Links Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '60px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Connect:</span>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.color = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <GithubIcon size={20} />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.color = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <LinkedinIcon size={20} />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            title="Send Email"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.color = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Statistics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px'
          }}
        >
          {personalInfo.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'var(--accent-light)',
                  border: '1px solid var(--accent-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {getStatIcon(stat.icon)}
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
