import React, { useContext } from 'react';

import { Image } from 'react-bootstrap';

import EditDataTable from '../../../../../components/dashboard/EditDataTable';
import DeleteDataIcon from '../../../../../components/icons/dashboard/DeleteDataIcon';
import EditDataIcon from '../../../../../components/icons/dashboard/EditDataIcon';
import Loading from '../../../../../components/loading/Loading';
import { ASSET_PROXY_URL } from '../../../../../constants/apiRouteConstants';
import { CurrentLanguageContext } from '../../../../../context/CurrentLanguageContext';
import { deliveryStructure } from '../../../../../data/inputStructure/deliveryStructure';
import useFetch from '../../../../../hooks/useFetch';
import Delivery from '../../../../../interfaces/delivery';
import { getDeliveriesRoute, getDeliveryRoute } from '../../../../../services/apiRoutes';

const EditDeliveriesPage = () => {
  const {
    isLoading,
    data
  } = useFetch(
    'allDeliveries',
    getDeliveriesRoute(),
    true
  );

  const deliveries = data as Delivery[];
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <div>
      <p className="fs-3 my-3">
        {lang.dashboard.tabs.adminPanel.editDeliveries.header.title}
      </p>
      <p>{lang.dashboard.tabs.adminPanel.editDeliveries.header.subtitle}</p>
      <hr/>
      {isLoading
        ? (
          <Loading/>
          )
        : (
          <EditDataTable
            sendFormData
            createDataRoute={getDeliveriesRoute()}
            inputStructure={deliveryStructure.inputs[lang.current]}
            tableHeaderCells={
              <>
                <th>
                  {
                    lang.dashboard.tabs.adminPanel.editDeliveries
                      .editDeliveriesTableCols.imageCol
                  }
                </th>
                <th>
                  {
                    lang.dashboard.tabs.adminPanel.editDeliveries
                      .editDeliveriesTableCols.titleCol
                  }
                </th>
              </>
            }
            tableRowCells={
              <>
                {deliveries.map((delivery: Delivery) => (
                  <tr key={delivery.id}>
                    <td>
                      <Image src={ASSET_PROXY_URL + delivery.image} width={50}/>
                    </td>
                    <td>{delivery.title}</td>
                    <td>
                      <EditDataIcon
                        sendFormData
                        queryKey={`delivery-${delivery.id}`}
                        apiRoute={getDeliveryRoute(delivery.id)}
                        inputStructure={deliveryStructure.inputs[lang.current]}
                      />
                    </td>
                    <td>
                      <DeleteDataIcon
                        apiRoute={getDeliveryRoute(delivery.id)}
                        queryKey={'delivery-' + delivery.id}
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
export default EditDeliveriesPage;
