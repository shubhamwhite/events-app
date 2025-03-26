const EventGallery = require("../models/gallery.model");
const  base  = require('../constant/general');
// 🟢 CREATE Event
exports.createEvent = async (req, res) => {
  try {
    const { title } = req.body;
    const images = req.files.images || [];
    const video = req.files.video ? req.files.video[0].filename : null;

    if (images.length > 4) {
      return res.status(400).json({ message: "Cannot upload more than 4 images!" });
    }

    // Define base URL dynamically
    const baseUrl = `${base.baseUrl}`;

    const newEvent = await EventGallery.create({
      title,
      image1: images[0] ? `${baseUrl}/uploads/images/${images[0].filename}` : null,
      image2: images[1] ? `${baseUrl}/uploads/images/${images[1].filename}` : null,
      image3: images[2] ? `${baseUrl}/uploads/images/${images[2].filename}` : null,
      image4: images[3] ? `${baseUrl}/uploads/images/${images[3].filename}` : null,
      video: video ? `${baseUrl}/uploads/videos/${video}` : null,
    });

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 🔵 GET All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await EventGallery.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟡 UPDATE Event
// 🟡 UPDATE Event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const images = req.files.images || [];
    const video = req.files.video ? req.files.video[0].filename : null;

    const event = await EventGallery.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event not found!" }); 

    // Define base URL dynamically 
    const baseUrl = `${base.baseUrl}`;

    event.title = title || event.title;
    if (images[0]) event.image1 = `${baseUrl}/uploads/images/${images[0].filename}`;
    if (images[1]) event.image2 = `${baseUrl}/uploads/images/${images[1].filename}`;
    if (images[2]) event.image3 = `${baseUrl}/uploads/images/${images[2].filename}`;
    if (images[3]) event.image4 = `${baseUrl}/uploads/images/${images[3].filename}`;
    if (video) event.video = `${baseUrl}/uploads/videos/${video}`;

    await event.save();
    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔴 DELETE Event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventGallery.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event not found!" });

    await event.destroy();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
