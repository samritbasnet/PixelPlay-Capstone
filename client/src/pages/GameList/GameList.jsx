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
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('pixelshelf');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${BACKEND_API_URL}/games`);
        const combinedGames = res.data;
  
        if (sortOption === 'rating') {
          combinedGames.sort((a, b) => b.rating - a.rating);
        } else if (sortOption === 'release') {
          combinedGames.sort(
            (a, b) =>
              new Date(b.released || b.release_date) -
              new Date(a.released || a.release_date)
          );
        }
  
        setGames(combinedGames);
      } catch (error) {
        console.error('Error fetching games:', error);
        toast.error('Failed to load games');
      }
    };
  
    fetchGames();
  }, [sortOption]);
  

  const handleFavorite = (e, game) => {
    e.preventDefault();
    e.stopPropagation();

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

  return (
    <div className="game-list">
      <h1 className="game-list__title">Explore Games</h1>

      <div className="game-list__controls">
        <label htmlFor="sort" className="game-list__sort-label">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="game-list__sort-select"
        >
          <option value="">Default</option>
          <option value="rating">Rating (High to Low)</option>
          <option value="release">Release Date (Newest)</option>
        </select>
      </div>

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
