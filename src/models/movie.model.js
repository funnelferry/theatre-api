const { DataTypes } = require('sequelize');
const {sequelize, connectDatabase} = require('../configs/db');

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
