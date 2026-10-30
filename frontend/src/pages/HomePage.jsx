import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

const HomePage = () => {
  const practicalHighlights = [
    { num: 'P1-P3', title: 'React Architecture, State & APIs', desc: 'Component composition, multi-page routing with React Router, and live GitHub REST API integration.', link: '/repos' },
    { num: 'P4-P5', title: 'Node.js, Express & MongoDB', desc: 'Modular RESTful CRUD API, custom logging middleware, centralized error handling, Mongoose Task & User schemas.', link: '/tasks' },
    { num: 'P6-P7', title: 'Full-Stack Integration & Auth', desc: 'Secure JWT authentication pipeline, bcrypt password hashing, protected routes, and per-user data isolation.', link: '/tasks' },
    { num: 'P8-P10', title: 'Performance, Caching & Events', desc: 'React.lazy route splitting, node-cache in-memory query optimization, and native EventEmitter async processing.', link: '/tasks' },
    { num: 'P11', title: 'Docker Containerization', desc: 'Multi-stage Dockerfiles, Nginx SPA routing & API reverse proxy, persistent MongoDB volume orchestration.', link: '/tasks' },
    { num: 'P12', title: 'CI/CD with GitHub Actions', desc: 'Automated test suite, dependency caching, build verification, and pipeline status reporting on every repository push.', link: '/tasks' },
    { num: 'P13', title: 'AI API Integration', desc: 'Intelligent AI task assistant with auto-description generation, priority recommendation, and zero-breakage responsible fallback.', link: '/tasks' },
  ];

  return (
    <div>
      <Header name="Dhruv Patel" themeColor="#2563eb" />
      <About />
      <Skills />

      <section className="section" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">ITUE301 Curriculum Architecture</h2>
            <p className="section-subtitle">
              Overview of all practical phases implemented and integrated into this unified web application.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {practicalHighlights.map((item, index) => (
              <div key={index} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    marginBottom: '12px'
                  }}>
                    {item.num}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--secondary)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '16px' }}>{item.desc}</p>
                </div>
                <Link to={item.link} className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }}>
                  Explore Feature &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
