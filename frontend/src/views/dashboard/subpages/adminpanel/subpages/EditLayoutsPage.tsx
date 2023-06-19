/* eslint-disable multiline-ternary */
import React, { useContext } from 'react';

import axios from 'axios';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import EditDataTable from '../../../../../components/dashboard/EditDataTable';
import DeleteDataIcon from '../../../../../components/icons/dashboard/DeleteDataIcon';
import EditDataIcon from '../../../../../components/icons/dashboard/EditDataIcon';
import Loading from '../../../../../components/loading/Loading';
import { LayoutContext } from '../../../../../context/LayoutContext';
import { layoutStructure } from '../../../../../data/inputStructure/layoutStructure';
import useFetch from '../../../../../hooks/useFetch';
import {
  getLayoutRoute,
  getLayoutsRoute,
} from '../../../../../services/apiRoutes';
import { ILayout } from '../../../../../types/layoutType';

const EditLayoutsPage = () => {
  const { isLoading, data: layouts } = useFetch(
    'allLayouts',
    getLayoutsRoute(),
    true
  );
  const { setLayout, layout: currentLayout } = useContext(LayoutContext);

  const handleActivate = (id: string) => {
    axios.get(getLayoutRoute(id)).then((response) => {
      const layout = response.data as ILayout;

      setLayout(layout);
    });
  };

  return (
    <div>
      <p className="fs-3 my-3">Edit layouts</p>
      <p>Here you can edit layouts</p>
      <Link to="/layout" className="fs-5" target="_blank">
        Open layout
      </Link>
      <hr />
      {isLoading ? (
        <Loading />
      ) : (
        <EditDataTable
          createDataRoute={getLayoutsRoute()}
          inputStructure={layoutStructure.inputs}
          tableHeaderCells={
            <>
              <th>Image</th>
              <th>Title</th>
              <th>Activate</th>
            </>
          }
          tableRowCells={
            <>
              {layouts.map((layout: ILayout, index: number) => (
                <tr key={index}>
                  <td>
                    <Image src={layout.logoURL} width={50} />
                  </td>
                  <td>{layout.title}</td>
                  <td>
                    <Button
                      onClick={() => handleActivate(layout._id)}
                      disabled={layout._id === currentLayout._id}
                    >
                      Activate
                    </Button>
                  </td>
                  <td>
                    <EditDataIcon
                      queryKey={`layout-${layout._id}`}
                      apiRoute={getLayoutRoute(layout._id)}
                      inputStructure={layoutStructure.inputs}
                    />
                  </td>
                  <td>
                    <DeleteDataIcon
                      apiRoute={getLayoutRoute(layout._id)}
                      queryKey={'layout-' + layout._id}
                    />
                  </td>
                </tr>
              ))}
            </>
          }
        />
      )}
    </div>
  );
};

export default EditLayoutsPage;
