const { DataTypes } = require('sequelize');
const {sequelize, connectDatabase} = require('../configs/db');

const Showtime = sequelize.define('Showtime', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  seats: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Array of seat numbers (e.g., ["A1", "A2", "B1", "B2", "C1", "C2"])
    defaultValue: ["A1", "A2", "B1", "B2", "C1", "C2"], // Default all seats available
  },
  bookedSeats: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Array of seat numbers (e.g., ["A1", "A2"])
    defaultValue: [], // Initially no seats booked
  },
});

module.exports = Showtime;
