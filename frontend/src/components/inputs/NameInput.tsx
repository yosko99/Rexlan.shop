import React from 'react';

import { Form } from 'react-bootstrap';

const NameInput = () => {
  return (
		<Form.Group className="mb-3" controlId="name">
			<Form.Label>
				Name
			</Form.Label>
			<Form.Control
				className='rounded-pill'
				pattern='[a-zA-Z]+'
				required type="text"
				placeholder="Enter name"
			/>
		</Form.Group>
  );
};

export default NameInput;
