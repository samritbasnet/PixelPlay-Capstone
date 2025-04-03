import { useEffect, useState } from 'react';
import './PixelShelf.scss';

const PixelShelf = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('pixelshelf');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (gameId) => {
    const updated = favorites.filter((game) => game.id !== gameId);
    setFavorites(updated);
    localStorage.setItem('pixelshelf', JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return <p className="pixelshelf__empty">You haven't added any games yet.</p>;
  }

  return (
    <div className="pixelshelf">
      <h1 className="pixelshelf__title">🎮 Your PixelShelf</h1>
      <div className="pixelshelf__grid">
        {favorites.map((game) => (
          <div className="pixelshelf__card" key={game.id}>
            <img
              src={game.background_image || game.imageUrl}
              alt={game.name}
              className="pixelshelf__image"
            />
            <div className="pixelshelf__info">
              <h2 className="pixelshelf__name">{game.name}</h2>
              <p className="pixelshelf__rating">⭐ {game.rating}</p>
              <p className="pixelshelf__release">
                📅 {game.released || game.releaseDate}
              </p>
              {game.genres && (
                <p className="pixelshelf__genres">
                  <strong>Genres:</strong>{' '}
                  {Array.isArray(game.genres)
                    ? game.genres
                        .map((g) => (typeof g === 'string' ? g : g.name))
                        .join(', ')
                    : game.genres}
                </p>
              )}
              <button
                type="button"
                className="pixelshelf__remove-btn"
                onClick={() => handleRemove(game.id)}
              >
                Remove from Shelf
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PixelShelf;
