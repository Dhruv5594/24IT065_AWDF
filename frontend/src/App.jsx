import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

// Practical 8: Performance Optimization via Route-Based Code Splitting (React.lazy)
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ReposPage = lazy(() => import('./pages/ReposPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TasksPage = lazy(() => import('./pages/TasksPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner text="Loading view chunk (React.lazy)..." />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/repos" element={<ReposPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Route for Full-Stack Task CRUD */}
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TasksPage />
                </ProtectedRoute>
              }
            />

            {/* 404 Fallback Route */}
            <Route
              path="*"
              element={
                <div className="section">
                  <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <h1 style={{ fontSize: '3rem', color: 'var(--secondary)' }}>404</h1>
                    <p style={{ color: 'var(--text-muted)', margin: '16px 0 24px 0' }}>
                      The requested page route does not exist.
                    </p>
                    <a href="/" className="btn btn-primary">
                      Return to Portfolio Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
