import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';

import useFetch from '../../../hooks/useFetch';
import Loading from '../../loading/Loading';
import CustomModal from '../../modal/CustomModal';

interface Props {
	dataID: string;
	getDataURL: string;
	queryKey: string;
}

const EditDataIcon: FC<Props> = ({ dataID, getDataURL, queryKey }) => {
  const {
    isLoading,
    data,
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
					isLoading || data === undefined
					  ? <Loading />
					  : <>
              {
                Object.keys(data).map((property: any, index: number) => (
                  typeof data[property] !== 'object' && <input defaultValue={data[property]}/>
                  // <p key={index}>{property} -{typeof data[property] !== 'object' && data[property]}</p>
                ))
              }
            </>
				}
				modalHeader={<h1>Edit product</h1>}
				modalFooter={<h1>asdasd</h1>}
			/>
		</>
  );
};

export default EditDataIcon;
