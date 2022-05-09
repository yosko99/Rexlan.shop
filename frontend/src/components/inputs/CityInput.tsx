import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';

const CityInput = () => {
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
			<Form.Label>
				City
			</Form.Label>
			<Form.Control
				name='city'
				className='shadow-sm'
				pattern='[\w\s]+'
				required type="text"
				defaultValue={currentCity}
				placeholder="New York"
			/>
			<Form.Text className="text-muted">
				By allowing 'current location' we will populate this value for you.
			</Form.Text>
		</Form.Group>
  );
};

export default CityInput;
