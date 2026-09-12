import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { FolderCode, ExternalLink, Search, Eye, Sparkles, CheckCircle2, X } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Machine Learning & AI', 'Web Applications'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" style={{ padding: '90px 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <FolderCode size={15} />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="section-title">
            Things I Have <span className="gradient-text">Built</span>
          </h2>
          <p className="section-subtitle">
            A collection of machine learning algorithms, NLP classifiers, and data-driven web applications created through academic & personal projects.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '36px'
          }}
        >
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? 'var(--accent-gradient)' : 'var(--bg-card)',
                  color: activeCategory === cat ? '#050b14' : 'var(--text-primary)',
                  border: '1px solid ' + (activeCategory === cat ? 'transparent' : 'var(--border-color)'),
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  padding: '8px 18px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeCategory === cat ? '0 4px 15px var(--accent-glow)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              placeholder="Search tech or project title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '30px',
                padding: '9px 16px 9px 40px',
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* Category & Featured Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span
                    style={{
                      background: 'var(--accent-light)',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--accent-glow)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '15px'
                    }}
                  >
                    {project.category}
                  </span>

                  <span
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Sparkles size={13} style={{ color: 'var(--accent-primary)' }} />
                    <span>Featured Project</span>
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px' }}>
                  {project.title}
                </h3>

                <p style={{ color: 'var(--accent-primary)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '14px' }}>
                  {project.tagline}
                </p>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {project.description}
                </p>

                {/* Metrics Pill Grid */}
                {project.metrics && (
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {Object.entries(project.metrics).map(([key, val]) => (
                      <span
                        key={key}
                        style={{
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.78rem',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        <strong style={{ color: 'var(--text-primary)' }}>{key}:</strong> {val}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tech Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'var(--bg-elevated)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-color)'
                }}
              >
                <button
                  onClick={() => setSelectedProject(project)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-primary)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Eye size={16} />
                  <span>View Full Details</span>
                </button>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View GitHub Code Repository"
                    style={{
                      color: 'var(--text-secondary)',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <GithubIcon size={20} />
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Launch Live Project Demo"
                      style={{
                        color: 'var(--text-secondary)',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div
              className="glass-card"
              style={{
                maxWidth: '680px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '36px',
                position: 'relative'
              }}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '20px',
                  background: 'var(--bg-elevated)',
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

              <span
                style={{
                  background: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '15px'
                }}
              >
                {selectedProject.category}
              </span>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '10px', marginBottom: '4px' }}>
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '16px' }}>
                {selectedProject.tagline}
              </p>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
                {selectedProject.description}
              </p>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>
                Key Technical Highlights & Implementation:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {selectedProject.highlights.map((h, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <GithubIcon size={18} />
                  <span>View Source Code on GitHub</span>
                </a>

                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <ExternalLink size={18} />
                    <span>Live Interactive Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
