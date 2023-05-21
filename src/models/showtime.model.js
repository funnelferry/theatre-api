const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');

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
