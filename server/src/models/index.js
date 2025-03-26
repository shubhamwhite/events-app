const { Sequelize } = require('sequelize');
const config = require('../config'); // Import environment-specific config

// Create Sequelize instance for database connection
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'mysql',
    logging: config.nodeEnv === 'development' ? console.log : false,
  }
);

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

module.exports = sequelize;
