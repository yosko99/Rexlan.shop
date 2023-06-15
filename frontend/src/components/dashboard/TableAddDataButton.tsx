/* eslint-disable multiline-ternary */
import React, { FC, useContext } from 'react';

import { useQueryClient } from 'react-query';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import InputStructure from '../../data/inputStructure/inputStructure';
import CenteredItems from '../../styles/CenteredItems';
import CategoriesSelect from '../inputs/CategoriesSelect';
import CustomInput from '../inputs/CustomInput';
import CustomSwitch from '../inputs/CustomSwitch';
import CustomModal from '../modal/CustomModal';
import FormTemplate from '../templates/FormTemplate';

interface Props {
  inputStructure: InputStructure[];
  createDataRoute: string;
}

const TableAddDataButton: FC<Props> = ({ createDataRoute, inputStructure }) => {
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
          inputs={
            <>
              {inputStructure.map((input: InputStructure, index: number) =>
                input.isDropdown ? (
                  <CategoriesSelect key={index} />
                ) : input.isRadio ? (
                  <CenteredItems key={index} className="fs-5">
                    <CustomSwitch
                      defaultValue={false}
                      label={input.title}
                      name={input.name}
                    />
                  </CenteredItems>
                ) : (
                  <CustomInput
                    key={index}
                    inputLabel={input.title}
                    inputName={input.name}
                    isNumber={input.isNumber || false}
                    pattern={input.pattern}
                  />
                )
              )}
            </>
          }
          mutateURL={createDataRoute}
          onSuccessFn={() => queryClient.refetchQueries()}
        />
      }
      activateButtonClassName="w-100 mb-3 btn-info"
    />
  );
};

export default TableAddDataButton;
