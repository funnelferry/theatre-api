const { DataTypes } = require('sequelize');
const {sequelize, connectDatabase} = require('../configs/db');

const Showtime = sequelize.define('Showtime', {
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

module.exports = Showtime;
