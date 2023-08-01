const { sequelize } = require('../configs/db');
const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
const Showtime = require('../models/showtime.model');


Movie.hasMany(Showtime, { foreignKey: "movieid" });
Theatre.hasMany(Showtime, { foreignKey: "theatreid" });
Showtime.belongsTo(Movie, { foreignKey: "movieid" });
Showtime.belongsTo(Theatre, { foreignKey: "theatreid" });

const populateDB = async () => {
  try {
    // Define theatres
    const theatresData = [
      { name: 'PVR Indiranagar', city: 'Bengaluru' },
      { name: 'INOX HSR', city: 'Bengaluru' },
    ];

    // Define movies
    const moviesData = [
      { title: 'Barbie', description: 'A Barbie movie.' },
      { title: 'Oppenheimer', description: 'A movie about Oppenheimer.' },
    ];

    // Create theatres and movies
    const [theatres, movies] = await Promise.all([
      Theatre.bulkCreate(theatresData, { returning: true }),
      Movie.bulkCreate(moviesData, { returning: true }),
    ]);

    // Define showtimes
    const showtimesData = [
      { time: '14:00:00', dateOffset: 0 }, // Today's showtime
      { time: '19:00:00', dateOffset: 0 }, // Today's showtime
      { time: '14:00:00', dateOffset: 1 }, // Tomorrow's showtime
      { time: '19:00:00', dateOffset: 1 }, // Tomorrow's showtime
    ];

    // Create showtimes for each movie in each theatre for the next 7 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    for (let date = new Date(today); date < nextWeek; date.setDate(date.getDate() + 1)) {
      for (let theatre of theatres) {
        for (let movie of movies) {
          for (let showtimeData of showtimesData) {
            const showtimeDate = new Date(date);
            showtimeDate.setDate(showtimeDate.getDate() + showtimeData.dateOffset);
            const time = showtimeData.time;
            
            await Showtime.create({
              time,
              date: showtimeDate,
              movieid: movie.id,
              theatreid: theatre.id,
            });
          }
        }
      }
    }

    console.log('Database has been populated!');
  } catch (error) {
    console.error('Error populating the database:', error);
  }
};

// Call the function to populate the database
populateDB();
