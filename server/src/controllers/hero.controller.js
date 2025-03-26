const Hero = require('../models/hero.model');
const base = require('../constant/general');
// Update or create an item
exports.updateHero = async (req, res) => {
  const { name, description, motto } = req.body;

  try {
   
    let item = await Hero.findByPk(1);

    const baseUrl = `${base.baseUrl}/uploads`;

    if (!item) {
      item = await Hero.create({
        id: 1, 
        name,
        description,
        motto,
        video: req.files['video'] ? `${baseUrl}/videos/${req.files['video'][0].filename}` : null,
        image1: req.files['image1'] ? `${baseUrl}/images/${req.files['image1'][0].filename}` : null,
        image2: req.files['image2'] ? `${baseUrl}/images/${req.files['image2'][0].filename}` : null,
      });

      return res.status(201).json({ message: 'Hero section created successfully', item });
    }

    // Update existing item (id = 1)
    item.name = name || item.name;
    item.description = description || item.description;
    item.motto = motto || item.motto;

    // Update video and image files
    if (req.files['video']) item.video = `${baseUrl}/videos/${req.files['video'][0].filename}`;
    if (req.files['image1']) item.image1 = `${baseUrl}/images/${req.files['image1'][0].filename}`;
    if (req.files['image2']) item.image2 = `${baseUrl}/images/${req.files['image2'][0].filename}`;

    // Save updated item
    await item.save();

    res.json({ message: 'Hero section updated successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Error updating/creating item', error });
  }
};


exports.getHero = async (req, res) => {

  try {
    // Find the item by name
    const item = await Hero.findAll();

    if (!item) {
      return res.status(404).json({ message: 'Hero section not found' });
    }

    res.json({ message: 'Hero section retrieved successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hero section', error });
  }
};
