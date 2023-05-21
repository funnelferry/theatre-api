const Movie = require('../models/movie.model');
const Showtime = require('../models/showtime.model');

// Get movies and showtimes for a theatre and date
exports.getMoviesForTheatreAndDate = async (req, res) => {
  const theatreId = req.params.id;
  const date = req.params.date;

  try {
    const movies = await Movie.findAll({
      where: { theatreId },
      include: [
        {
          model: Showtime,
          where: { date },
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