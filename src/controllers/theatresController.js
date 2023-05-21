const Theatre = require('../models/theatre.model');

// Get all theatres
exports.getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.findAll();
    res.json(theatres);
  } catch (error) {
    console.error('Error fetching theatres:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
