const FeatureEvent = require('../models/featureEvent.model');
const  base  = require('../constant/general');

exports.updateFeatureEvent = async (req, res) => {
  const { id, title, description, dateTime, location } = req.body;

  try {
    const baseUrl = `${base.baseUrl}/uploads`;

    let event = await FeatureEvent.findByPk(id); // Fetch event by ID

    if (!event) {
      // Create new event if it doesn't exist
      event = await FeatureEvent.create({
        id,
        title,
        description,
        dateTime,
        location,
        image: req.file ? `${baseUrl}/images/${req.file.filename}` : null,
      });

      return res.status(201).json({ message: 'Feature Event created successfully', event });
    }

    // Update existing event
    event.title = title || event.title;
    event.description = description || event.description;
    event.dateTime = dateTime || event.dateTime;
    event.location = location || event.location;
    if (req.file) event.image = `${baseUrl}/images/${req.file.filename}`;

    await event.save();

    res.json({ message: 'Feature Event updated successfully', event });
  } catch (error) {
    console.error('Error updating/creating Feature Event:', error);
    res.status(500).json({ message: 'Error updating/creating Feature Event', error: error.message });
  }
};


exports.createEvent = async (req, res) => {
  try {
    const { title, description, dateTime, location } = req.body;

    if (!title || !dateTime || !location) {
      return res.status(400).json({ message: 'Title, dateTime, and location are required!' });
    }

     const baseUrl = `${base.baseUrl}/uploads`

    const newEvent = await FeatureEvent.create({
      title,
      description,
      dateTime,
      location,
      image: req.file ? `${baseUrl}/images/${req.file.filename}` : null,
    });

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};


exports.getAllEvents = async (req, res) => {
  try {
    const events = await FeatureEvent.findAll(); // Fetch all events
    res.status(200).json({ message: 'Events retrieved successfully', events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await FeatureEvent.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.destroy(); // Delete event
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};
