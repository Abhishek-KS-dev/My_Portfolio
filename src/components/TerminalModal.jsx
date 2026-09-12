import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Play, Sparkles } from 'lucide-react';
import { personalInfo, skillsData, projectsData } from '../data/portfolioData';

export default function TerminalModal({ isOpen, onClose, setAccent }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: '🚀 Welcome to Abhishek K S Interactive Developer CLI v2.4'
    },
    {
      type: 'system',
      text: 'Type "help" to view all available commands or click quick action buttons below.'
    }
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const quickCommands = [
    'help',
    'bio',
    'skills',
    'projects',
    'ml',
    'contact',
    'theme cyan',
    'theme violet',
    'sudo hire',
    'clear'
  ];

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', text: `$ ${trimmed}` }];
    const lower = trimmed.toLowerCase();

    if (lower === 'help') {
      newHistory.push({
        type: 'output',
        text: `Available CLI Commands:
  • bio       : Displays personal bio and background overview
  • skills    : Lists programming languages and data science stack
  • projects  : Lists top featured projects
  • ml        : Highlights interactive machine learning models
  • contact   : Displays email, LinkedIn, and GitHub links
  • theme <c> : Change accent theme (cyan, violet, emerald, amber)
  • sudo hire : Displays special recruiter message & contract readiness
  • clear     : Clears terminal history screen`
      });
    } else if (lower === 'bio') {
      newHistory.push({
        type: 'output',
        text: `NAME: ${personalInfo.name}
DEGREE: ${personalInfo.educationBadge}
LOCATION: ${personalInfo.location}
SUMMARY: ${personalInfo.bio}`
      });
    } else if (lower === 'skills') {
      const formattedSkills = skillsData
        .map((cat) => `[${cat.category}]\n  ` + cat.items.map((i) => `${i.name} (${i.level}%)`).join(', '))
        .join('\n\n');
      newHistory.push({ type: 'output', text: formattedSkills });
    } else if (lower === 'projects') {
      const formattedProj = projectsData
        .map((p) => `• ${p.title} [${p.category}]\n  Tech: ${p.tech.join(', ')}\n  URL: ${p.github}`)
        .join('\n\n');
      newHistory.push({ type: 'output', text: formattedProj });
    } else if (lower === 'ml') {
      newHistory.push({
        type: 'output',
        text: `Interactive ML Models Available in Sandbox:
1. Fake News NLP Text Classifier (BERT + Gradio API) - Accuracy 94.2%
2. Medical Insurance Charges Regression Model (Scikit-Learn) - R² 0.78`
      });
    } else if (lower === 'contact') {
      newHistory.push({
        type: 'output',
        text: `CONTACT INFORMATION:
  Email:    ${personalInfo.email}
  GitHub:   ${personalInfo.github}
  LinkedIn: ${personalInfo.linkedin}`
      });
    } else if (lower.startsWith('theme')) {
      const parts = lower.split(' ');
      const themeColor = parts[1];
      if (['cyan', 'violet', 'emerald', 'amber'].includes(themeColor)) {
        setAccent(themeColor);
        newHistory.push({ type: 'output', text: `✨ Accent theme updated to "${themeColor}"!` });
      } else {
        newHistory.push({ type: 'error', text: `Invalid accent color. Options: cyan, violet, emerald, amber` });
      }
    } else if (lower === 'sudo hire') {
      newHistory.push({
        type: 'output',
        text: `🎉 ACCESS GRANTED!
Abhishek K S is actively open for Software Engineering, AI/ML, & Data Science Internships / Roles!
Feel free to send an email at: ${personalInfo.email}`
      });
    } else if (lower === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not found: "${trimmed}". Type "help" for a list of valid commands.`
      });
    }

    setHistory(newHistory);
    setInput('');
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
        style={{
          width: '100%',
          maxWidth: '780px',
          height: '520px',
          background: '#0a0d16',
          border: '1px solid var(--accent-glow)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)'
        }}
      >
        {/* Terminal Header Bar */}
        <div
          style={{
            background: '#121827',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308', display: 'inline-block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '10px', fontWeight: 600 }}>
              abhishek@portfolio:~ (bash)
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '0.9rem',
            lineHeight: 1.6
          }}
        >
          {history.map((item, idx) => (
            <div key={idx}>
              {item.type === 'input' && (
                <div style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{item.text}</div>
              )}
              {item.type === 'system' && (
                <div style={{ color: '#94a3b8' }}>{item.text}</div>
              )}
              {item.type === 'output' && (
                <pre style={{ color: '#e2e8f0', whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{item.text}</pre>
              )}
              {item.type === 'error' && (
                <div style={{ color: '#f87171' }}>{item.text}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Command Pills */}
        <div
          style={{
            padding: '10px 16px',
            background: '#0e1322',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto'
          }}
        >
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              style={{
                background: '#1a2236',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--accent-primary)',
                fontSize: '0.78rem',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Form Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 18px',
            background: '#080b13',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <span style={{ color: 'var(--accent-primary)', marginRight: '10px', fontWeight: 700 }}>$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command here (e.g. help, bio, projects)..."
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#f8fafc',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-primary)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <CornerDownLeft size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
