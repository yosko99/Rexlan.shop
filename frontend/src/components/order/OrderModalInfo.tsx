import React, { useContext } from 'react';

import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ASSET_PROXY_URL } from '../../constants/apiRouteConstants';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import getOrderDeliveryHTMLFields from '../../functions/html-fields/getOrderDeliveryHTMLFields';
import getOrderPriceHTMLFields from '../../functions/html-fields/getOrderPriceHTMLFields';
import CenteredItems from '../../styles/CenteredItems';
import { Order } from '../../types/orderTypes';
import { Product } from '../../types/productTypes';
import DataSplitBetween from '../partials/DataSplitBetween';

interface Props {
  order: Order;
}

const OrderModalInfo = ({ order }: Props) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
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
      {order.products.map((product: Product, index: number) => (
        <div className="d-flex justify-content-between my-3" key={index}>
          <CenteredItems>
            <Image
              src={ASSET_PROXY_URL + product.image}
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

      <hr className="mt-4 mb-1"/>

      <div className="d-flex my-2 flex-column flex-lg-row justify-content-between text-uppercase text-muted">
        <p className="m-0">
          {
            lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal
              .shippingAddress
          }
        </p>
        <p className="m-0"></p>
      </div>

      <DataSplitBetween textData={getOrderDeliveryHTMLFields(lang, order)}/>
      <DataSplitBetween
        textData={getOrderPriceHTMLFields(lang, order)}
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
  );
};

export default OrderModalInfo;
