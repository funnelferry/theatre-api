  const { Sequelize, DataTypes } = require('sequelize');
  const { sequelize } = require('../configs/db');
  const Theatre = require('../models/theatre.model');
  const Movie = require('../models/movie.model');
  const Showtime = require('../models/showtime.model');

  const populateDB = async () => {
    // Define theatres
    const theatres = [
      { name: 'PVR Indiranagar', city: 'Bengaluru' },
      { name: 'INOX HSR', city: 'Bengaluru' },
    ];
  
    // Define movies
    const movies = [
      { title: 'Barbie', description: 'A Barbie movie.' },
      { title: 'Oppenheimer', description: 'A movie about Oppenheimer.' },
    ];
  
    // Define showtimes
    const showtimes = [
      '14:00:00',
      '19:00:00',
    ];
  
    // For each theatre
    for (let theatre of theatres) {
      // Create theatre
      const createdTheatre = await Theatre.create(theatre);
  
      // For each movie
      for (let movie of movies) {
        // Create movie with reference to theatre
        const createdMovie = await Movie.create({ ...movie, theatreId: createdTheatre.id });
  
        // For each of the next 7 days
        for (let i = 0; i < 7; i++) {
          // Calculate date
          const date = new Date();
          date.setDate(date.getDate() + i);
  
          // For each showtime
          for (let time of showtimes) {
            // Create showtime with reference to movie
            await Showtime.create({ time, date, movieId: createdMovie.id });
          }
        }
      }
    }
  
    console.log('Database has been populated!');
  };
  
  // Call the function to populate the database
  populateDB().catch(console.error);
