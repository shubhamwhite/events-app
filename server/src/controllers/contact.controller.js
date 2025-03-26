const Contact = require("../models/contact.model");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    if (!name || !email || !message || !phone) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = await Contact.create({ name, email, message, phone });
    res.status(201).json({ message: "Contact saved!", data: newContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all contacts (GET)
exports.getContact = async (req, res) => {
  try {  
    const contacts = await Contact.findAll();
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};