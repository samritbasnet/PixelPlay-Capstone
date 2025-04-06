import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: '',
    description: '',
    genre: '',
    rating: '',
    image_url: '',
    release_date: '',
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
      toast.error('Unauthorized! Please log in again.');
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
      const gameToAdd = {
        ...newGame,
        is_admin_created: true, 
      };
      await axios.post(API_URL, gameToAdd, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewGame({
        title: '',
        description: '',
        genre: '',
        rating: '',
        image_url: '',
        release_date: '',
      });
      fetchGames();
    } catch (error) {
      console.error('Error adding game:', error);
      toast.error('Failed to add game.');
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
      toast.success('Game updated successfully!');
      setEditGame(null);
      fetchGames();
    } catch (error) {
      console.error('Error updating game:', error);
      toast.error('Failed to update game.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this game?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Game deleted successfully!');
      fetchGames();
    } catch (error) {
      console.error('Error deleting game:', error);
      toast.error('Failed to delete game.');
    }
  };

  if (!token) return null;

  return (
    <div className="admin-dashboard">
      <ToastContainer position="top-right" autoClose={2500} />
      <h1 className="admin-dashboard__title">Admin Dashboard</h1>


      <div className="admin-dashboard__add-form">
        <h2 className="admin-dashboard__add-form-title">Add New Game</h2>
        {['title', 'genre', 'rating', 'image_url', 'release_date'].map((field) => (
          <input
            key={field}
            type={
              field === 'rating' ? 'number' : field === 'release_date' ? 'date' : 'text'
            }
            name={field}
            placeholder={field.replace('_', ' ').toUpperCase()}
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
        <button onClick={handleAddGame} className="admin-dashboard__button" type="button">
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
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games
              
               .filter((game) => game.is_admin_created)
              .map((game) => (
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
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(game.id)}
                      className="admin-dashboard__button"
                      type="button"
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
          {['title', 'genre', 'rating', 'image_url', 'release_date'].map((field) => (
            <input
              key={field}
              type={
                field === 'rating' ? 'number' : field === 'release_date' ? 'date' : 'text'
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
          <button
            onClick={handleUpdateGame}
            className="admin-dashboard__button"
            type="button"
          >
            Update
          </button>
          <button
            onClick={() => setEditGame(null)}
            className="admin-dashboard__button"
            type="button"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
