const express = require('express');
const upload = require('../middlewares/uploads');
const { updateService, createService, getAllService, deleteService } = require('../controllers/service.controller');
const router = express.Router();

router.put('/dashboard/service/update', upload.single('image'), updateService);
router.post('/dashboard/service/create', upload.single('image'), createService);
router.get('/dashboard/service/get', getAllService);
router.delete('/dashboard/service/delete/:id', deleteService);

module.exports = router;