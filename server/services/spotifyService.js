import axios from 'axios';
import getAccessToken, { SPOTIFY_BASE_URL, ACCESS_TOKEN } from '../config/spotify.js';

const PLAYLIST_IDS = {
  NG: '37i9dQZEVXbKY7jLzlJ11V',  // Nigeria
  ZA: '37i9dQZEVXbMH2jvi6jvjk',  // South Africa
  US: '37i9dQZEVXbLRQDuF5jeBp',  // USA
  GB: '37i9dQZEVXbLnolsZ8PSNw',  // UK
};

const getTopTracks = async (playlistId, accessToken) => {
    try {
      const response = await axios.get(`${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`, {
        params: {
          limit: 50,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.items;
    } catch (error) {
      console.error(`Error fetching top tracks for playlist ID ${playlistId}:`, error.message);
    }
  };
  
  const fetchData = async () => {
    const countries = ['NG', 'ZA', 'US', 'GB'];
    const results = {};
    const accessToken = await getAccessToken();
  
    for (const country of countries) {
      const playlistId = PLAYLIST_IDS[country];
      if (playlistId) {
        results[country] = await getTopTracks(playlistId, accessToken);
      } else {
        console.error(`No playlist ID found for country: ${country}`);
      }
    }
  
    return results;
  };
  
  export default fetchData;
