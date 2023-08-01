const { DataTypes } = require('sequelize');
const {sequelize, connectDatabase} = require('../configs/db');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }

},
{
  freezeTableName: true,
  timestamps: false
});

module.exports = Movie;
