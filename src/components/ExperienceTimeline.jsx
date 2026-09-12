import React from 'react';
import { experienceData, educationData } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function ExperienceTimeline() {
  return (
    <section id="experience" style={{ padding: '90px 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Briefcase size={15} />
            <span>Experience & Education</span>
          </div>
          <h2 className="section-title">
            My Journey <span className="gradient-text">So Far</span>
          </h2>
          <p className="section-subtitle">
            Academic foundation in Computer Science combined with hands-on virtual internships and continuous self-driven projects.
          </p>
        </div>

        {/* Timeline Container */}
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            position: 'relative'
          }}
        >
          {/* Vertical Line */}
          <div
            style={{
              position: 'absolute',
              left: '28px',
              top: '10px',
              bottom: '10px',
              width: '3px',
              background: 'var(--accent-gradient)',
              borderRadius: '2px'
            }}
          />

          {/* Experience Timeline Cards */}
          {experienceData.map((exp, idx) => (
            <div
              key={`exp-${idx}`}
              style={{
                display: 'flex',
                gap: '24px',
                marginBottom: '40px',
                position: 'relative'
              }}
            >
              {/* Timeline Node Dot */}
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  background: 'var(--bg-elevated)',
                  border: '2px solid var(--accent-primary)',
                  boxShadow: '0 0 16px var(--accent-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                  flexShrink: 0,
                  zIndex: 2
                }}
              >
                <Briefcase size={22} />
              </div>

              {/* Content Glass Card */}
              <div className="glass-card" style={{ flex: 1, padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <span
                    style={{
                      background: 'var(--accent-light)',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--accent-glow)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '3px 12px',
                      borderRadius: '15px'
                    }}
                  >
                    {exp.type}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {exp.role}
                </h3>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '12px' }}>
                  {exp.company} • <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{exp.location}</span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  {exp.description}
                </p>

                {/* Bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Skill Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {exp.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        background: 'var(--bg-elevated)',
                        color: 'var(--accent-primary)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Education Timeline Cards */}
          {educationData.map((edu, idx) => (
            <div
              key={`edu-${idx}`}
              style={{
                display: 'flex',
                gap: '24px',
                position: 'relative'
              }}
            >
              {/* Timeline Node Dot */}
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  background: 'var(--bg-elevated)',
                  border: '2px solid var(--accent-primary)',
                  boxShadow: '0 0 16px var(--accent-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                  flexShrink: 0,
                  zIndex: 2
                }}
              >
                <GraduationCap size={24} />
              </div>

              {/* Content Glass Card */}
              <div className="glass-card" style={{ flex: 1, padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <span
                    style={{
                      background: 'var(--accent-light)',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--accent-glow)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '3px 12px',
                      borderRadius: '15px'
                    }}
                  >
                    Academic Degree
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <Calendar size={14} />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {edu.degree}
                </h3>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '4px' }}>
                  {edu.institution}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '16px' }}>
                  {edu.affiliation} • {edu.location}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {edu.highlights.map((h, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
