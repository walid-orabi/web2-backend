const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');

const app = express();
app.set('trust proxy', 1);


app.use(helmet());
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('R-W Restaurant Backend API');
});

module.exports = app;