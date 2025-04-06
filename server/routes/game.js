import express from 'express';
import {
  addGame,
  deleteGame,
  getGameById,
  getGames,
  updateGame,
} from '../controllers/gameController.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';

const router = express.Router();

router.get('/', getGames);
router.get('/:id', getGameById);
router.post('/', authorizeAdmin, addGame);
router.put('/:id', authorizeAdmin, updateGame);
router.delete('/:id', authorizeAdmin, deleteGame);

export default router;
