const Service = require("../models/service.model");
const base = require("../constant/general");

exports.updateService = async (req, res) => {
  const { id, title, description } = req.body;

  try {
    const baseUrl = `${base.baseUrl}/uploads`;

    let event = await Service.findByPk(id); // Fetch event by ID

    if (!event) {
      // Create new event if it doesn't exist
      event = await Service.create({
        id,
        title,
        description,
        image: req.file ? `${baseUrl}/images/${req.file.filename}` : null,
      });

      return res
        .status(201)
        .json({ message: "Service created successfully", event });
    }

    // Update existing event
    event.title = title || event.title;
    event.description = description || event.description;
    if (req.file) event.image = `${baseUrl}/images/${req.file.filename}`;

    await event.save();

    res.json({ message: "Service updated successfully", event });
  } catch (error) {
    console.error("Error updating/creating Service:", error);
    res
      .status(500)
      .json({
        message: "Error updating/creating Service",
        error: error.message,
      });
  }
};

exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Title, dateTime, and location are required!" });
    }

    const baseUrl = `${base.baseUrl}/uploads`;

    const newEvent = await Service.create({
      title,
      description,
      image: req.file ? `${baseUrl}/images/${req.file.filename}` : null,
    });

    res
      .status(201)
      .json({ message: "Service created successfully", event: newEvent });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

exports.getAllService = async (req, res) => {
  try {
    const events = await Service.findAll(); // Fetch all events
    res.status(200).json({ message: "Service retrieved successfully", events });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Service.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: "Service not found" });
    }

    await event.destroy(); // Delete event
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
};
