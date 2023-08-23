import React, { FC, useContext } from 'react';

import { Form } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
  defaultValue?: string;
  readOnly?: boolean;
}

const EmailInput: FC<Props> = ({ defaultValue = '', readOnly = false }) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <Form.Group className="mb-3" controlId="email">
      <Form.Label>{lang.inputs.email.label}</Form.Label>
      <Form.Control
        name="email"
        className="shadow-sm"
        readOnly={readOnly}
        defaultValue={defaultValue}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        required
        type="email"
        placeholder={lang.inputs.email.placeholder}
      />
      <Form.Text className="text-muted">
        {lang.inputs.email.inputText}
      </Form.Text>
      <Form.Control.Feedback type="invalid">
        {lang.inputs.email.inputAlert}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default EmailInput;
