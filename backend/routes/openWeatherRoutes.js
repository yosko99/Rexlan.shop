const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const openWeatherController = require('../controllers/openWeatherController');

// @desc Provides the name of current city with provided lon and lat
// @route GET /api/openweather/city?lon=123&lat=123
// @access Public
router.get('/city', asyncHandler(openWeatherController.getCurrentCity));

module.exports = router;
