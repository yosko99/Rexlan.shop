import React, { FC, useContext } from 'react';

import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import rexlanLogo from '../../assets/header/logo192.png';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import getOrderDeliveryHTMLFields from '../../functions/getOrderDeliveryHTMLFields';
import getOrderPriceHTMLFields from '../../functions/getOrderPriceHTMLFields';
import useFetch from '../../hooks/useFetch';
import { getOrderRoute } from '../../services/apiRoutes';
import CenteredItems from '../../styles/CenteredItems';
import { Order } from '../../types/orderTypes';
import { Product } from '../../types/productTypes';
import Loading from '../loading/Loading';
import CustomModal from '../modal/CustomModal';
import DataSplitBetween from '../partials/DataSplitBetween';

interface Props {
  order: Order;
}

const ViewOrderModal: FC<Props> = ({ order }) => {
  const { lang } = useContext(CurrentLanguageContext);
  const { data, error, isLoading } = useFetch(
    `order-${order.id}`,
    getOrderRoute(order.id),
    true
  );

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
          {data !== undefined && (
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
          {data !== undefined && (
            <>
              <p className="text-center fs-5">
                {lang.dashboard.tabs.myOrders.ordersTable.header.order} :{' '}
                {order.id.substring(order.id.length, order.id.length - 4)}
              </p>

              <p className="text-muted text-uppercase">
                {
                  lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal
                    .orderedProducts
                }
              </p>
              {data.products.map((product: Product, index: number) => (
                <div
                  className="d-flex justify-content-between my-3"
                  key={index}
                >
                  <CenteredItems>
                    <Image
                      src={product.image}
                      style={{ width: '50px' }}
                      fluid
                      alt={product.title}
                    />
                    <Link
                      className="text-black"
                      to={`/${product.category}/product/${product.id}`}
                    >
                      <p className="ms-3">{product.title}</p>
                    </Link>
                  </CenteredItems>
                  <CenteredItems className="text-nowrap">
                    <p>{product.price} $</p>
                    <p className="me-3 ms-2"> x{product.quantity}</p>
                  </CenteredItems>
                </div>
              ))}

              <hr className="mt-4 mb-1" />

              <div className="d-flex my-2 flex-column flex-lg-row justify-content-between text-uppercase text-muted">
                <p className="m-0">
                  {
                    lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal
                      .shippingAddress
                  }
                </p>
                <p className="m-0"></p>
              </div>

              <DataSplitBetween
                textData={getOrderDeliveryHTMLFields(lang, data)}
              />
              <DataSplitBetween
                textData={getOrderPriceHTMLFields(lang, data)}
                className={'my-3'}
              />

              <div className="text-center mt-3 text-muted">
                <p>
                  {
                    lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal
                      .ifYouNeedHelp
                  }
                </p>
              </div>
            </>
          )}
        </div>
      }
    />
  );
};

export default ViewOrderModal;
