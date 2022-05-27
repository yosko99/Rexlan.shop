import React, { FC, useState } from 'react';

import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import useFetch from '../../../hooks/useFetch';
import CustomInput from '../../inputs/CustomInput';
import Loading from '../../loading/Loading';
import CustomModal from '../../modal/CustomModal';
import FormTemplate from '../../templates/FormTemplate';

interface Props {
  dataID: string;
  getDataURL: string;
  queryKey: string;
}

const EditDataIcon: FC<Props> = ({ dataID, getDataURL, queryKey }) => {
  const [data, setData] = useState({});

  const {
    isLoading,
    data: fetchedData,
    error,
    refetch
  } = useFetch(queryKey, getDataURL + '/' + dataID, false);

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
                  data={data}
                  setData={setData}
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
                  mutateURL={'asda'}
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
