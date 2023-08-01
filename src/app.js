const express = require('express');
const connectDatabase = require('./configs/db').connectDatabase;
const theatresRoutes = require('./routes/theatresRoutes');
const showtimesRoutes = require('./routes/showtimesRoutes');
const associations = require('./models/associations')
require('dotenv').config('../.env');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// API routes
app.use('/', theatresRoutes);
app.use('/', showtimesRoutes);

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
  associations();
});
