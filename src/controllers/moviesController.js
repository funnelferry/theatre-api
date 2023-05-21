const { Op } = require('sequelize');
const Movie = require('../models/movie.model');
const Showtime = require('../models/showtime.model');

// Get movies and showtimes for a theatre (next 7 days)
exports.getMoviesForTheatre = async (req, res) => {
  const theatreId = req.params.id;
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Get the date 7 days from now

  try {
    const movies = await Movie.findAll({
      where: { theatreId },
      include: [
        {
          model: Showtime,
          where: { date: { [Op.between]: [today, nextWeek] } },
          attributes: ['time', 'date']
        }
      ]
    });

    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};