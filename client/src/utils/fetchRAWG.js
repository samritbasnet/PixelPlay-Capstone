import axios from 'axios';

const RAWG_URL = 'https://api.rawg.io/api/games';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const fetchRawgGames = async () => {
  try {
    const response = await axios.get(RAWG_URL, {
      params: { key: API_KEY, page_size: 12 },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching RAWG games:', error);
    return [];
  }
};
