const Theatre = require('./theatre.model');
const Movie = require('./movie.model');
const Showtime = require('./showtime.model');
const sequelize = require('../configs/db').sequelize;

const associations = () => {
    Theatre.hasMany(Movie, { foreignKey: 'theatreId' });
    Movie.belongsTo(Theatre, { foreignKey: 'theatreId' });

    Movie.hasMany(Showtime, { foreignKey: 'movieId' });
    Showtime.belongsTo(Movie, { foreignKey: 'movieId' });

    // Run the migrations
    (async () => {
        try {
        await sequelize.sync({ alter: true }); // This will automatically run the migrations
        console.log('Migrations executed successfully.');
        } catch (error) {
        console.error('Error executing migrations:', error);
        }
    })();
}

module.exports = associations;


