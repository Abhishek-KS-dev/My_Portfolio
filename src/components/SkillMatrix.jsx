import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { Cpu, FileCode, FileCode2, Terminal, Coffee, Table, BarChart3, PieChart, Database, Server, Layers, Workflow, Layout, Component, GitBranch, Sparkles } from 'lucide-react';

export default function SkillMatrix() {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', ...skillsData.map((c) => c.category)];

  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'FileCode': return <FileCode size={20} />;
      case 'FileCode2': return <FileCode2 size={20} />;
      case 'Terminal': return <Terminal size={20} />;
      case 'Coffee': return <Coffee size={20} />;
      case 'Table': return <Table size={20} />;
      case 'BarChart3': return <BarChart3 size={20} />;
      case 'PieChart': return <PieChart size={20} />;
      case 'Database': return <Database size={20} />;
      case 'Server': return <Server size={20} />;
      case 'Layers': return <Layers size={20} />;
      case 'Workflow': return <Workflow size={20} />;
      case 'Layout': return <Layout size={20} />;
      case 'Component': return <Component size={20} />;
      case 'GitBranch': return <GitBranch size={20} />;
      case 'Sparkles': return <Sparkles size={20} />;
      default: return <Cpu size={20} />;
    }
  };

  const filteredCategories = activeTab === 'All'
    ? skillsData
    : skillsData.filter((c) => c.category === activeTab);

  return (
    <section id="skills" style={{ padding: '90px 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={15} />
            <span>Technical Skills</span>
          </div>
          <h2 className="section-title">
            My Engineering & <span className="gradient-text">Data Stack</span>
          </h2>
          <p className="section-subtitle">
            Languages, frameworks, data science libraries, and database technologies I utilize to build practical solutions.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '40px'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: activeTab === cat ? 'var(--accent-gradient)' : 'var(--bg-card)',
                color: activeTab === cat ? '#050b14' : 'var(--text-primary)',
                border: '1px solid ' + (activeTab === cat ? 'transparent' : 'var(--border-color)'),
                fontWeight: 700,
                fontSize: '0.88rem',
                padding: '8px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'all 0.25 ease',
                boxShadow: activeTab === cat ? '0 4px 15px var(--accent-glow)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {filteredCategories.map((group, groupIdx) => (
            <div key={groupIdx} className="glass-card" style={{ padding: '30px' }}>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '24px',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span>{group.category}</span>
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px'
                }}
              >
                {group.items.map((skill, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '14px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              background: 'var(--accent-light)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--accent-primary)'
                            }}
                          >
                            {getSkillIcon(skill.icon)}
                          </div>
                          <span style={{ fontWeight: 700, fontSize: '1rem' }}>{skill.name}</span>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: 'var(--accent-primary)',
                            background: 'var(--accent-light)',
                            padding: '3px 8px',
                            borderRadius: '12px'
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div
                        style={{
                          height: '7px',
                          width: '100%',
                          background: 'var(--bg-main)',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          marginBottom: '12px'
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${skill.level}%`,
                            background: 'var(--accent-gradient)',
                            borderRadius: '10px',
                            transition: 'width 1s ease-in-out'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {skill.experience}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
