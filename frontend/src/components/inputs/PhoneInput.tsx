import React from 'react';

import { Form } from 'react-bootstrap';

const PhoneInput = () => {
  return (
		<Form.Group className="mb-3" controlId="phone">
			<Form.Label>
				Your phone
			</Form.Label>
			<Form.Control
				name='phone'
				className='rounded-pill'
				pattern='\+\d{12}'
				required type="text"
				placeholder="+359123456789"
			/>
		</Form.Group>
  );
};

export default PhoneInput;
