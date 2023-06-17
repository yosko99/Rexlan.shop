import React, { FC, useState } from 'react';

import { Form } from 'react-bootstrap';

interface Props {
  defaultValue: boolean | undefined;
  name: string;
  label: string;
}

const CustomSwitch: FC<Props> = ({ defaultValue, name, label }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <Form.Group>
      <Form.Check
        type="switch"
        onChange={(e) => setValue((prev) => !prev)}
        defaultChecked={defaultValue}
        value={value ? 'on' : 'off'}
        name={name}
        label={label}
      />
    </Form.Group>
  );
};

export default CustomSwitch;
