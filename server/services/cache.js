import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 3600, // 1 hour default TTL
  checkperiod: 600 // Check for expired keys every 10 minutes
});

export function getCachedData(key) {
  return cache.get(key);
}

export function setCachedData(key, data, ttl = 3600) {
  cache.set(key, data, ttl);
}

export function initCache() {
  console.log('Using in-memory cache');
  return cache;
}