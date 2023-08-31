import React from 'react';

const convertFormInputToObject = (
  formRef: React.RefObject<HTMLFormElement> | HTMLFormElement
): object => {
  const inputs = formRef.current!.elements;
  const inputsObject = {};

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].nodeName === 'INPUT' || inputs[i].nodeName === 'SELECT') {
      const inputName = inputs[i].getAttribute('name') as string;

      Object.defineProperty(
        inputsObject,
        inputName,
        {
          value: (inputs[i] as HTMLInputElement).value,
          enumerable: true,
          configurable: true
        }
      );
    }
  }

  return inputsObject;
};

export default convertFormInputToObject;
