import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillMatrix from './components/SkillMatrix';
import MLSandbox from './components/MLSandbox';
import ProjectsShowcase from './components/ProjectsShowcase';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import TerminalModal from './components/TerminalModal';
import ResumeModal from './components/ResumeModal';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [accent, setAccent] = useState('cyan');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const getAccentHex = () => {
    switch (accent) {
      case 'violet': return '#a855f7';
      case 'emerald': return '#10b981';
      case 'amber': return '#f59e0b';
      default: return '#00f2fe';
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Dynamic Constellation Particle Canvas Background */}
      <ParticleBackground accentColor={getAccentHex()} />

      {/* Main Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        accent={accent}
        setAccent={setAccent}
        openTerminal={() => setTerminalOpen(true)}
        openResume={() => setResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          openTerminal={() => setTerminalOpen(true)}
          openResume={() => setResumeOpen(true)}
        />
        <About />
        <SkillMatrix />
        <MLSandbox />
        <ProjectsShowcase />
        <ExperienceTimeline />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        setAccent={setAccent}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
