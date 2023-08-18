import React, { FC, useContext } from 'react';

import { Table } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { Order } from '../../types/orderTypes';
import ViewOrderModal from './ViewOrderModal';

interface Props {
  orders: Order[];
}

const OrdersTable: FC<Props> = ({ orders }) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <div className="overflow-auto">
      <Table hover>
        <thead>
          <tr>
            <th>{lang.dashboard.tabs.myOrders.ordersTable.header.order}</th>
            <th>{lang.dashboard.tabs.myOrders.ordersTable.header.date}</th>
            <th>{lang.dashboard.tabs.myOrders.ordersTable.header.status}</th>
            <th>{lang.dashboard.tabs.myOrders.ordersTable.header.total}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order, index: number) => (
            <tr key={index}>
              <th>
                {order.id.substring(order.id.length, order.id.length - 4)}
              </th>
              <th>{order.createdAt}</th>
              <th>{order.orderStatus}</th>
              <th>
                {(order.productsPrice + order.deliveryPrice).toFixed(2)} $
              </th>
              <th>
                <ViewOrderModal order={order} />
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersTable;
