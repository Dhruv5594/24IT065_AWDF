import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '1.5rem' }}>🎓</span>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#ffffff' }}>Dhruv Patel</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.925rem', maxWidth: '380px', marginBottom: '16px' }}>
              B.Tech IT Student at CHARUSAT. Project developed for ITUE301 Advanced Web Development Frameworks
              demonstrating Practicals 1 to 11 with complete Docker containerization.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '1rem', fontWeight: 700 }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Home</Link></li>
              <li><Link to="/projects" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Projects Showcase</Link></li>
              <li><Link to="/repos" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>GitHub Explorer (P3)</Link></li>
              <li><Link to="/tasks" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Task Manager (P6/P7)</Link></li>
              <li><Link to="/contact" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Contact Form (P2)</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '1rem', fontWeight: 700 }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>
              <p>📧 dhruvdhruv@gmail.com</p>
              <p>📞 +91 9427376141</p>
              <p>📍 CHARUSAT Campus, Changa, Gujarat</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Dhruv Patel. ITUE301 All Rights Reserved.</p>
          <p>Built with React + Express + MongoDB + Docker Compose</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
