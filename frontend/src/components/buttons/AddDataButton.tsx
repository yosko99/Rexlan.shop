/* eslint-disable multiline-ternary */
import React, { FC, useContext } from 'react';

import { useQueryClient } from 'react-query';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import InputStructure from '../../data/inputStructure/inputStructure';
import InputsRenderer from '../inputs/InputsRenderer';
import FormTemplate from '../templates/FormTemplate';
import CustomModal from '../utils/CustomModal';

interface Props {
  inputStructure: InputStructure[];
  createDataRoute: string;
  sendFormData: boolean;
}

const AddDataButton: FC<Props> = ({
  createDataRoute,
  inputStructure,
  sendFormData
}) => {
  const queryClient = useQueryClient();
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <CustomModal
      activateButtonText={
        lang.dashboard.tabs.adminPanel.editDataTable.addDataBtn
      }
      modalHeader={lang.dashboard.tabs.adminPanel.editDataTable.addDataBtn}
      modalBody={
        <FormTemplate
          sendFormData={sendFormData}
          inputs={
            <InputsRenderer inputStructure={inputStructure}/>
          }
          mutateURL={createDataRoute}
          onSuccessFn={() => queryClient.refetchQueries()}
        />
      }
      activateButtonClassName="w-100 mb-3 btn-info"
    />
  );
};

export default AddDataButton;
