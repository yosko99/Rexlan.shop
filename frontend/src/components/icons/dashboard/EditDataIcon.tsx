import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';

import InputStructure from '../../../data/inputStructure/inputStructure';
import useFetch from '../../../hooks/useFetch';
import CategoriesSelect from '../../inputs/CategoriesSelect';
import CustomInput from '../../inputs/CustomInput';
import Loading from '../../loading/Loading';
import CustomModal from '../../modal/CustomModal';
import FormTemplate from '../../templates/FormTemplate';

interface Props {
  apiRoute: string;
  queryKey: string;
  inputStructure: InputStructure[];
}

const EditDataIcon: FC<Props> = ({ apiRoute, queryKey, inputStructure }) => {
  const {
    isLoading,
    data: fetchedData,
    error,
    refetch
  } = useFetch(queryKey, apiRoute, false);

  if (error !== undefined) {
    return <Navigate to="/404" state={{ error: error.message }} />;
  }

  const handleClick = () => {
    refetch();
  };

  return (
    <>
      <CustomModal
        activateButtonText='Edit'
        activateButtonOnClick={handleClick}
        modalBody={
          isLoading || fetchedData === undefined
            ? <Loading />
            : <>
              {
                <FormTemplate
                  inputs={
                    <>
                      {
                        inputStructure.map((input: InputStructure, index: number) => (
                          input.isDropdown
                            ? <CategoriesSelect key={index} currentProduct={fetchedData}/>
                            : <CustomInput
                            key={index}
                            inputLabel={input.title}
                            inputName={input.name}
                            defaultValue={fetchedData[input.name]}
                            isNumber={input.isNumber || false}
                            pattern={input.pattern}
                          />
                        ))
                        }
                    </>
                  }
                  mutateURL={apiRoute}
                  updateRequest
                  onSuccessFn={() => refetch()}
                  />
                }
            </>
        }
        modalHeader={<p className='mb-0'>Edit data</p>}
      />
    </>
  );
};

export default EditDataIcon;
