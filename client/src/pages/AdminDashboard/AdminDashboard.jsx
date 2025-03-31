import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: '',
    description: '',
    genre: '',
    rating: '',
    imageUrl: '',
    releaseDate: '',
  });
  const [editGame, setEditGame] = useState(null);
  const navigate = useNavigate();
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/games`;
  const token = localStorage.getItem('token');

  const fetchGames = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchGames();
  }, [navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGame((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGame = async () => {
    try {
      await axios.post(API_URL, newGame, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewGame({
        title: '',
        description: '',
        genre: '',
        rating: '',
        imageUrl: '',
        releaseDate: '',
      });
      fetchGames();
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  const handleEdit = (game) => {
    setEditGame(game);
  };

  const handleUpdateGame = async () => {
    try {
      await axios.put(`${API_URL}/${editGame.id}`, editGame, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditGame(null);
      fetchGames();
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGames();
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  if (!token) return null;

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__title">Admin Dashboard</h1>

      <div className="admin-dashboard__add-form">
        <h2 className="admin-dashboard__add-form-title">Add New Game</h2>
        {['title', 'genre', 'rating', 'imageUrl', 'releaseDate'].map((field) => (
          <input
            key={field}
            type={
              field === 'rating' ? 'number' : field === 'releaseDate' ? 'date' : 'text'
            }
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newGame[field]}
            onChange={handleChange}
            className="admin-dashboard__input"
          />
        ))}
        <textarea
          name="description"
          placeholder="Description"
          value={newGame.description}
          onChange={handleChange}
          className="admin-dashboard__textarea"
        />
        <button onClick={handleAddGame} className="admin-dashboard__button">
          Add Game
        </button>
      </div>

      <div className="admin-dashboard__game-list">
        <h2 className="admin-dashboard__game-list-title">Game List</h2>
        <table className="admin-dashboard__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Image</th>
              <th>Release</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.title}</td>
                <td>{game.description}</td>
                <td>{game.genre}</td>
                <td>{game.rating}</td>
                <td>
                  <img src={game.image_url} alt={game.title} width="80" />
                </td>
                <td>{game.release_date}</td>
                <td>
                  <button
                    onClick={() => handleEdit(game)}
                    className="admin-dashboard__button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="admin-dashboard__button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editGame && (
        <div className="admin-dashboard__edit-form">
          <h2 className="admin-dashboard__edit-form-title">Edit Game</h2>
          {['title', 'genre', 'rating', 'imageUrl', 'releaseDate'].map((field) => (
            <input
              key={field}
              type={
                field === 'rating' ? 'number' : field === 'releaseDate' ? 'date' : 'text'
              }
              name={field}
              value={editGame[field]}
              onChange={(e) =>
                setEditGame((prev) => ({ ...prev, [field]: e.target.value }))
              }
              className="admin-dashboard__input"
            />
          ))}
          <textarea
            name="description"
            value={editGame.description}
            onChange={(e) => setEditGame({ ...editGame, description: e.target.value })}
            className="admin-dashboard__textarea"
          />
          <button onClick={handleUpdateGame} className="admin-dashboard__button">
            Update
          </button>
          <button onClick={() => setEditGame(null)} className="admin-dashboard__button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
