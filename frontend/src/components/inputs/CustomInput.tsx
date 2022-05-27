import React, { FC } from 'react';

import { Form } from 'react-bootstrap';

interface Props {
    defaultValue?: string | number | readonly string[] | undefined;
    inputLabel: string;
    inputName: string;
}

const CustomInput: FC<Props> = ({ defaultValue, inputLabel, inputName }) => {
  return (
        <Form.Group className="mb-3" controlId={inputName}>
            <Form.Label>
                {inputLabel}
            </Form.Label>
            <Form.Control
                name={inputName}
                className='shadow-sm'
                required
                type="text"
                defaultValue={defaultValue}
            />
        </Form.Group>
  );
};

export default CustomInput;
