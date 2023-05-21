const { DataTypes } = require('sequelize');
const {sequelize, connectDatabase} = require('../configs/db');

const Theatre = sequelize.define('Theatre', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Theatre;
