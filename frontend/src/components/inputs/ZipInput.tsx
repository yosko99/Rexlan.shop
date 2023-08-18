import React, { FC, useContext } from 'react';

import { Form } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
  defaultValue?: string;
}

const ZipInput: FC<Props> = ({ defaultValue = '' }) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <Form.Group className="mb-3" controlId="zipcode">
      <Form.Label>{lang.inputs.postalCode.label}</Form.Label>
      <Form.Control
        name="zipcode"
        className="shadow-sm"
        pattern="\d{4,}"
        required
        type="text"
        defaultValue={defaultValue}
        placeholder={lang.inputs.postalCode.placeholder}
      />
    </Form.Group>
  );
};

export default ZipInput;
