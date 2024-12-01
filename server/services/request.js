import axios from 'axios';
import { authenticate } from './auth.js';

const IRACING_BASE_URL = 'https://members-ng.iracing.com';
let cookieJar = null;
let rateLimitRemaining = 100;
let rateLimitReset = 0;

async function refreshAuth() {
  cookieJar = await authenticate();
  if (!cookieJar) {
    throw new Error('Failed to authenticate with iRacing');
  }
  return cookieJar;
}

export async function makeRequest(endpoint, params = {}, retryCount = 0) {
  const MAX_RETRIES = 2;
  
  if (!cookieJar) {
    await refreshAuth();
  }

  try {
    const response = await axios.get(`${IRACING_BASE_URL}/data/${endpoint}`, {
      params,
      headers: {
        'Cookie': cookieJar,
        'Accept': 'application/json'
      }
    });

    // Update rate limit info
    rateLimitRemaining = parseInt(response.headers['x-ratelimit-remaining'] || '100');
    rateLimitReset = parseInt(response.headers['x-ratelimit-reset'] || '0') * 1000;

    // Handle rate limiting
    if (rateLimitRemaining <= 0) {
      const waitTime = rateLimitReset - Date.now();
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    // Handle data link response
    if (response.data.link) {
      const dataResponse = await axios.get(response.data.link);
      return dataResponse.data;
    }

    return response.data;

  } catch (error) {
    if (error.response?.status === 401 && retryCount < MAX_RETRIES) {
      cookieJar = null;
      await refreshAuth();
      return makeRequest(endpoint, params, retryCount + 1);
    }
    
    if (error.response?.status === 429) {
      const waitTime = (rateLimitReset - Date.now()) + 1000; // Add 1 second buffer
      if (waitTime > 0 && retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return makeRequest(endpoint, params, retryCount + 1);
      }
    }
    
    throw error;
  }
}