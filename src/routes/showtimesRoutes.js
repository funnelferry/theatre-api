const express = require('express');
const movieDatesController = require('../controllers/showtimesController');

const router = express.Router();

// Get movies and showtimes for a theatre and date
router.get('/theatres/:id/movies/:date', movieDatesController.getMoviesForTheatreAndDate);

module.exports = router;