import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import adminRoutes from './routes/admin.js';

import games from './routes/game.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8081;

app.get('/', (req, res) => {
  res.send('PixelPlay Backend Running!');
});

app.use('/api/games', games);
app.use('/api/admin', adminRoutes);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
