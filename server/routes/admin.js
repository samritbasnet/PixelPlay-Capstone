import express from 'express';
import { getAdminDashboard, loginAdmin } from '../controllers/adminController.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Admin test route works!');
});

router.post('/login', loginAdmin);
router.get('/dashboard', authorizeAdmin, getAdminDashboard);

export default router;
