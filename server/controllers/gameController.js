import axios from 'axios';
import { supabase } from '../supabaseClient.js';

export const getGames = async (req, res) => {
  try {
    const { data: adminGames, error: supabaseError } = await supabase
      .from('games')
      .select('*');

    if (supabaseError) {
      console.error('Supabase error fetching admin games:', supabaseError);
      return res.status(500).json({ error: 'Failed to load admin games' });
    }

    const formattedAdminGames = adminGames.map((game) => ({
      id: `admin-${game.id}`,
      title: game.title,
      background_image: game.image_url,
      rating: game.rating,
      released: game.release_date,
      description: game.description,
      genre: game.genre,
      source: 'admin',
    }));

    const rawgRes = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=12`
    );

    const rawgGames = rawgRes.data.results.map((game) => ({
      id: String(game.id),
      title: game.name,
      background_image: game.background_image,
      rating: game.rating,
      released: game.released,
      genres: game.genres,
      description: game.slug,
      source: 'rawg',
    }));

    const allGames = [...formattedAdminGames, ...rawgGames];
    res.json(allGames);
  } catch (err) {
    console.error('Error fetching games:', err.message);
    res.status(500).json({ error: 'Failed to load games' });
  }
};

export const getGameById = async (req, res) => {
  const { id } = req.params;

  const numericId = id.startsWith('admin-')
    ? Number.parseInt(id.replace('admin-', ''), 10)
    : id;
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', numericId)
    .single();

  if (error) {
    console.error('Supabase error fetching game by ID:', error);
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(data);
};

export const addGame = async (req, res) => {
  const { title, description, genre, rating, imageUrl, releaseDate } = req.body;


  if (!title || !description || !genre || !rating || !imageUrl || !releaseDate) {
    return res.status(400).json({ error: 'All fields are required to add a game.' });
  }


  const game = {
    title,
    description,
    genre,
    rating: Number.parseFloat(rating),
    image_url: imageUrl,
    release_date: releaseDate,
    source: 'admin',
  };

  try {

    console.log('Attempting to add game:', game);
    const { data, error } = await supabase.from('games').insert([game]).select();

    if (error) {
      console.error('Supabase error inserting game:', error);
   
      return res.status(500).json({ error: error.message });
    }

    console.log('Game added successfully:', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error adding game:', err);
    res.status(500).json({ error: 'Failed to add game.' });
  }
};

export const updateGame = async (req, res) => {
  const { id } = req.params;

  if (!id.startsWith('admin-')) {
    return res.status(400).json({ error: 'Cannot update RAWG games.' });
  }

  const supabaseId = id.replace('admin-', '');
  const { title, description, genre, rating, imageUrl, releaseDate } = req.body;

  if (!title || !description || !genre || !rating || !imageUrl || !releaseDate) {
    return res.status(400).json({ error: 'All fields are required to update a game.' });
  }

  const updatedGame = {
    title,
    description,
    genre,
    rating: Number.parseFloat(rating),
    image_url: imageUrl,
    release_date: releaseDate,
  };

  try {
    const { data, error } = await supabase
      .from('games')
      .update(updatedGame)
      .eq('id', supabaseId)
      .select();

    if (error) {
      console.error('Supabase error updating game:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Game not found for update.' });
    }

    res.json(data[0]);
  } catch (err) {
    console.error('Error updating game:', err);
    res.status(500).json({ error: 'Failed to update game.' });
  }
};

export const deleteGame = async (req, res) => {
  const { id } = req.params;

  if (!id.startsWith('admin-')) {
    return res.status(400).json({ error: 'Cannot delete RAWG games.' });
  }

  const supabaseId = id.replace('admin-', '');

  try {
    const { error } = await supabase.from('games').delete().eq('id', supabaseId);

    if (error) {
      console.error('Supabase error deleting game:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Game deleted successfully' });
  } catch (err) {
    console.error('Error deleting game:', err);
    res.status(500).json({ error: 'Failed to delete game.' });
  }
};
