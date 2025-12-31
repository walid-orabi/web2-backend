const MenuItem = require('../models/MenuItem');

const getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.getAll();
    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMenuByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const menu = await MenuItem.getByCategory(category);
    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getMenu, getMenuByCategory };