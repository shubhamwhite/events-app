const { FAQ } = require('../models/faq.model');

// Get all FAQs
exports.getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.findAll();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single FAQ by ID
exports.getFAQById = async (req, res) => {
    try {
        const faq = await FAQ.findByPk(req.params.id);
        if (!faq) return res.status(404).json({ message: "FAQ not found" });
        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new FAQ
exports.createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newFAQ = await FAQ.create({ question, answer });
        res.status(201).json(newFAQ);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an FAQ
exports.updateFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = await FAQ.findByPk(req.params.id);
        if (!faq) return res.status(404).json({ message: "FAQ not found" });

        faq.question = question;
        faq.answer = answer;
        await faq.save();

        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an FAQ
exports.deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByPk(req.params.id);
        if (!faq) return res.status(404).json({ message: "FAQ not found" });

        await faq.destroy();
        res.status(200).json({ message: "FAQ deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
