import NodeCache from 'node-cache';

// TTL default: 60 seconds, check period: 120 seconds
const defaultTTL = parseInt(process.env.CACHE_TTL || '60', 10);
const cache = new NodeCache({ stdTTL: defaultTTL, checkperiod: 120 });

console.log(`[Cache] NodeCache initialized with default TTL: ${defaultTTL}s`);

/**
 * Generate a cache key for tasks of a specific user
 */
export const getTasksCacheKey = (userId, queryParams = {}) => {
  const queryStr = Object.keys(queryParams)
    .sort()
    .map((k) => `${k}=${queryParams[k]}`)
    .join('&');
  return `tasks:user:${userId}:${queryStr || 'all'}`;
};

/**
 * Invalidate all cached data for a specific user
 */
export const invalidateUserTasksCache = (userId) => {
  const keys = cache.keys();
  const userPrefix = `tasks:user:${userId}`;
  const keysToDelete = keys.filter((k) => k.startsWith(userPrefix));
  if (keysToDelete.length > 0) {
    cache.del(keysToDelete);
    console.log(`[Cache] Invalidated ${keysToDelete.length} cache key(s) for user: ${userId}`);
  }
};

/**
 * Clear the entire cache
 */
export const clearCache = () => {
  cache.flushAll();
  console.log('[Cache] Entire cache flushed');
};

/**
 * Get cache stats for diagnostics and university viva demonstration
 */
export const getCacheStats = () => {
  return {
    stats: cache.getStats(),
    keysCount: cache.keys().length,
    keys: cache.keys(),
  };
};

export default cache;
