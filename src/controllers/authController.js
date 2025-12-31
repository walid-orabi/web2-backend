const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
  try {
    const { email, password, fname } = req.body;
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    const user = await User.create(email, password, fname);
    res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email, fname: user.fname }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, fname: user.fname },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logout = (req, res) => {
  // For JWT, logout is handled client-side by removing token
  res.json({ message: 'Logged out successfully' });
};

module.exports = { signup, login, logout };