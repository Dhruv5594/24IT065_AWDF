import React, { useState } from 'react';

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'FARM EASE',
      category: 'Full-Stack',
      description: 'A comprehensive agricultural management system for farmers to track crops, manage fertilizer schedules, and analyze market price fluctuations.',
      details: 'Built with React, Node.js, Express, and MongoDB. Includes role-based dashboards, harvest prediction tools, and automated notifications.',
      technology: 'React, Node.js, Express, MongoDB, REST API',
      status: 'Active Deployment'
    },
    {
      id: 2,
      name: 'TASK MASTER REST & DOCKER',
      category: 'Full-Stack',
      description: 'Enterprise task management platform with JWT authentication, per-user data isolation, in-memory caching, and asynchronous event notifications.',
      details: 'Demonstrates ITUE301 Practicals 4 to 11. Powered by Express REST endpoints, node-cache with invalidation, Node EventEmitter, and Docker Compose orchestration.',
      technology: 'React 18, Vite, Express, MongoDB, Docker, Nginx',
      status: 'Production Ready'
    },
    {
      id: 3,
      name: 'VOICE ASSISTANT',
      category: 'AI & Python',
      description: 'An AI-powered voice assistant capable of conversational queries, web automation, calendar management, and system task execution.',
      details: 'Utilizes Python speech recognition libraries, natural language parsing, and external weather and calendar APIs.',
      technology: 'Python, SpeechRecognition, Pyttsx3, NLP',
      status: 'Completed'
    },
    {
      id: 4,
      name: 'SECURE PASSWORD GENERATOR',
      category: 'Frontend',
      description: 'Customizable cryptographic password generator ensuring high entropy, rule selection, and one-click clipboard copying.',
      details: 'Features real-time strength meter calculation, entropy scoring, and responsive custom theme toggling.',
      technology: 'JavaScript (ES6), HTML5, CSS3, Web Crypto API',
      status: 'Completed'
    }
  ];

  const categories = ['All', 'Full-Stack', 'Frontend', 'AI & Python'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const toggleDetails = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Academic & Development Projects</h2>
          <p className="section-subtitle">
            Showcase of engineering projects built during the ITUE301 coursework.
          </p>
        </div>

        {/* State-driven Category Filter (Practical 2) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '9999px', padding: '8px 18px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredProjects.map((project) => (
            <div key={project.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-in-progress">{project.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>● {project.status}</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--secondary)' }}>{project.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>{project.description}</p>
                
                {/* Dynamically Show/Hide Detailed Content (Practical 2) */}
                {expandedId === project.id && (
                  <div style={{
                    background: 'var(--bg-main)',
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '16px',
                    borderLeft: '3px solid var(--primary)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)'
                  }}>
                    <strong>Architecture Details:</strong>
                    <p style={{ marginTop: '4px' }}>{project.details}</p>
                  </div>
                )}
              </div>

              <div>
                <div style={{
                  fontSize: '0.825rem',
                  background: '#f1f5f9',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  marginBottom: '14px'
                }}>
                  🛠️ {project.technology}
                </div>
                <button
                  onClick={() => toggleDetails(project.id)}
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%' }}
                >
                  {expandedId === project.id ? 'Hide Architecture Details ▲' : 'View Architecture Details ▼'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
