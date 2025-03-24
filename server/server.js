const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('PixelPlay Backend Running!');
});

const gamesRoutes = require('./routes/game');
app.use('/api/games', gamesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
