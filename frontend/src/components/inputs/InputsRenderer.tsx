import React from 'react';

import { Form } from 'react-bootstrap';

import InputStructure from '../../data/inputStructure/inputStructure';
import CenteredItems from '../../styles/CenteredItems';
import CategoriesSelect from './CategoriesSelect';
import CustomInput from './CustomInput';
import CustomSwitch from './CustomSwitch';

interface Props {
  inputStructure: InputStructure[];
  fetchedData?: object;
}

const InputsRenderer = ({
  inputStructure,
  fetchedData
}: Props) => {
  return <>
    {
      inputStructure.map((input: InputStructure, index: number) => {
        switch (true) {
          case input.isCategoryDropdown:
            return (
              <CategoriesSelect
                key={index}
                // @ts-ignore
                defaultCategory={fetchedData === undefined ? '' : fetchedData[input.name]}
              />
            );
          case input.isFile:
            return <Form.Group controlId="formFile" key={index} className="mb-3">
              <Form.Label>{input.title}</Form.Label>
              <Form.Control required
                            accept=".png, .jpg, .jpeg" name={input.name}
                            type="file"/>
            </Form.Group>;
          case input.isRadio:
            return (
              <CenteredItems key={index} className="fs-5">
                <CustomSwitch
                  // @ts-ignore
                  defaultValue={fetchedData === undefined ? '' : fetchedData[input.name]}
                  label={input.title}
                  name={input.name}
                />
              </CenteredItems>
            );
          default:
            return (
              <CustomInput
                key={index}
                inputLabel={input.title}
                inputName={input.name}
                // @ts-ignore
                defaultValue={fetchedData === undefined ? '' : fetchedData[input.name]}
                isNumber={input.isNumber || false}
                pattern={input.pattern}
              />
            );
        }
      })
    }
  </>;
};
export default InputsRenderer;
