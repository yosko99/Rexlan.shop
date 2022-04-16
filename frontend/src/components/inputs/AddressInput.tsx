import React from 'react';

import { Form } from 'react-bootstrap';

const AddressInput = () => {
  return (
		<Form.Group className="mb-3" controlId="address">
			<Form.Label>
				Your address
			</Form.Label>
			<Form.Control
				className='rounded-pill'
				pattern='[a-zA-Z0-9]+'
				required type="text"
				placeholder="Enter your address"
			/>
		</Form.Group>
  );
};

export default AddressInput;
