import React, { FC, useContext } from 'react';

import { Form } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
  defaultValue?: string;
}

const PhoneInput: FC<Props> = ({ defaultValue }) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <Form.Group className="mb-3" controlId="phone">
      <Form.Label>{lang.inputs.phone.label}</Form.Label>
      <Form.Control
        name="phone"
        className="shadow-sm"
        pattern="\+\d{11}"
        required
        type="text"
        placeholder={lang.inputs.phone.placeholder}
        defaultValue={defaultValue}
      />
      <Form.Control.Feedback type="invalid">
        {lang.inputs.phone.inputAlert}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default PhoneInput;
