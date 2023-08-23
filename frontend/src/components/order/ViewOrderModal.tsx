/* eslint-disable multiline-ternary */
import React, { FC, useContext } from 'react';

import { Image } from 'react-bootstrap';

import rexlanLogo from '../../assets/header/logo192.png';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import useFetch from '../../hooks/useFetch';
import { getOrderRoute } from '../../services/apiRoutes';
import CenteredItems from '../../styles/CenteredItems';
import { Order } from '../../types/orderTypes';
import Loading from '../loading/Loading';
import CustomModal from '../utils/CustomModal';
import OrderModalInfo from './OrderModalInfo';

interface Props {
  order: Order;
}

const ViewOrderModal: FC<Props> = ({ order }) => {
  const { lang } = useContext(CurrentLanguageContext);
  const {
    data: selectedOrder,
    error,
    isLoading
  } = useFetch(`order-${order.id}`, getOrderRoute(order.id), true);

  if (isLoading) {
    return <Loading height="20px" />;
  }

  if (error !== undefined) {
    window.location.href = '/404';
  }

  return (
    <CustomModal
      activateButtonText={
        lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal
          .activateButtonText
      }
      activateButtonClassName={'btn-success'}
      modalHeader={
        <>
          {selectedOrder !== undefined && (
            <CenteredItems flexColumn>
              <Image src={rexlanLogo} style={{ width: '50px' }} />
              <p className="mt-1 mb-0">Rexlan</p>
              <div
                className="text-center mt-3 text-muted"
                style={{ fontSize: '0.7em' }}
              >
                <p className="m-0">
                  {lang.global.hello} {order.name}
                </p>
                <p className="m-0">
                  {
                    lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal
                      .header
                  }
                </p>
              </div>
            </CenteredItems>
          )}
        </>
      }
      modalBody={
        <div className="d-flex flex-column">
          {isLoading || selectedOrder === undefined ? (
            <Loading />
          ) : (
            <OrderModalInfo order={selectedOrder} />
          )}
        </div>
      }
    />
  );
};

export default ViewOrderModal;
