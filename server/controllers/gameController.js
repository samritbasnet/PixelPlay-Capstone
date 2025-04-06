import { supabase } from '../supabaseClient.js';
import axios from 'axios';


export const getGames = async (req, res) => {
  try {

    const { data: adminGames, error: supabaseError } = await supabase
      .from('games')
      .select('*');

    if (supabaseError) throw supabaseError;

    const formattedAdminGames = adminGames.map((game) => ({
      id: `admin-${game.id}`,
      name: game.title,
      background_image: game.image_url,
      rating: game.rating,
      released: game.release_date,
      description: game.description,
      source: 'admin',
    }));


    const rawgRes = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=12`
    );

    const rawgGames = rawgRes.data.results.map((game) => ({
      id: game.id,
      name: game.name,
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
  const { data, error } = await supabase.from('games').select('*').eq('id', id).single();

  if (error) return res.status(404).json({ error: 'Game not found' });
  res.json(data);
};


export const addGame = async (req, res) => {
  const { title, description, genre, rating, imageUrl, releaseDate } = req.body;

  const game = {
    title,
    description,
    genre,
    rating: Number.parseFloat(rating),
    image_url: imageUrl,
    release_date: releaseDate,
  };

  const { data, error } = await supabase.from('games').insert([game]);

  if (error) {
    console.error('Error inserting game:', error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
};


export const updateGame = async (req, res) => {
  const { id } = req.params;
  const { title, description, genre, rating, imageUrl, releaseDate } = req.body;

  const updatedGame = {
    title,
    description,
    genre,
    rating: Number.parseFloat(rating),
    image_url: imageUrl,
    release_date: releaseDate,
  };

  const { data, error } = await supabase.from('games').update(updatedGame).eq('id', id);

  if (error) {
    console.error('Error updating game:', error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

export const deleteGame = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('games').delete().eq('id', id);

  if (error) {
    console.error('Error deleting game:', error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: 'Game deleted' });
};
