import React, { FC } from 'react';

import { Form } from 'react-bootstrap';

interface Props {
	defaultValue?: string | number | readonly string[] | undefined;
}

const AddressInput: FC<Props> = ({ defaultValue }) => {
  return (
		<Form.Group className="mb-3" controlId="address">
			<Form.Label>
				Your address
			</Form.Label>
			<Form.Control
				name='address'
				className='shadow-sm'
				pattern='[a-zA-Z0-9a-zA-Zа-яА-Я\s]+'
				required type="text"
				placeholder="Main Street 119"
				defaultValue={defaultValue}
			/>
		</Form.Group>
  );
};

export default AddressInput;
