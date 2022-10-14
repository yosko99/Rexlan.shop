import React, { FC, useContext } from 'react';

import { Form } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
	defaultValue?: string | number | readonly string[] | undefined;
}

const AddressInput: FC<Props> = ({ defaultValue }) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
		<Form.Group className="mb-3" controlId="address">
			<Form.Label>{lang.inputs.address.label}</Form.Label>
			<Form.Control
				name='address'
				className='shadow-sm'
				pattern='[a-zA-Z0-9a-zA-Zа-яА-Я\s\-\.]+'
				required type="text"
				placeholder={lang.inputs.address.placeholder}
				defaultValue={defaultValue}
			/>
		</Form.Group>
  );
};

export default AddressInput;
