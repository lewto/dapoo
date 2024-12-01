import axios from 'axios';
import type { MemberData, RaceResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function getMemberInfo(custId: string): Promise<MemberData> {
  try {
    const response = await api.get(`/member/${custId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching member info:', error);
    if (error.response?.status === 404) {
      throw new Error('Member not found. Please check your Customer ID.');
    }
    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please try again.');
    }
    throw new Error('Failed to fetch member data. Please try again.');
  }
}

export async function getRaceResults(custId: string): Promise<RaceResult[]> {
  try {
    const response = await api.get(`/results/${custId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching race results:', error);
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a few minutes.');
    }
    return [];
  }
}