import React, { FC } from 'react';

import { Table } from 'react-bootstrap';

interface Props {
  tableHeaderCells: React.ReactChild;
  tableRowCells: React.ReactChild;
}

const EditDataTable: FC<Props> = ({ tableHeaderCells, tableRowCells }) => {
  return (
    <Table striped bordered hover>
				<thead>
					<tr className='text-center'>
            {tableHeaderCells}
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
          {tableRowCells}
				</tbody>
			</Table>
  );
};

export default EditDataTable;
