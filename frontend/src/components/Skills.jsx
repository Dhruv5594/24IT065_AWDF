import React from 'react';

const Skills = ({ skillList }) => {
  const defaultSkills = [
    { category: 'Frontend Development', items: ['React 18', 'JavaScript (ES6+)', 'React Router', 'HTML5 & CSS3', 'Vite', 'Responsive Design'] },
    { category: 'Backend & APIs', items: ['Node.js', 'Express.js', 'RESTful API Design', 'JWT Authentication', 'EventEmitter', 'Node-Cache'] },
    { category: 'Database & DevOps', items: ['MongoDB & Mongoose', 'Docker', 'Docker Compose', 'Nginx Reverse Proxy', 'Git & GitHub', 'CI/CD Concepts'] },
  ];

  return (
    <section id="skills" className="section" style={{ background: '#ffffff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Core technologies, libraries, and frameworks mastered across ITUE301 Practicals 1 to 11.
          </p>
        </div>

        {skillList ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {skillList.map((skill, index) => (
              <div key={index} className="card" style={{ textAlign: 'center', padding: '16px' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.05rem' }}>{skill}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {defaultSkills.map((group, idx) => (
              <div key={idx} className="card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚡</span> {group.category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {group.items.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border)',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
