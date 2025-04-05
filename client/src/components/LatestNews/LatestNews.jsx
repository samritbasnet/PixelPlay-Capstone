import { useEffect, useState } from 'react';
import './LatestNews.scss';

const LatestNews = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchLatestGames = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${
            import.meta.env.VITE_RAWG_API_KEY
          }&dates=2025-01-01,2025-12-31&ordering=-released&page_size=6`
        );
        const data = await res.json();
        const filteredGames = data.results.filter((game) => game.background_image);
        setGames(filteredGames);
      } catch (err) {
        console.error('Failed to fetch game news:', err);
      }
    };

    fetchLatestGames();
  }, []);

  return (
    <section className="latest-news">
      <h2 className="latest-news__title">📰 Latest Game Releases Date of 2025</h2>
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
