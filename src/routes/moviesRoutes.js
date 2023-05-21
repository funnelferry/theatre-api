const express = require('express');
const moviesController = require('../controllers/movieController');

const router = express.Router();

// Get movies and showtimes for a theatre (next 7 days)
router.get('/theatres/:id/movies', moviesController.getMoviesForTheatre);

module.exports = router;
