import CryptoJS from 'crypto-js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const IRACING_BASE_URL = 'https://members-ng.iracing.com';
const LOGIN_URL = `${IRACING_BASE_URL}/auth`;

function hashPassword(password, email) {
  const emailLower = email.toLowerCase();
  const combined = password + emailLower;
  const hash = CryptoJS.SHA256(combined);
  return CryptoJS.enc.Base64.stringify(hash);
}

export async function authenticate() {
  if (!process.env.IRACING_EMAIL || !process.env.IRACING_PASSWORD) {
    throw new Error('iRacing credentials not configured');
  }

  try {
    const hashedPassword = hashPassword(
      process.env.IRACING_PASSWORD,
      process.env.IRACING_EMAIL
    );

    const response = await axios.post(LOGIN_URL, {
      email: process.env.IRACING_EMAIL,
      password: hashedPassword
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.headers['set-cookie']) {
      return response.headers['set-cookie'].join('; ');
    }

    return null;
  } catch (error) {
    console.error('iRacing authentication error:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with iRacing');
  }
}