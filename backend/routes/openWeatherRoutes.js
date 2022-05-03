const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const openWeatherController = require('../controllers/openWeatherController');

// @desc Provides the name of current city
// @route POST /api/openweather/city
// @access Public
// @accepts { lon, lat }
router.post('/city', asyncHandler(openWeatherController.getCurrentCity));

module.exports = router;
