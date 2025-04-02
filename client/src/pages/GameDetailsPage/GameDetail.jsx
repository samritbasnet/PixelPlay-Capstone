import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './GameDetail.scss';

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const API_URL = import.meta.env.VITE_API_BASE_URL;

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState('');

  const fetchGameDetails = async () => {
    try {
      if (id.startsWith('admin-')) {
        const res = await axios.get(`${API_URL}/games/${id.replace('admin-', '')}`);
        setGame(res.data);
      } else {
        const res = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`
        );
        setGame(res.data);
      }
    } catch (err) {
      console.error('Failed to load game:', err);
      setError('Failed to load game data.');
    }
  };

  useEffect(() => {
    fetchGameDetails();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!game) return <p>Loading...</p>;

  return (
    <div className="game-details">
      <h1>{game.title || game.name}</h1>
      <img
        src={game.imageUrl || game.background_image}
        alt={game.title || game.name}
        className="game-details__image"
      />
      <p>
        <strong>Genre:</strong> {game.genre || game.genres?.map((g) => g.name).join(', ')}
      </p>
      <p>
        <strong>Rating:</strong> {game.rating}
      </p>
      <p>
        <strong>Release Date:</strong> {game.releaseDate || game.released}
      </p>
      <div
        className="game-details__info description"
        dangerouslySetInnerHTML={{
          __html: game.description || game.description_raw || 'No description available.',
        }}
      />
    </div>
  );
};

export default GameDetails;
