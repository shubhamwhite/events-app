const express = require("express");
const upload = require("../middlewares/gallery");
const { createEvent, getAllEvents, updateEvent, deleteEvent } = require("../controllers/gallery.controller");

const router = express.Router();

router.post("/dashboard/gallery/create", upload, createEvent);
router.get("/dashboard/gallery/get", getAllEvents);
router.put("/dashboard/gallery/update/:id", upload, updateEvent);
router.delete("/dashboard/gallery/delete/:id", deleteEvent);

module.exports = router;
