/* eslint-disable multiline-ternary */
import React, { useContext } from 'react';

import { Image } from 'react-bootstrap';

import noOrdersImg from '../../../assets/dashboard/orders/no-orders.svg';
import OrdersTable from '../../../components/cart/OrdersTable';
import Loading from '../../../components/loading/Loading';
import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import useFetch from '../../../hooks/useFetch';
import { getUserOrdersRoute } from '../../../services/apiRoutes';
import CenteredItems from '../../../styles/CenteredItems';
import { Order } from '../../../types/orderTypes';

const MyOrdersPage = () => {
  const { lang } = useContext(CurrentLanguageContext);
  const cartID = localStorage.getItem('cart') as string;

  const { data, error, isLoading } = useFetch(
    'orders',
    getUserOrdersRoute(cartID),
    true
  );

  const orders = data as Order[];

  if (isLoading) {
    return <Loading height="60vh" />;
  }

  if (error !== undefined) {
    window.location.href = '/404';
  }

  return (
    <div>
      <p className="fs-3 my-3">{lang.dashboard.tabs.myOrders.header.title}</p>
      <p>{lang.dashboard.tabs.myOrders.header.subtitle}</p>
      <hr />
      {orders.length === 0 ? (
        <CenteredItems flexColumn>
          <Image src={noOrdersImg} alt="No orders" />
          <p className="fs-5">{lang.dashboard.tabs.myOrders.noOrders}</p>
        </CenteredItems>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
};

export default MyOrdersPage;
