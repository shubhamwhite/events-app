const express = require('express');
const heroRoutes = require('./hero.routes'); // Import hero routes
const featureRoutes = require('./feature.routes'); // Import feature routes
const service = require('./service.routes')
const gallery = require('./gallery.routes'); // Import gallery routes
const router = express.Router();
const contact = require('./contact.routes');

// Use hero routes

router.use(contact);
router.use(heroRoutes);
router.use(featureRoutes);
router.use(service);
router.use(gallery);

module.exports = router;
