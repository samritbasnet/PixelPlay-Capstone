import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './GameList.scss';

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BACKEND_API_URL = import.meta.env.VITE_API_BASE_URL;

const GameList = () => {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('pixelShelf');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const fetchGames = async () => {
    try {
      const [rawgRes, adminRes] = await Promise.all([
        axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=12`),
        axios.get(`${BACKEND_API_URL}/games`),
      ]);

      const rawgGames = rawgRes.data.results.map((game) => ({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        released: game.released,
        source: 'rawg',
      }));

      const adminGames = adminRes.data.map((game) => ({
        id: `admin-${game.id}`,
        name: game.title,
        background_image: game.image_url,
        rating: game.rating,
        released: game.release_date,
        description: game.description,
        source: 'admin',
      }));

      setGames([...adminGames, ...rawgGames]);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  const handleFavorite = (e, game) => {
    e.stopPropagation();
    e.preventDefault();

    const alreadyAdded = favorites.find((g) => g.id === game.id);
    let updated;

    if (alreadyAdded) {
      updated = favorites.filter((g) => g.id !== game.id);
      toast.info(`${game.name} removed from PixelShelf`);
    } else {
      updated = [...favorites, game];
      toast.success(`${game.name} added to PixelShelf`);
    }

    setFavorites(updated);
    localStorage.setItem('pixelshelf', JSON.stringify(updated));
  };

  const isFavorited = (gameId) => favorites.some((g) => g.id === gameId);
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="game-list">
      <h1 className="game-list__title">Explore Games</h1>
      <div className="game-list__grid">
        {games.map((game) => (
          <Link to={`/game/${game.id}`} key={game.id} className="game-card">
            <img
              src={game.background_image}
              alt={game.name}
              className="game-card__image"
            />
            <div className="game-card__info">
              <h2 className="game-card__title">{game.name}</h2>
              <p className="game-card__rating">⭐ {game.rating}</p>
              <p className="game-card__release">Released: {game.released}</p>
              <button
                type="button"
                className={`game-card__favorite ${
                  isFavorited(game.id) ? 'game-card__favorite--active' : ''
                }`}
                onClick={(e) => handleFavorite(e, game)}
              >
                {isFavorited(game.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameList;
