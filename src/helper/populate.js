  const { Sequelize, DataTypes } = require('sequelize');
  const { sequelize } = require('../configs/db');
  const TheatreModel = require('../models/theatre.model');
  const MovieModel = require('../models/movie.model');
  const ShowtimeModel = require('../models/showtime.model');

  // Define the models and associations
  const defineModels = () => {

    // Associations
    TheatreModel.belongsToMany(MovieModel, { through: 'TheatreMovie', constraints: true });
    MovieModel.belongsToMany(TheatreModel, { through: 'TheatreMovie', constraints: true });
    TheatreModel.hasMany(ShowtimeModel, { foreignKey: 'theatreId', constraints: true });
    ShowtimeModel.belongsTo(TheatreModel, { foreignKey: 'theatreId', constraints: true });

    MovieModel.hasMany(ShowtimeModel, { foreignKey: 'movieId', constraints: true });
    ShowtimeModel.belongsTo(MovieModel, { foreignKey: 'movieId', constraints: true });


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
      const theatre1 = await Theatre.create({ name: 'PVR Saket', city: 'DEL' });
      const theatre2 = await Theatre.create({ name: 'DLF Noida', city: 'DEL' });
      const theatre3 = await Theatre.create({ name: 'PVR Ambience', city: 'DEL' });

      // Create sample movies
      const movie1 = await Movie.create({ title: 'Spiderman' });
      const movie2 = await Movie.create({ title: 'Flash' });
      const movie3 = await Movie.create({ title: 'Transformers' });

      // Associate movies with theatres
      await movie1.addTheatre(theatre1);
      await movie2.addTheatre(theatre2);
      await movie3.addTheatre(theatre3);
      await movie1.addTheatre(theatre2);
      await movie2.addTheatre(theatre3);

      // Create sample showtimes
      await Showtime.bulkCreate([
        { movieId: movie1.id, theatreId: theatre1.id, date: '2023-06-01', time: '10:00:00', seatsAvailable: 10 },
        { movieId: movie1.id, theatreId: theatre1.id, date: '2023-06-01', time: '14:00:00', seatsAvailable: 7 },
        { movieId: movie1.id, theatreId: theatre2.id, date: '2023-06-02', time: '13:00:00', seatsAvailable: 20 },
        { movieId: movie1.id, theatreId: theatre2.id, date: '2023-06-03', time: '12:00:00', seatsAvailable: 15 },
        { movieId: movie1.id, theatreId: theatre2.id, date: '2023-06-04', time: '16:00:00', seatsAvailable: 22 },
        { movieId: movie2.id, theatreId: theatre2.id, date: '2023-06-01', time: '15:00:00', seatsAvailable: 30 },
        { movieId: movie2.id, theatreId: theatre2.id, date: '2023-06-02', time: '11:00:00', seatsAvailable: 32 },
        { movieId: movie2.id, theatreId: theatre3.id, date: '2023-06-03', time: '14:30:00', seatsAvailable: 40 },
        { movieId: movie2.id, theatreId: theatre3.id, date: '2023-06-04', time: '18:00:00', seatsAvailable: 50 },
        { movieId: movie3.id, theatreId: theatre3.id, date: '2023-06-01', time: '17:00:00', seatsAvailable: 50 },
        { movieId: movie3.id, theatreId: theatre3.id, date: '2023-06-02', time: '19:00:00', seatsAvailable: 100 },
        { movieId: movie3.id, theatreId: theatre3.id, date: '2023-06-03', time: '10:30:00', seatsAvailable: 100 },
        { movieId: movie3.id, theatreId: theatre1.id, date: '2023-06-04', time: '15:30:00', seatsAvailable: 100 }
      ]);

      console.log('Sample data has been populated into the database.');
    } catch (error) {
      console.error('Error populating the database:', error);
    }
  };

  // Call the populateDatabase function
  populateDatabase();
