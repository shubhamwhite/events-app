require('dotenv').config(); // Load .env variables

const config = {
  development: {
    db: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }, 
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  production: {
    db: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    port: process.env.PORT || 80,
    nodeEnv: process.env.NODE_ENV || 'production',
  },
};

module.exports = config[process.env.NODE_ENV || 'development'];