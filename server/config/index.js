import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || 'development',
  iRacing: {
    email: process.env.IRACING_EMAIL,
    password: process.env.IRACING_PASSWORD,
    baseUrl: 'https://members-ng.iracing.com'
  },
  frontend: {
    url: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : 'http://localhost:5173'
  },
  cache: {
    ttl: 3600 // Cache time in seconds
  }
};