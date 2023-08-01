const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');
const Movie = require('./movie.model'); // Import the Movie model
const Theatre = require('./theatre.model'); // Import the Theatre model

const Showtime = sequelize.define('Showtime', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  seats: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ["A1", "A2", "B1", "B2", "C1", "C2"],
  },
  bookedseats: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

// Associations
Showtime.belongsTo(Movie, { foreignKey: 'movieid' });
Showtime.belongsTo(Theatre, { foreignKey: 'theatreid' });

module.exports = Showtime;
