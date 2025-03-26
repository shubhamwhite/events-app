const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Offer = sequelize.define('Offer', {
  offer_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT, 
    allowNull: false,
  },
  original_price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Offer;
