import React from 'react';

import { Form } from 'react-bootstrap';

const CityInput = () => {
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
				placeholder="New York"
			/>
		</Form.Group>
  );
};

export default CityInput;
