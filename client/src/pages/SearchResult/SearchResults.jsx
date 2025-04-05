import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './SearchResults.scss';

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const stored = localStorage.getItem('pixelshelf');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `https://api.rawg.io/api/games?search=${query}&key=${RAWG_API_KEY}&page_size=12`
        );
        setResults(res.data.results);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const isFavorited = (gameId) => favorites.some((g) => g.id === gameId);

  const handleFavorite = (game) => {
    const updated = isFavorited(game.id)
      ? favorites.filter((g) => g.id !== game.id)
      : [...favorites, game];

    setFavorites(updated);
    localStorage.setItem('pixelshelf', JSON.stringify(updated));
  };

  return (
    <div className="search-results">
      <h1 className="search-results__title">Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No games found for your search.</p>
      ) : (
        <div className="search-results__grid">
          {results.map((game) => (
            <div key={game.id} className="game-card">
              <img
                src={game.background_image}
                alt={game.name}
                className="game-card__image"
              />
              <div className="game-card__info">
                <h2 className="game-card__title">{game.name}</h2>
                <p className="game-card__rating">⭐ {game.rating}</p>
                <p className="game-card__release">Released: {game.released}</p>
                <p className="game-card__genre">
                  <strong>Genres:</strong>{' '}
                  {game.genres?.map((g) => g.name).join(', ') || 'N/A'}
                </p>
                <p className="game-card__desc">
                  {game.slug ? `Slug: ${game.slug}` : 'No preview available.'}
                </p>

                <button
                  type="button"
                  className={`game-card__favorite ${
                    isFavorited(game.id) ? 'game-card__favorite--active' : ''
                  }`}
                  onClick={() => handleFavorite(game)}
                >
                  {isFavorited(game.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
