const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faq.controller');

router.get('/', faqController.getAllFAQs);
router.get('/:id', faqController.getFAQById);
router.post('/', faqController.createFAQ);
router.put('/:id', faqController.updateFAQ);
router.delete('/:id', faqController.deleteFAQ);

module.exports = router;
