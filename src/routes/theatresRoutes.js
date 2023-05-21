const express = require('express');
const theatresController = require('../controllers/theatresController');

const router = express.Router();

// Get all theatres
router.get('/theatres', theatresController.getAllTheatres);

module.exports = router;