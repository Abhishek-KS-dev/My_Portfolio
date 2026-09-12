import React from 'react';
import { X, Download } from 'lucide-react';
import { personalInfo, aboutData, projectsData, experienceData, educationData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Abhishek_K_S_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '36px',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Action Controls Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button onClick={handleDownload} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            <Download size={16} />
            <span>Download Resume (PDF)</span>
          </button>
        </div>

        {/* Formatted Official Resume Sheet */}
        <div
          id="printable-resume"
          style={{
            background: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '40px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            lineHeight: 1.6
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid var(--accent-primary)', paddingBottom: '20px', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{personalInfo.name}</h1>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {personalInfo.address}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '6px', fontSize: '0.92rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
              <span>Phone: {personalInfo.phone}</span>
              <span>•</span>
              <span>Email: {personalInfo.email}</span>
            </div>
          </div>

          {/* Objective */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              Objective
            </h3>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)' }}>
              {personalInfo.objective}
            </p>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {educationData.map((edu, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.98rem' }}>{edu.institution}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {edu.degree} {edu.highlights[0] ? `• ${edu.highlights[0]}` : ''}
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--accent-primary)' }}>
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              Projects
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projectsData.map((p) => (
                <div key={p.id}>
                  <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                    • {p.title}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px', paddingLeft: '14px' }}>
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              Skills
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Technical Skills: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Python, C, Java, JavaScript, SQL, HTML, CSS, PostgreSQL, Machine Learning, Data Analysis, Generative AI, Git, GitHub, Google Colab
                </span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Soft Skills: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {aboutData.softSkills.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Internship */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              Internships
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {experienceData.map((exp, idx) => (
                <div key={idx}>
                  <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                    • {exp.company} — <span style={{ color: 'var(--accent-primary)' }}>{exp.role}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px', paddingLeft: '14px' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
