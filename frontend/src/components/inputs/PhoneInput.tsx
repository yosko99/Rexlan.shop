import React, { FC } from 'react';

import { Form } from 'react-bootstrap';

interface Props {
	defaultValue?: string;
}

const PhoneInput: FC<Props> = ({ defaultValue }) => {
  return (
		<Form.Group className="mb-3" controlId="phone">
			<Form.Label>
				Your phone
			</Form.Label>
			<Form.Control
				name='phone'
				className='shadow-sm'
				pattern='\+\d{12}'
				required type="text"
				placeholder="+359123456789"
				defaultValue={defaultValue}
			/>
		</Form.Group>
  );
};

export default PhoneInput;
