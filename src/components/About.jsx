import React from 'react';
import { aboutData, personalInfo } from '../data/portfolioData';
import { User, Code2, BrainCircuit, Database, GraduationCap, CheckCircle2, MapPin, Award } from 'lucide-react';

export default function About() {
  const getFocusIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 size={24} style={{ color: 'var(--accent-primary)' }} />;
      case 'BrainCircuit': return <BrainCircuit size={24} style={{ color: 'var(--accent-primary)' }} />;
      case 'Database': return <Database size={24} style={{ color: 'var(--accent-primary)' }} />;
      default: return <User size={24} style={{ color: 'var(--accent-primary)' }} />;
    }
  };

  return (
    <section id="about" style={{ padding: '90px 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <User size={15} />
            <span>About Me</span>
          </div>
          <h2 className="section-title">
            Bridging <span className="gradient-text">Data Analytics</span> & Software Engineering
          </h2>
          <p className="section-subtitle">
            A dedicated B.Sc. Computer Science student passionate about transforming raw data into actionable ML models and building modern web applications.
          </p>
        </div>

        {/* Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '30px',
            marginBottom: '50px'
          }}
        >
          {/* Left Column: Personal Background */}
          <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
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
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Abhishek K S</h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              {aboutData.summaryParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    marginBottom: '16px'
                  }}
                >
                  {paragraph}
                </p>
              ))}

              {/* Education Badge Card */}
              <div
                style={{
                  background: 'var(--bg-elevated)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  border: '1px solid var(--border-color)',
                  marginTop: '24px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.95rem' }}>
                  <Award size={18} />
                  <span>Education & Affiliation</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '6px' }}>
                  B.Sc. Computer Science
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '2px' }}>
                  College of Applied Science, Chelakara • Affiliated with University of Calicut
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Focus Areas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {aboutData.focusAreas.map((area, index) => (
              <div
                key={index}
                className="glass-card"
                style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--accent-light)',
                    border: '1px solid var(--accent-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getFocusIcon(area.icon)}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
                    {area.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '12px' }}>
                    {area.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {area.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--accent-primary)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills & Academic Coursework Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {/* Coursework */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GraduationCap style={{ color: 'var(--accent-primary)' }} />
              <span>Key Academic Coursework</span>
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '12px'
              }}
            >
              {aboutData.academicCoursework.map((course, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  <CheckCircle2 size={15} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award style={{ color: 'var(--accent-primary)' }} />
              <span>Core Soft Skills</span>
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '12px'
              }}
            >
              {aboutData.softSkills.map((skill, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--accent-primary)',
                      boxShadow: '0 0 8px var(--accent-glow)'
                    }}
                  />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
