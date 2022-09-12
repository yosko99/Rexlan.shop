import React, { useEffect, useState, useContext, FC } from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { getOpenWeatherCityRoute } from '../../hooks/apiRoutes';

const RUSE_LAT = 43.8;
const RUSE_LON = 25.9;

interface Coordinates {
  lon: number;
  lat: number;
}
interface Props {
  coordinates: Coordinates;
}

const CityInput = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: RUSE_LAT,
    lon: RUSE_LON
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
      const { latitude: lat, longitude: lon } = success.coords;

      setCoordinates({
        lon,
        lat
      });
    });
  }, []);

  return (
    <CityInputHTML coordinates={coordinates} />
  );
};

const CityInputHTML: FC<Props> = ({ coordinates }) => {
  const { lang } = useContext(CurrentLanguageContext);
  const [currentCity, setCurrentCity] = useState<string>('');
  const openWeatherRoute = getOpenWeatherCityRoute(coordinates.lon, coordinates.lat);

  useEffect(() => {
    axios.get(openWeatherRoute).then((response) => {
      const { city } = response.data;
      setCurrentCity(city);
    }).catch((err) => {
      console.log(err.response.data);
    });
  }, [openWeatherRoute]);

  return (
    <Form.Group className="mb-3" controlId="city">
      <Form.Label>{lang.inputs.city.label}</Form.Label>
      <Form.Control
        name='city'
        className='shadow-sm'
        pattern='[\w\s]+'
        required type="text"
        defaultValue={currentCity}
        placeholder={lang.inputs.city.placeholder}
      />
      <Form.Text className="text-muted">{lang.inputs.city.inputText}</Form.Text>
    </Form.Group>
  );
};

export default CityInput;
