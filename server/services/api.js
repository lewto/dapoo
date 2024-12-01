import axios from 'axios';
import { IRACING_API } from '../config/constants.js';
import { getCachedData, setCachedData } from './cache.js';

const api = axios.create({
  baseURL: IRACING_API.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export async function fetchFromAPI(endpoint, params) {
  const cacheKey = `${endpoint}-${JSON.stringify(params)}`;
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await api.get(endpoint, { params });
    
    // Handle data link response (iRacing's two-step data retrieval)
    if (response.data.link) {
      const dataResponse = await axios.get(response.data.link);
      setCachedData(cacheKey, dataResponse.data);
      return dataResponse.data;
    }

    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Member not found');
    }
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw new Error('Failed to fetch data from iRacing');
  }
}