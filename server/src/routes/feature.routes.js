const express = require('express');
const upload = require('../middlewares/uploads');
const { updateFeatureEvent, createEvent, getAllEvents, deleteEvent } = require('../controllers/featureEvent.controller');
const router = express.Router();

// Update item without ID in the URL

router.put('/dashboard/feature-event/update', upload.single('image'), updateFeatureEvent);
router.post('/dashboard/event/create', upload.single('image'), createEvent);
router.get('/dashboard/feature-event/get', getAllEvents);
router.delete('/dashboard/feature-event/delete/:id', deleteEvent);

module.exports = router;