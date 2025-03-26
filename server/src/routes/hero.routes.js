const express = require('express');
const upload = require('../middlewares/uploads');
const { updateHero, getHero } = require('../controllers/hero.controller');
const router = express.Router();

// Update item without ID in the URL
router.put('/dashboard/hero/update', upload.fields([{ name: 'video' }, { name: 'image1' }, { name: 'image2' }]), updateHero);
router.get('/dashboard/hero/get', getHero);

module.exports = router;
