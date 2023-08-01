const express = require('express');
const showtimes = require('../controllers/showtimesController');

const router = express.Router();

// Route to fetch showtimes for a theater for the next 7 days
router.get("/theaters/:theaterId/showtimes/next-7-days", showtimes.getShowsForWeek);

// Route to fetch showtimes for a theater for a specific date
router.get("/theaters/:theaterId/showtimes/:date", showtimes.getShowsForDate);

// Route to book a seat for a specific showtime
router.post("/showtimes/:showtimeId/bookseat", showtimes.bookSeat);

module.exports = router;