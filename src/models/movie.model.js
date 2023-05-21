const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Movie;
