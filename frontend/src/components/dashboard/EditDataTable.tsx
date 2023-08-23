import React, { FC, useContext } from 'react';

import { Table } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import InputStructure from '../../data/inputStructure/inputStructure';
import AddDataButton from '../buttons/AddDataButton';

interface Props {
  tableHeaderCells: React.ReactChild;
  tableRowCells: React.ReactChild;
  inputStructure: InputStructure[];
  createDataRoute: string;
}

const EditDataTable: FC<Props> = ({
  tableHeaderCells,
  tableRowCells,
  inputStructure,
  createDataRoute
}) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <div className="overflow-auto">
      {/* Add data */}
      <AddDataButton
        inputStructure={inputStructure}
        createDataRoute={createDataRoute}
      />
      {/* Add data */}

      {/* Table wtih data */}
      <Table striped bordered hover className="text-center">
        <thead>
          <tr className="text-center">
            {tableHeaderCells}
            <th>{lang.dashboard.tabs.adminPanel.editDataTable.editDataBtn}</th>
            <th>
              {lang.dashboard.tabs.adminPanel.editDataTable.deleteDataBtn}
            </th>
          </tr>
        </thead>
        <tbody>{tableRowCells}</tbody>
      </Table>
      {/* Table wtih data */}
    </div>
  );
};

export default EditDataTable;
