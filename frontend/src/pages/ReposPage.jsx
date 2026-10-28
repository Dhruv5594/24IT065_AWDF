import React, { useState, useEffect } from 'react';

// Fallback repositories in case of GitHub rate limiting or network absence
const FALLBACK_REPOS = [
  {
    id: 101,
    name: 'itue301-fullstack-docker',
    description: 'Complete Practical 1 to 11 suite for CHARUSAT ITUE301: React, Express, MongoDB, Docker Compose.',
    html_url: 'https://github.com',
    stargazers_count: 12,
    forks_count: 5,
    language: 'JavaScript',
    updated_at: new Date().toISOString(),
  },
  {
    id: 102,
    name: 'farm-ease-management',
    description: 'Smart agricultural crop tracking and weather management portal for regional farmers.',
    html_url: 'https://github.com',
    stargazers_count: 8,
    forks_count: 2,
    language: 'JavaScript',
    updated_at: new Date().toISOString(),
  },
  {
    id: 103,
    name: 'ai-voice-assistant-core',
    description: 'Natural language speech-to-intent engine powered by Python and audio processing pipelines.',
    html_url: 'https://github.com',
    stargazers_count: 15,
    forks_count: 4,
    language: 'Python',
    updated_at: new Date().toISOString(),
  },
];

const ReposPage = () => {
  const [username, setUsername] = useState('facebook');
  const [searchInput, setSearchInput] = useState('facebook');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      setIsFallback(false);

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=9`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Displaying cached university sample repositories.');
          }
          if (response.status === 404) {
            throw new Error(`GitHub user "${username}" not found. Please verify the username.`);
          }
          throw new Error(`API returned status code: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          if (Array.isArray(data)) {
            setRepos(data);
          } else {
            throw new Error('Malformed API response structure');
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn('[ReposPage] Public API fetch failed:', err.message);
          setError(err.message);
          setIsFallback(true);
          setRepos(FALLBACK_REPOS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRepos();

    return () => {
      isMounted = false; // Prevent state updates on unmounted component
    };
  }, [username]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setUsername(searchInput.trim());
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '8px'
          }}>
            PRACTICAL 3: API INTEGRATION
          </div>
          <h2 className="section-title">GitHub Public REST API Explorer</h2>
          <p className="section-subtitle">
            Demonstrating asynchronous data fetching, lifecycle effects, loading indicators, error resilience, and graceful fallbacks.
          </p>
        </div>

        {/* Search Controls */}
        <form onSubmit={handleSearchSubmit} style={{ maxWidth: '550px', margin: '0 auto 36px auto', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Enter GitHub username (e.g. facebook, vercel, torvalds)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Repos'}
          </button>
        </form>

        {/* Alert for Fallback/Notice */}
        {error && (
          <div className="toast-alert toast-info" style={{ maxWidth: '800px', margin: '0 auto 24px auto' }}>
            <span>ℹ️ {error}</span>
            {isFallback && <span style={{ fontWeight: 600 }}>Showing Offline Cache</span>}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e2e8f0',
              borderTop: '4px solid var(--primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 16px auto'
            }} />
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Querying GitHub API v3 endpoint...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && repos.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '50px 20px', maxWidth: '600px', margin: '0 auto' }}>
            <span style={{ fontSize: '3rem' }}>📂</span>
            <h3 style={{ marginTop: '12px', color: 'var(--secondary)' }}>No Public Repositories Found</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
              The requested user "{username}" does not currently have any public repositories.
            </p>
          </div>
        )}

        {/* Success Grid */}
        {!loading && repos.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {repos.map((repo) => (
              <div key={repo.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', wordBreak: 'break-word' }}>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name} ↗
                      </a>
                    </h3>
                    <span className="badge badge-low" style={{ textTransform: 'none' }}>
                      {repo.language || 'Code'}
                    </span>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', minHeight: '44px' }}>
                    {repo.description || 'No public repository description provided.'}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '12px',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)'
                }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <span>⭐ {repo.stargazers_count ?? 0}</span>
                    <span>🍴 {repo.forks_count ?? 0}</span>
                  </div>
                  <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReposPage;
