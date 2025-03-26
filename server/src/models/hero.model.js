const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const hero = sequelize.define('Hero', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  motto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video: {
    type: DataTypes.STRING, // Video file path
  },
  image1: {
    type: DataTypes.STRING, // First image file path
  },
  image2: {
    type: DataTypes.STRING, // Second image file path
  },
});

module.exports = hero;
