const express = require('express');
const path = require('path');
const config = require('./src/config');
const sequelize = require('./src/models');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

// Serve static files (e.g., uploaded images and videos)
app.use('/uploads', express.static(path.join(__dirname, './src/uploads')));

// Item routes
app.use('/api/v1', require('./src/routes'));

// Start the server after syncing the database
sequelize.sync({ alter: true }).then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  });
}).catch(err => console.error('Error starting server:', err));
