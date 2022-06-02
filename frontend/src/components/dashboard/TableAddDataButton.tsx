import React, { FC } from 'react';

import { useQueryClient } from 'react-query';

import CustomInput from '../inputs/CustomInput';
import CustomModal from '../modal/CustomModal';
import FormTemplate from '../templates/FormTemplate';

interface Props {
    dataStructure: any;
    createDataRoute: string;
}

const TableAddDataButton: FC<Props> = ({ createDataRoute, dataStructure }) => {
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
                                Object.keys(dataStructure).map((property: any, index: number) => (
                                  property !== '_id' &&
                                    <CustomInput
                                        key={index}
                                        defaultValue={dataStructure[property]}
                                        inputLabel={property}
                                        inputName={property}
                                        isNumber={typeof dataStructure[property] === 'number'}
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
