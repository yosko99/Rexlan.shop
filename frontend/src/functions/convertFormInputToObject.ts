import React from 'react';

const convertFormInputToObject = (
  formRef: React.RefObject<HTMLFormElement>
): object => {
  const inputs = formRef.current!.elements;
  const inputsObject = {};

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].nodeName === 'INPUT' || inputs[i].nodeName === 'SELECT') {
      Object.defineProperty(
        inputsObject,
        inputs[i].getAttribute('name') as string,
        {
          value: (inputs[i] as HTMLInputElement).value,
          enumerable: true
        }
      );
    }
  }

  return inputsObject;
};

export default convertFormInputToObject;
