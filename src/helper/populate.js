const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');
const TheatreModel = require('../models/theatre.model');
const MovieModel = require('../models/movie.model');
const ShowtimeModel = require('../models/showtime.model');

// Define the models and associations
const defineModels = () => {

  // Associations
  TheatreModel.hasMany(MovieModel, { foreignKey: 'theatreId' });
  MovieModel.belongsTo(TheatreModel, { foreignKey: 'theatreId' });
  MovieModel.hasMany(ShowtimeModel, { foreignKey: 'movieId' });
  ShowtimeModel.belongsTo(MovieModel, { foreignKey: 'movieId' });

  return {
    Theatre: TheatreModel,
    Movie: MovieModel,
    Showtime: ShowtimeModel,
  };
};

// Populate the database with sample data
const populateDatabase = async () => {
  const { Theatre, Movie, Showtime } = defineModels();

  try {
    // Sync the models to create the tables
    await sequelize.sync({ force: true });

    // Create sample theatres
    const theatre1 = await Theatre.create({ name: 'Theatre 1', city: 'BLR' });
    const theatre2 = await Theatre.create({ name: 'Theatre 2', city: 'BLR' });

    // Create sample movies
    const movie1 = await Movie.create({ title: 'Movie 1', theatreId: theatre1.id });
    const movie2 = await Movie.create({ title: 'Movie 2', theatreId: theatre2.id });

    // Create sample showtimes
    await Showtime.bulkCreate([
      { movieId: movie1.id, date: '2023-05-22', time: '10:00:00' },
      { movieId: movie1.id, date: '2023-05-22', time: '14:00:00' },
      { movieId: movie1.id, date: '2023-05-23', time: '13:00:00' },
      { movieId: movie2.id, date: '2023-05-22', time: '15:00:00' },
      { movieId: movie2.id, date: '2023-05-23', time: '11:00:00' },
    ]);

    console.log('Sample data has been populated into the database.');
  } catch (error) {
    console.error('Error populating the database:', error);
  }
};

// Call the populateDatabase function
populateDatabase();