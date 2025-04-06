import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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

    const { title, description, genre, rating, imageUrl, releaseDate } = newGame;
    if (!title || !description || !genre || !rating || !imageUrl || !releaseDate) {
      toast.error('Please fill out all fields before adding a game.');
      return;
    }

 
    console.log('Adding game with data:', newGame);

    try {
      const response = await axios.post(API_URL, newGame, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Add game response:', response.data);
      toast.success('Game added successfully!');
      // Clear the form
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
      toast.error('Failed to add game.');
    }
  };

  const handleEdit = (game) => {
    if (game.source !== 'admin') {
      toast.error('Cannot edit non-admin game.');
      return;
    }
    setEditGame({
      ...game,
      imageUrl: game.background_image,
      releaseDate: game.released,
    });
  };

  const handleEditFieldChange = (e) => {
    const { name, value } = e.target;
    setEditGame((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateGame = async () => {
    try {
      const updatedGame = {
        title: editGame.title,
        description: editGame.description,
        genre: editGame.genre,
        rating: Number.parseFloat(editGame.rating),
        imageUrl: editGame.imageUrl,
        releaseDate: editGame.releaseDate,
      };

      await axios.put(`${API_URL}/${editGame.id}`, updatedGame, {
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

  const handleDelete = async (id, source) => {
    if (source !== 'admin') {
      toast.error('Cannot delete non-admin game.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this game?')) return;
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
              <th>Release</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.title}</td>
                <td>{game.description}</td>
                <td>
                  {game.source === 'admin'
                    ? game.genre
                    : game.genres?.map((g) => g.name).join(', ')}
                </td>
                <td>{game.rating}</td>
                <td>
                  {game.background_image ? (
                    <img src={game.background_image} alt={game.title} width="80" />
                  ) : null}
                </td>
                <td>{game.released}</td>
                <td>
                  {game.source === 'admin' && (
                    <>
                      <button
                        onClick={() => handleEdit(game)}
                        className="admin-dashboard__button"
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(game.id, game.source)}
                        className="admin-dashboard__button"
                        type="button"
                      >
                        Delete
                      </button>
                    </>
                  )}
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
              onChange={handleEditFieldChange}
              className="admin-dashboard__input"
            />
          ))}
          <textarea
            name="description"
            value={editGame.description}
            onChange={handleEditFieldChange}
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
