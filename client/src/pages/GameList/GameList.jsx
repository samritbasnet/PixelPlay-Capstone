import axios from 'axios';
import { useEffect, useState } from 'react';
import './GameList.scss';

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const GameList = () => {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=12`
      );
      setGames(response.data.results);
    } catch (error) {
      console.error('Error fetching RAWG games:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="game-list">
      <h1 className="game-list__title">Explore Games</h1>
      <div className="game-list__grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <img
              src={game.background_image}
              alt={game.name}
              className="game-card__image"
            />
            <div className="game-card__info">
              <h2 className="game-card__title">{game.name}</h2>
              <p className="game-card__rating">Rating: {game.rating}</p>
              <p className="game-card__release">Released: {game.released}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
