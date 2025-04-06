import express from 'express';
import {
  addGame,
  deleteGame,
  getGameById,
  getGames,
  updateGame,
} from '../controllers/gameController.js';

const router = express.Router();

router.get('/', getGames);
router.get('/:id', getGameById);
router.post('/', addGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

export default router;
