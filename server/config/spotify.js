import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config();


export const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
export const ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const getAccessToken = async () => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  
    try {
      const response = await axios.post(tokenUrl, qs.stringify({
        grant_type: 'client_credentials',
      }), {
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error.message);
    }
  };
  
  export default getAccessToken;