const Theatre = require('./theatre.model');
const Movie = require('./movie.model');
const Showtime = require('./showtime.model');
const sequelize = require('../configs/db').sequelize;

const associations = () => {
    Movie.hasMany(Showtime, { foreignKey: "movieid" });
    Theatre.hasMany(Showtime, { foreignKey: "theatreid" });
    Showtime.belongsTo(Movie, { foreignKey: "movieid" });
    Showtime.belongsTo(Theatre, { foreignKey: "theatreid" });

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


