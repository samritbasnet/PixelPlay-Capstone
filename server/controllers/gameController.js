import { supabase } from '../supabaseClient.js';

export const getGames = async (req, res) => {
  const { data, error } = await supabase.from('games').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const getGameById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('games').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error: 'Game not found' });
  res.json(data);
};

export const addGame = async (req, res) => {
  const game = req.body;
  const { data, error } = await supabase.from('games').insert([game]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

export const updateGame = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const { data, error } = await supabase.from('games').update(updateData).eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const deleteGame = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('games').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Game deleted' });
};
