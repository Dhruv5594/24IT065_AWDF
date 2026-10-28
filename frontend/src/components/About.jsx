import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Academic profile, education background, and engineering interests.
          </p>
        </div>

        <div className="card" style={{ maxWidth: '850px', margin: '0 auto', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '16px', fontSize: '1.05rem', color: '#334155' }}>
            I am a dedicated Information Technology undergraduate student at <strong>CHARUSAT</strong> completing 
            <strong> Advanced Web Development Frameworks (ITUE301)</strong>. I specialize in architecting modern full-stack
            web solutions combining React single-page frontends, robust Node.js/Express REST APIs, MongoDB database
            design, and production-grade Docker containerization.
          </p>
          <p style={{ marginBottom: '24px', fontSize: '1.05rem', color: '#334155' }}>
            Throughout this course, I have implemented reusable component architectures, client-side routing,
            asynchronous public API integration, JWT-based authentication pipelines, in-memory caching with 
            <code>node-cache</code>, decoupled asynchronous event processing with Node's <code>EventEmitter</code>, 
            and multi-service orchestration via <code>docker compose</code>.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            borderTop: '1px solid var(--border)',
            paddingTop: '20px'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                University
              </span>
              <p style={{ fontWeight: 600 }}>CHARUSAT</p>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Course Code
              </span>
              <p style={{ fontWeight: 600 }}>ITUE301 (AWDF)</p>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Focus
              </span>
              <p style={{ fontWeight: 600 }}>Full-Stack & DevOps</p>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Semester
              </span>
              <p style={{ fontWeight: 600 }}>Semester 5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
