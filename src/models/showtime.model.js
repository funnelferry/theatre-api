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
    allowNull: false
  }
});

module.exports = Showtime;
