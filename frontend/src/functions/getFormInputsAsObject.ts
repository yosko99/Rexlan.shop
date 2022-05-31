import React from 'react';

const getFormInputsAsObject = (formRef: React.RefObject<HTMLFormElement>): object => {
  const inputs = formRef.current!.elements;
  const inputsObject = {};

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].nodeName === 'INPUT') {
      Object.defineProperty(
        inputsObject,
          inputs[i].getAttribute('name') as string,
          { value: inputs[i].getAttribute('value') });
    }
  }

  return inputsObject;
};

export default getFormInputsAsObject;
