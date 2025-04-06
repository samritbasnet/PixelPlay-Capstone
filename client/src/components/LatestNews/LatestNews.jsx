import { useEffect, useState } from 'react';
import './LatestNews.scss';

const BACKEND_API_URL = import.meta.env.VITE_API_BASE_URL;

const LatestNews = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchLatestGames = async () => {
      try {
        const res = await fetch(`${BACKEND_API_URL}/latest`);
        const data = await res.json();
        const filteredGames = data.filter((game) => game.background_image);
        setGames(filteredGames);
      } catch (err) {
        console.error('Failed to fetch game news:', err);
      }
    };

    fetchLatestGames();
  }, []);

  return (
    <section className="latest-news">
      <h2 className="latest-news__title">📰 Latest Game Release Date of 2025</h2>
      <div className="latest-news__list">
        {games.map((game) => (
          <div className="news-card" key={game.id}>
            <img
              className="news-card__image"
              src={game.background_image}
              alt={game.name}
            />
            <div className="news-card__content">
              <h3>{game.name}</h3>
              <p className="release">Release Date: {game.released}</p>
              <p className="rating">Rating: ⭐ {game.rating || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
