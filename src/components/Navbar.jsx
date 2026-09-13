import React, { useState, useEffect } from 'react';
import { Terminal, Sun, Moon, Palette, Menu, X, Download, Send } from 'lucide-react';

export default function Navbar({
  theme,
  toggleTheme,
  accent,
  setAccent,
  openTerminal,
  openResume
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accentDropdownOpen, setAccentDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const accents = [
    { name: 'cyan', label: 'Cyan Neon', color: '#00f2fe' },
    { name: 'violet', label: 'Cyber Violet', color: '#a855f7' },
    { name: 'emerald', label: 'Matrix Emerald', color: '#10b981' },
    { name: 'amber', label: 'Radiant Amber', color: '#f59e0b' }
  ];

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'ML Sandbox', href: '#ml-sandbox' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'var(--bg-card)'
          : 'transparent',
        backdropFilter: scrolled ? 'var(--glass-backdrop)' : 'none',
        WebkitBackdropFilter: scrolled ? 'var(--glass-backdrop)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
        padding: scrolled ? '14px 0' : '20px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a
          href="#home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: 800,
            fontSize: '1.25rem',
            letterSpacing: '-0.5px'
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              color: '#050b14',
              fontWeight: 800,
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px var(--accent-glow)'
            }}
          >
            &lt;/&gt;
          </span>
          <span>
            Abhishek<span style={{ color: 'var(--accent-primary)' }}>.cs</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginLeft: 'auto', marginRight: 'auto' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.92rem',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--accent-primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="right-controls" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* CLI Terminal Trigger Button */}
          <button
            onClick={openTerminal}
            className="cli-trigger-btn"
            title="Launch Interactive Terminal (CLI)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--accent-light)',
              border: '1px solid var(--accent-glow)',
              color: 'var(--accent-primary)',
              padding: '7px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s ease'
            }}
          >
            <Terminal size={15} />
            <span>&gt;_ CLI</span>
          </button>

          {/* Accent Color Picker */}
          <div className="accent-picker-wrap"style={{ position: 'relative' }}>
            <button
              onClick={() => setAccentDropdownOpen(!accentDropdownOpen)}
              title="Customize Accent Color"
              style={{
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
              <Palette size={18} style={{ color: 'var(--accent-primary)' }} />
            </button>

            {accentDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '45px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  boxShadow: 'var(--shadow-main)',
                  zIndex: 200,
                  width: '160px'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 8px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Accent Color
                </div>
                {accents.map((acc) => (
                  <button
                    key={acc.name}
                    onClick={() => {
                      setAccent(acc.name);
                      setAccentDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: accent === acc.name ? 'var(--accent-light)' : 'transparent',
                      border: 'none',
                      color: 'var(--text-primary)',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      textAlign: 'left'
                    }}
                  >
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: acc.color,
                        boxShadow: `0 0 6px ${acc.color}`
                      }}
                    />
                    {acc.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            style={{
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
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Resume & Get in Touch Desktop Buttons */}
          <button
            onClick={openResume}
            className="btn-secondary desktop-resume-btn"
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <Download size={15} />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            className="btn-primary desktop-getintouch-btn"
            style={{ padding: '8px 18px', fontSize: '0.88rem' }}
          >
            <Send size={14} />
            <span>Get in Touch</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
  <div
    style={{
      position: 'absolute',
      top: '60px',
      left: '12px',
      width: '300px',
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      padding: '24px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      zIndex: 200
    }}
  >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                padding: '5px 0'
              }}
            >
              {link.name}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openResume();
              }}
              className="btn-secondary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Resume
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
