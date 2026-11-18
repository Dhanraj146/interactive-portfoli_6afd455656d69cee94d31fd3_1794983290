import React, { useState } from 'react';
import { 
  RefreshCw, 
  Star, 
  GitFork, 
  ExternalLink, 
  AlertCircle, 
  Clock, 
  Search, 
  CheckCircle, 
  Code2, 
  Users, 
  FolderGit2, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import './GithubSection.css';

// Language color mapping for authentic GitHub look
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  Go: '#00ADD8',
  PHP: '#4F5D95',
  Shell: '#89e051',
  default: '#38bdf8'
};

export function GithubSection({ githubState, defaultUsername }) {
  const {
    username,
    user,
    repos,
    rateLimit,
    loading,
    error,
    isFromCache,
    lastUpdated,
    retry,
    setUsername
  } = githubState;

  const [inputVal, setInputVal] = useState(username || defaultUsername);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setUsername(inputVal.trim());
    }
  };

  const handlePresetClick = (preset) => {
    setInputVal(preset);
    setUsername(preset);
  };

  return (
    <section id="github" className="section github-section" aria-label="Live GitHub REST API Integration">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-kicker">
            <GithubIcon size={14} />
            <span>REST API Integration</span>
          </div>
          <h2 className="section-title">
            Live <span className="gradient-text">GitHub Activity</span>
          </h2>
          <p className="section-description">
            Directly connected to the public GitHub REST API. Real-time profile metrics and recently updated repositories fetched dynamically with asynchronous request handling.
          </p>
        </div>

        {/* Dynamic Controls Bar: Username Switcher, Refresh, Rate-limit Status */}
        <div className="card github-control-bar">
          <form onSubmit={handleSubmit} className="github-search-form" role="search">
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter GitHub username..."
                className="search-input font-mono"
                aria-label="GitHub username to inspect"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary search-btn" 
              disabled={loading}
            >
              <span>Load Profile</span>
            </button>
          </form>

          {/* Quick Preset Buttons for Evaluators */}
          <div className="preset-buttons-container">
            <span className="preset-label">Test with:</span>
            <button 
              type="button" 
              onClick={() => handlePresetClick(defaultUsername)}
              className={`preset-pill ${username.toLowerCase() === defaultUsername.toLowerCase() ? 'active' : ''}`}
            >
              @{defaultUsername}
            </button>
            <button 
              type="button" 
              onClick={() => handlePresetClick('octocat')}
              className={`preset-pill ${username.toLowerCase() === 'octocat' ? 'active' : ''}`}
            >
              @octocat
            </button>
            <button 
              type="button" 
              onClick={() => handlePresetClick('nonexistent-test-user-xyz')}
              className="preset-pill preset-error-test"
              title="Test 404 Not Found error state"
            >
              Test 404
            </button>
          </div>

          {/* Actions & Status Indicator */}
          <div className="github-actions-meta">
            {lastUpdated && (
              <span className="last-sync-tag">
                <Clock size={12} />
                <span>Synced: {lastUpdated}</span>
                {isFromCache && <span className="cache-pill">Cached</span>}
              </span>
            )}
            <button
              type="button"
              onClick={retry}
              disabled={loading}
              className="btn btn-secondary sync-btn"
              title="Force fresh sync from GitHub API"
            >
              <RefreshCw size={14} className={loading ? 'spin-icon' : ''} />
              <span>{loading ? 'Fetching...' : 'Refresh API'}</span>
            </button>
          </div>
        </div>

        {/* Rate Limit Notice Banner (if remaining rate limit is low or exceeded) */}
        {rateLimit && typeof rateLimit.remaining === 'number' && rateLimit.remaining <= 10 && (
          <div className="api-rate-banner" role="alert">
            <ShieldAlert size={18} className="rate-icon" />
            <div>
              <strong>API Rate Limit Advisory:</strong> {rateLimit.remaining} of 60 public requests remaining for your IP.
              {rateLimit.reset && (
                <span> Window resets at {rateLimit.reset.toLocaleTimeString()}. Responses are automatically cached locally to conserve quota.</span>
              )}
            </div>
          </div>
        )}

        {/* LOADING STATE (Skeleton Loaders) */}
        {loading && (
          <div className="github-loading-state" aria-live="polite" aria-busy="true">
            <div className="card profile-skeleton">
              <div className="skeleton-avatar skeleton-pulse" />
              <div className="skeleton-info">
                <div className="skeleton-line skeleton-title skeleton-pulse" />
                <div className="skeleton-line skeleton-sub skeleton-pulse" />
                <div className="skeleton-stats-row">
                  <div className="skeleton-box skeleton-pulse" />
                  <div className="skeleton-box skeleton-pulse" />
                  <div className="skeleton-box skeleton-pulse" />
                </div>
              </div>
            </div>

            <div className="repos-skeleton-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card repo-skeleton-card">
                  <div className="skeleton-line skeleton-title skeleton-pulse" />
                  <div className="skeleton-line skeleton-desc skeleton-pulse" />
                  <div className="skeleton-line skeleton-desc skeleton-pulse" />
                  <div className="skeleton-footer skeleton-pulse" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="card github-error-card" role="alert">
            <div className="error-icon-wrapper">
              <AlertCircle size={36} className="error-icon" />
            </div>
            <h3 className="error-title">Unable to Load GitHub Data</h3>
            <p className="error-message">{error.message}</p>
            
            {error.isRateLimited && (
              <div className="error-rate-detail">
                <p>
                  GitHub imposes a rate limit of 60 requests per hour on unauthenticated requests per IP address.
                </p>
                {error.resetTime && (
                  <p className="font-mono">
                    Limit resets at: {error.resetTime.toLocaleTimeString()}
                  </p>
                )}
              </div>
            )}

            <div className="error-action-row">
              <button 
                type="button" 
                onClick={retry} 
                className="btn btn-primary"
              >
                <RefreshCw size={14} />
                <span>Retry Request</span>
              </button>
              <button 
                type="button" 
                onClick={() => handlePresetClick(defaultUsername)} 
                className="btn btn-secondary"
              >
                <span>Reset to @{defaultUsername}</span>
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {!loading && !error && user && (
          <div className="github-data-wrapper">
            
            {/* User Profile Card */}
            <div className="card github-profile-card">
              <div className="profile-main-layout">
                <img
                  src={user.avatarUrl}
                  alt={`${user.login} GitHub avatar`}
                  className="profile-avatar"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534972195531-a756b1129f63?w=300&auto=format&fit=crop&q=80';
                  }}
                />

                <div className="profile-details">
                  <div className="profile-title-row">
                    <div>
                      <h3 className="profile-display-name">{user.name}</h3>
                      <a
                        href={user.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-handle font-mono"
                      >
                        @{user.login}
                        <ExternalLink size={12} />
                      </a>
                    </div>

                    <a
                      href={user.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline visit-profile-btn"
                    >
                      <GithubIcon size={16} />
                      <span>View on GitHub</span>
                    </a>
                  </div>

                  <p className="profile-bio">{user.bio}</p>

                  {/* Profile Metric Statistics */}
                  <div className="profile-stats-grid">
                    <div className="stat-card">
                      <FolderGit2 size={16} className="stat-icon stat-icon-repos" />
                      <div>
                        <span className="stat-value font-mono">{user.publicRepos}</span>
                        <span className="stat-label">Public Repos</span>
                      </div>
                    </div>

                    <div className="stat-card">
                      <Users size={16} className="stat-icon stat-icon-followers" />
                      <div>
                        <span className="stat-value font-mono">{user.followers}</span>
                        <span className="stat-label">Followers</span>
                      </div>
                    </div>

                    <div className="stat-card">
                      <Users size={16} className="stat-icon stat-icon-following" />
                      <div>
                        <span className="stat-value font-mono">{user.following}</span>
                        <span className="stat-label">Following</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Repositories Sub-header */}
            <div className="repos-section-header">
              <div className="repos-header-left">
                <h3 className="repos-subheading">Recently Updated Repositories</h3>
                <span className="badge badge-cyan">Top {repos.length} Displayed</span>
              </div>
              <span className="repos-sort-note font-mono">
                Endpoint: /users/{user.login}/repos?sort=updated
              </span>
            </div>

            {/* EMPTY STATE */}
            {repos.length === 0 ? (
              <div className="card github-empty-card">
                <Code2 size={32} className="empty-icon" />
                <h4>No Public Repositories Found</h4>
                <p>This GitHub account currently has no public repositories available to list.</p>
              </div>
            ) : (
              /* Repositories Grid */
              <div className="repos-grid">
                {repos.map((repo) => {
                  const langColor = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.default;

                  return (
                    <article key={repo.id} className="card repo-card">
                      <div className="repo-card-top">
                        <div className="repo-name-group">
                          <FolderGit2 size={16} className="repo-icon" />
                          <a
                            href={repo.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="repo-link font-mono"
                          >
                            <span>{repo.name}</span>
                          </a>
                        </div>

                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="repo-ext-btn"
                          aria-label={`Open repository ${repo.name} on GitHub`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>

                      <p className="repo-desc">{repo.description}</p>

                      <div className="repo-meta-footer">
                        {/* Language */}
                        <div className="repo-language">
                          <span 
                            className="lang-dot" 
                            style={{ backgroundColor: langColor }} 
                          />
                          <span className="lang-name font-mono">{repo.language}</span>
                        </div>

                        {/* Stars & Forks */}
                        <div className="repo-metrics">
                          <span className="repo-metric font-mono" title={`${repo.stars} Stars`}>
                            <Star size={13} className="star-icon" />
                            <span>{repo.stars}</span>
                          </span>

                          <span className="repo-metric font-mono" title={`${repo.forks} Forks`}>
                            <GitFork size={13} className="fork-icon" />
                            <span>{repo.forks}</span>
                          </span>
                        </div>

                        {/* Updated Time */}
                        <span className="repo-updated-time">
                          Updated {repo.updatedAt}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
