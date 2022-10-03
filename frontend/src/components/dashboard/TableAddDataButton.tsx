import React, { FC } from 'react';

import { useQueryClient } from 'react-query';

import InputStructure from '../../data/inputStructure/inputStructure';
import CategoriesSelect from '../inputs/CategoriesSelect';
import CustomInput from '../inputs/CustomInput';
import CustomModal from '../modal/CustomModal';
import FormTemplate from '../templates/FormTemplate';

interface Props {
    inputStructure: InputStructure[];
    createDataRoute: string;
}

const TableAddDataButton: FC<Props> = ({ createDataRoute, inputStructure }) => {
  const queryClient = useQueryClient();

  return (
        <CustomModal
            activateButtonText='Add data'
            modalHeader={'Add data'}
            modalBody={
                <FormTemplate
                    inputs={
                        <>
                            {
                                inputStructure.map((input: InputStructure, index: number) => (
                                  input.isDropdown
                                    ? <CategoriesSelect key={index} />
                                    : <CustomInput
                                        key={index}
                                        inputLabel={input.title}
                                        inputName={input.name}
                                        isNumber={input.isNumber || false}
                                        pattern={input.pattern}
                                    />
                                ))
                            }
                        </>}
                    mutateURL={createDataRoute}
                    redirectOnSuccess={false}
                    onSuccessFn={() => queryClient.refetchQueries()}
                />}
            activateButtonClassName="w-100 mb-3 btn-info"
        />
  );
};

export default TableAddDataButton;
