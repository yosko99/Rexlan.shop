/* eslint-disable multiline-ternary */
import React, { FC, useContext } from 'react';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate } from 'react-router-dom';

import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import InputStructure from '../../../data/inputStructure/inputStructure';
import useFetch from '../../../hooks/useFetch';
import CenteredItems from '../../../styles/CenteredItems';
import CategoriesSelect from '../../inputs/CategoriesSelect';
import CustomInput from '../../inputs/CustomInput';
import CustomSwitch from '../../inputs/CustomSwitch';
import Loading from '../../loading/Loading';
import FormTemplate from '../../templates/FormTemplate';
import CustomModal from '../../utils/CustomModal';

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

  const { lang } = useContext(CurrentLanguageContext);

  if (error !== undefined) {
    return <Navigate to="/404" state={{ error: error.message }} />;
  }

  const handleClick = () => {
    refetch();
  };

  return (
    <>
      <CustomModal
        activateButtonText={<FontAwesomeIcon icon={faEdit} />}
        activateButtonOnClick={handleClick}
        modalBody={
          isLoading || fetchedData === undefined ? (
            <Loading />
          ) : (
            <>
              {
                <FormTemplate
                  inputs={
                    <>
                      {inputStructure.map(
                        (input: InputStructure, index: number) =>
                          input.isDropdown ? (
                            <CategoriesSelect
                              key={index}
                              currentProduct={fetchedData}
                            />
                          ) : input.isRadio ? (
                            <CenteredItems key={index} className="fs-5">
                              <CustomSwitch
                                defaultValue={fetchedData[input.name]}
                                label={input.title}
                                name={input.name}
                              />
                            </CenteredItems>
                          ) : (
                            <CustomInput
                              key={index}
                              inputLabel={input.title}
                              inputName={input.name}
                              defaultValue={fetchedData[input.name]}
                              isNumber={input.isNumber || false}
                              pattern={input.pattern}
                            />
                          )
                      )}
                    </>
                  }
                  mutateURL={apiRoute}
                  updateRequest
                  onSuccessFn={() => refetch()}
                />
              }
            </>
          )
        }
        modalHeader={
          <p className="mb-0">
            {lang.dashboard.tabs.adminPanel.editDataTable.editDataBtn}
          </p>
        }
      />
    </>
  );
};

export default EditDataIcon;
