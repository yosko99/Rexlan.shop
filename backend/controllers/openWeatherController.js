const axios = require('axios');
require('dotenv').config();

const lang = require('../resources/lang');

exports.getCurrentCity = (req, res) => {
  if (process.env.OPENWEATHER_API_KEY === undefined) {
    return res.status(404).send(
      lang[req.currentLang].global.apiKeyNotProvided
    );
  }

  const { lon, lat } = req.query;

  if (lon === undefined || lat === undefined) {
    return res.status(404).send(
      lang[req.currentLang].controllers.openWeather.coordinatesNotProvided
    );
  }

  axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`)
    .then((response) => {
      const [{ name: city }] = response.data;
      return res.status(200).json({
        city
      });
    }).catch((_err) => {
      return res.status(400).send(
        lang[req.currentLang].controllers.openWeather.invalidCoordinates
      );
    });
};
