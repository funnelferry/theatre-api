const express = require('express');
const theatresController = require('../controllers/theatreController');

const router = express.Router();

// Get all theatres
router.get('/theatres', theatresController.getAllTheatres);

module.exports = router;