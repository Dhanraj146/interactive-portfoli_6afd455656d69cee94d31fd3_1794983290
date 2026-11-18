import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchGithubData, clearGithubCache } from '../services/githubService';

/**
 * Custom React Hook for GitHub REST API Integration
 * 
 * Provides reactive state management for fetching GitHub profile and repos:
 * - Handles loading, success, error, rate-limit, and empty repository states
 * - Implements retry functionality
 * - Prevents unnecessary requests on component re-renders
 * - Supports dynamic username switching
 */
export function useGithub(initialUsername) {
  const [username, setUsername] = useState(initialUsername || 'Dhanraj146');
  const [data, setData] = useState({ user: null, repos: [] });
  const [rateLimit, setRateLimit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Reference to track active request and prevent race conditions
  const activeRequestRef = useRef(0);

  const loadData = useCallback(async (targetUsername, forceRefresh = false) => {
    if (!targetUsername) return;

    const requestId = ++activeRequestRef.current;
    setLoading(true);
    setError(null);

    try {
      if (forceRefresh) {
        clearGithubCache(targetUsername);
      }

      const result = await fetchGithubData(targetUsername, { forceRefresh });

      // If a newer request was dispatched while this was resolving, ignore
      if (requestId !== activeRequestRef.current) return;

      setData({
        user: result.user,
        repos: result.repos
      });
      setRateLimit(result.rateLimit);
      setIsFromCache(result.isFromCache);
      setLastUpdated(result.fetchedAt || new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      if (requestId !== activeRequestRef.current) return;

      setError({
        message: err.message || 'An error occurred while fetching GitHub data.',
        isRateLimited: Boolean(err.isRateLimited),
        isNotFound: Boolean(err.isNotFound),
        isNetworkError: Boolean(err.isNetworkError),
        resetTime: err.resetTime || null,
        status: err.status || 500
      });
    } finally {
      if (requestId === activeRequestRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // Initial load or on username change
  useEffect(() => {
    loadData(username, false);
  }, [username, loadData]);

  const retry = useCallback(() => {
    loadData(username, true);
  }, [username, loadData]);

  const changeUsername = useCallback((newUsername) => {
    const trimmed = (newUsername || '').trim();
    if (trimmed && trimmed.toLowerCase() !== username.toLowerCase()) {
      setUsername(trimmed);
    }
  }, [username]);

  return {
    username,
    user: data.user,
    repos: data.repos,
    rateLimit,
    loading,
    error,
    isFromCache,
    lastUpdated,
    retry,
    setUsername: changeUsername
  };
}
