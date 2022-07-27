import React, { FC, useContext } from 'react';

import HTMLReactParser from 'html-react-parser';
import { Form } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
	className?: string;
	customInputName?: string;
}

const PasswordInput: FC<Props> = ({ className, customInputName = 'password' }) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
		<Form.Group className="mb-3" controlId={customInputName}>
			<Form.Label>{HTMLReactParser(lang.inputs.password.label)}</Form.Label>
			<Form.Control
				className='shadow-sm'
				required
				type="password"
				name={customInputName}
				placeholder={lang.inputs.password.placeholder}
				pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$"
			/>
			<Form.Control.Feedback type="invalid">{lang.inputs.password.inputAlert}</Form.Control.Feedback>
		</Form.Group>
  );
};

export default PasswordInput;
