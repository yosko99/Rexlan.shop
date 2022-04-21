import React from 'react';

import { Form } from 'react-bootstrap';

const AddressInput = () => {
  return (
		<Form.Group className="mb-3" controlId="address">
			<Form.Label>
				Your address
			</Form.Label>
			<Form.Control
				name='address'
				className='rounded-pill'
				pattern='[a-zA-Z0-9a-zA-Zа-яА-Я\s]+'
				required type="text"
				placeholder="Main Street 119"
			/>
		</Form.Group>
  );
};

export default AddressInput;
