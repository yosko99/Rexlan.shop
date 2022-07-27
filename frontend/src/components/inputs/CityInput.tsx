import React, { useEffect, useState, useContext } from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

const CityInput = () => {
  const { lang } = useContext(CurrentLanguageContext);
  const [currentCity, setCurrentCity] = useState<string>('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
      const { latitude: lat, longitude: lon } = success.coords;
      axios.get(`/api/openweather/city?lon=${lon}&lat=${lat}`).then((response) => {
        const { city } = response.data;
        setCurrentCity(city);
      }).catch((err) => {
        console.log(err.response.data);
      });
    });
  }, []);

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
