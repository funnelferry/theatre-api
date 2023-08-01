const Theatre = require('../models/theatre.model');

// Get all theatres
// Fetch all theatres
const getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.findAll();
    return res.json(theatres);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {getAllTheatres}
