const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const FeatureEvent = sequelize.define('FeatureEvent', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Image file path
  },
});

module.exports = FeatureEvent;