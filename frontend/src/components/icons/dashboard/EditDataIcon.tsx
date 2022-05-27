import React, { FC } from 'react';

import { Button } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom';

import useFetch from '../../../hooks/useFetch';
import CustomInput from '../../inputs/CustomInput';
import Loading from '../../loading/Loading';
import CustomModal from '../../modal/CustomModal';
import FormTemplate from '../../templates/FormTemplate';

interface Props {
  dataID: string;
  apiRoute: string;
  queryKey: string;
}

const EditDataIcon: FC<Props> = ({ dataID, apiRoute, queryKey }) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: fetchedData,
    error,
    refetch
  } = useFetch(queryKey, apiRoute + '/' + dataID, false);

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
                        Object.keys(fetchedData).map((property: any, index: number) => (
                          typeof fetchedData[property] !== 'object' &&
                          <CustomInput
                            key={index}
                            defaultValue={fetchedData[property]}
                            inputLabel={property}
                            inputName={property}
                          />
                        ))
                      }
                    </>
                  }
                  mutateURL={apiRoute + '/' + dataID}
                  updateRequest
                  redirectOnSuccess={false}
                  onSuccessFn={() => queryClient.refetchQueries()}
                />
              }
            </>
        }
        modalHeader={<p className='mb-0'>Edit data</p>}
        modalFooter={<Button variant="primary">Close</Button>}
      />
    </>
  );
};

export default EditDataIcon;