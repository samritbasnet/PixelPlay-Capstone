import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import games from './routes/game.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('PixelPlay Backend Running!');
});

app.use('/api/games', games);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
