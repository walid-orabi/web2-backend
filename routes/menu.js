const express = require('express');
const { getMenu, getMenuByCategory } = require('../controllers/menuController');

const router = express.Router();

router.get('/', getMenu);
router.get('/:category', getMenuByCategory);

module.exports = router;