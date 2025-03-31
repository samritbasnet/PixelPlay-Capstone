import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../supabaseClient.js';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const { data: adminData, error } = await supabase
      .from('admin_login')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !adminData) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    const valid = bcrypt.compareSync(password, adminData.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: adminData.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};

export const getAdminDashboard = (req, res) => {
  res.json({ message: `Welcome, ${req.admin.email}!` });
};
