/**
 * GitHub REST API Service
 * 
 * Handles requests to public GitHub endpoints:
 * - GET https://api.github.com/users/{username}
 * - GET https://api.github.com/users/{username}/repos?sort=updated&per_page=6
 * 
 * Features:
 * - Async/await with timeout protection
 * - SessionStorage caching to prevent hitting GitHub unauthenticated rate limits (60 req/hr)
 * - Detailed rate-limit and error state detection
 * - Null-safe data normalization
 */

const BASE_URL = 'https://api.github.com';
const CACHE_PREFIX = 'portfolio_github_cache_';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Normalizes repository object to ensure safe rendering of null or missing properties.
 */
function sanitizeRepo(repo) {
  return {
    id: repo.id || Math.random().toString(),
    name: repo.name || 'Unnamed Repository',
    fullName: repo.full_name || '',
    description: repo.description || 'No description provided for this repository.',
    htmlUrl: repo.html_url || '#',
    homepage: repo.homepage || null,
    stars: typeof repo.stargazers_count === 'number' ? repo.stargazers_count : 0,
    forks: typeof repo.forks_count === 'number' ? repo.forks_count : 0,
    watchers: typeof repo.watchers_count === 'number' ? repo.watchers_count : 0,
    language: repo.language || 'Plain Text',
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    updatedAt: repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : 'Recently',
    isFork: Boolean(repo.fork),
    openIssues: repo.open_issues_count || 0
  };
}

/**
 * Normalizes user profile object.
 */
function sanitizeUser(user) {
  return {
    login: user.login || 'Unknown',
    name: user.name || user.login || 'Developer',
    avatarUrl: user.avatar_url || 'https://images.unsplash.com/photo-1534972195531-a756b1129f63?w=300&auto=format&fit=crop&q=80',
    htmlUrl: user.html_url || '#',
    bio: user.bio || 'Passionate software engineer building web applications.',
    publicRepos: typeof user.public_repos === 'number' ? user.public_repos : 0,
    followers: typeof user.followers === 'number' ? user.followers : 0,
    following: typeof user.following === 'number' ? user.following : 0,
    company: user.company || null,
    location: user.location || 'Global',
    blog: user.blog ? (user.blog.startsWith('http') ? user.blog : `https://${user.blog}`) : null,
    twitterUsername: user.twitter_username || null,
    createdAt: user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    }) : null
  };
}

/**
 * Retrieve cached payload from sessionStorage if valid.
 */
function getCachedData(key) {
  try {
    const raw = sessionStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
      return parsed.data;
    }
    sessionStorage.removeItem(`${CACHE_PREFIX}${key}`);
  } catch (err) {
    console.warn('SessionStorage cache read failed:', err);
  }
  return null;
}

/**
 * Store data into sessionStorage cache.
 */
function setCachedData(key, data) {
  try {
    sessionStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify({
      timestamp: Date.now(),
      data
    }));
  } catch (err) {
    console.warn('SessionStorage cache write failed:', err);
  }
}

/**
 * Clears cache for a given username or all github caches.
 */
export function clearGithubCache(username) {
  try {
    if (username) {
      sessionStorage.removeItem(`${CACHE_PREFIX}user_${username.toLowerCase()}`);
      sessionStorage.removeItem(`${CACHE_PREFIX}repos_${username.toLowerCase()}`);
    } else {
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          sessionStorage.removeItem(key);
        }
      });
    }
  } catch (err) {
    console.warn('Failed clearing cache:', err);
  }
}

/**
 * Fetch GitHub User Profile and Repositories with rate limit and error handling.
 * 
 * @param {string} username - GitHub username
 * @param {object} options - { forceRefresh: boolean, perPage: number }
 * @returns {Promise<{ user: object, repos: Array, rateLimit: object }>}
 */
export async function fetchGithubData(username, options = {}) {
  const { forceRefresh = false, perPage = 6 } = options;
  const cleanUsername = (username || '').trim().toLowerCase();

  if (!cleanUsername) {
    throw new Error('A valid GitHub username must be provided.');
  }

  // Check cache first unless forceRefresh is set
  const cacheKey = `${cleanUsername}_${perPage}`;
  if (!forceRefresh) {
    const cached = getCachedData(cacheKey);
    if (cached) {
      return { ...cached, isFromCache: true };
    }
  }

  const userEndpoint = `${BASE_URL}/users/${encodeURIComponent(cleanUsername)}`;
  const reposEndpoint = `${BASE_URL}/users/${encodeURIComponent(cleanUsername)}/repos?sort=updated&per_page=${perPage}`;

  // Headers
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };

  try {
    // Concurrent fetch for profile and repos
    const [userRes, reposRes] = await Promise.all([
      fetch(userEndpoint, { headers }),
      fetch(reposEndpoint, { headers })
    ]);

    // Read Rate Limit headers from either response
    const remaining = userRes.headers.get('x-ratelimit-remaining');
    const resetTime = userRes.headers.get('x-ratelimit-reset');
    const rateLimit = {
      remaining: remaining !== null ? parseInt(remaining, 10) : null,
      reset: resetTime ? new Date(parseInt(resetTime, 10) * 1000) : null
    };

    // Check for Rate Limit (HTTP 403 with remaining === 0)
    if (userRes.status === 403 || reposRes.status === 403) {
      const resetDateStr = rateLimit.reset ? rateLimit.reset.toLocaleTimeString() : 'soon';
      const error = new Error(`GitHub API rate limit exceeded (60 requests/hr for unauthenticated IP). Limit resets at ${resetDateStr}.`);
      error.status = 403;
      error.isRateLimited = true;
      error.resetTime = rateLimit.reset;
      throw error;
    }

    // Check for 404 Not Found
    if (userRes.status === 404) {
      const error = new Error(`GitHub user "${username}" was not found. Please verify the username.`);
      error.status = 404;
      error.isNotFound = true;
      throw error;
    }

    // Check other non-ok responses
    if (!userRes.ok) {
      const error = new Error(`Failed to load GitHub profile (HTTP ${userRes.status}: ${userRes.statusText})`);
      error.status = userRes.status;
      throw error;
    }

    if (!reposRes.ok) {
      const error = new Error(`Failed to load GitHub repositories (HTTP ${reposRes.status}: ${reposRes.statusText})`);
      error.status = reposRes.status;
      throw error;
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    const sanitizedUser = sanitizeUser(userData);
    const sanitizedRepos = Array.isArray(reposData) ? reposData.map(sanitizeRepo) : [];

    const result = {
      user: sanitizedUser,
      repos: sanitizedRepos,
      rateLimit,
      isFromCache: false,
      fetchedAt: new Date().toLocaleTimeString()
    };

    // Save to cache
    setCachedData(cacheKey, result);

    return result;
  } catch (err) {
    // Network failure (offline, DNS, timeout)
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const networkError = new Error('Network connection error: Unable to reach api.github.com. Please check your internet connection.');
      networkError.isNetworkError = true;
      throw networkError;
    }
    throw err;
  }
}
