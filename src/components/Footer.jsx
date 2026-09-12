import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '40px 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
            Abhishek<span style={{ color: 'var(--accent-primary)' }}>.cs</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
            © {new Date().getFullYear()} Abhishek K S • B.Sc. Computer Science Student
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Crafted with React & High Performance CSS
          </span>

          <button
            onClick={scrollToTop}
            title="Back to top"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
