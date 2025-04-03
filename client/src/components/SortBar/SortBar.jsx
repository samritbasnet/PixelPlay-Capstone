import { useEffect, useState } from 'react';
import './SortBar.scss';

const SortBar = ({ onSortChange, onGenreChange }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch(`https://api.rawg.io/api/genres?key=${import.meta.env.VITE_RAWG_API_KEY}`)
      .then((res) => res.json())
      .catch((err) => console.error('Failed to fetch games:', err));
  }, []);
  return (
    <div className="sort-bar">
      <select onChange={(e) => onSortChange(e.target.value)} className="sort-bar__select">
        <option value="">Sort By</option>
        <option value="rating">Rating</option>
        <option value="released">Release Date</option>
        <option value="name">Name</option>
      </select>
      <select onChange={e > onSortChange(e.target.value)} className="sort-bar__select">
        <option value="">Filter by Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.slug}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SortBar;
