import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ name = "Dhruv Patel", themeColor = "#2563eb" }) => {
  return (
    <header className="header" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#ffffff',
      padding: '90px 0 70px 0',
      borderBottom: '1px solid #334155'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 16px',
          background: 'rgba(37, 99, 235, 0.2)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#60a5fa',
          marginBottom: '20px'
        }}>
          CHARUSAT • B.Tech Information Technology • Practical Portfolio
        </div>
        
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-1px',
          marginBottom: '16px',
          lineHeight: 1.1
        }}>
          Hi, I'm <span style={{ color: '#38bdf8' }}>{name}</span>
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: '#94a3b8',
          maxWidth: '680px',
          margin: '0 auto 36px auto',
          fontWeight: 400
        }}>
          Full-Stack Web Developer passionate about building high-performance React applications,
          scalable Express REST APIs, and Dockerized microservices.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/tasks" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>
            ⚡ Open Task Manager (CRUD)
          </Link>
          <Link to="/repos" className="btn btn-outline" style={{
            padding: '12px 24px',
            fontSize: '1rem',
            background: 'transparent',
            borderColor: '#475569',
            color: '#f8fafc'
          }}>
            🔍 Explore GitHub Repos
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
