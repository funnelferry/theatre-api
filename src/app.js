const express = require('express');
const { sequelize, connectDatabase } = require('./configs/db');
const theatresRoutes = require('./routes/theatresRoutes');
const moviesRoutes = require('./routes/moviesRoutes');
const movieDatesRoutes = require('./routes/showtimesRoutes');
require('dotenv').config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// API routes
app.use('/', theatresRoutes);
app.use('/', moviesRoutes);
app.use('/', movieDatesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDatabase();
});
