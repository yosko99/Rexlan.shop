import React, { FC, useContext } from 'react';

import { Form } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
	defaultValue?: string;
}

const NameInput: FC<Props> = ({ defaultValue = '' }) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
		<Form.Group className="mb-3" controlId="name">
			<Form.Label>{lang.inputs.name.label}</Form.Label>
			<Form.Control
				name='name'
				className='shadow-sm'
				pattern='[a-zA-Zа-яА-Я\s]+'
				required type="text"
				placeholder={lang.inputs.name.placeholder}
				defaultValue={defaultValue}
			/>
		</Form.Group>
  );
};

export default NameInput;
