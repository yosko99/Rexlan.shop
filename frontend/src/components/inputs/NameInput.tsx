import React, { FC } from 'react';

import { Form } from 'react-bootstrap';

interface Props {
	defaultValue?: string;
}

const NameInput: FC<Props> = ({ defaultValue = '' }) => {
  return (
		<Form.Group className="mb-3" controlId="name">
			<Form.Label>
				Name
			</Form.Label>
			<Form.Control
				name='name'
				className='shadow-sm'
				pattern='[a-zA-Zа-яА-Я\s]+'
				required type="text"
				placeholder="Steven Wilson"
				defaultValue={defaultValue}
			/>
		</Form.Group>
  );
};

export default NameInput;
