import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const RAWG_API_KEY = process.env.RAWG_API_KEY;

    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&dates=2025-01-01,2025-12-31&ordering=-released&page_size=6`
    );

    const filteredGames = response.data.results.filter((game) => game.background_image);
    res.json(filteredGames);
  } catch (err) {
    console.error('RAWG latest fetch failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch latest games' });
  }
});

export default router;
