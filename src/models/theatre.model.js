const { DataTypes } = require('sequelize');
const {sequelize, connectDatabase} = require('../configs/db');

const Theatre = sequelize.define('Theatre', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  freezeTableName: true,
  timestamps: false
});

module.exports = Theatre;
