import React from 'react';

import { Form } from 'react-bootstrap';

const PasswordInput = () => {
  return (
		<Form.Group className="mb-3" controlId="password">
			<Form.Label>Password <span className='text-muted'>(min 8 chars)</span></Form.Label>
			<Form.Control
				className='shadow-sm'
				required
				type="password"
				name='password'
				placeholder="Password"
				pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$"
			/>
			<Form.Control.Feedback type="invalid">
				Please provide a password that includes
				(At least 1 Uppercase,
				At least 1 Lowercase,
				At least 1 Number,
				At least 1 Symbol symbols allowed !@#$%^&*_=+-)
			</Form.Control.Feedback>
			<Form.Control.Feedback>
				Looks good!
			</Form.Control.Feedback>
		</Form.Group>
  );
};

export default PasswordInput;
