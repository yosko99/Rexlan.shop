import React, { FC, useContext } from 'react';

import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import rexlanLogo from '../../assets/header/logo192.png';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import useMultipleFetch from '../../hooks/useMultipleFetch';
import { getProductRoute } from '../../services/apiRoutes';
import CenteredItems from '../../styles/CenteredItems';
import { OrderType } from '../../types/orderTypes';
import { Product } from '../../types/productTypes';
import TextDataType from '../../types/textDataType';
import Loading from '../loading/Loading';
import CustomModal from '../modal/CustomModal';
import DataSplitBetween from '../partials/DataSplitBetween';

interface Props {
  order: OrderType;
}

interface OrderProductsType {
  productID: string;
  productQuantity: number;
}

const ViewOrderModal: FC<Props> = ({ order }) => {
  const { lang } = useContext(CurrentLanguageContext);

  const productData = order.products.map((product: OrderProductsType) => {
    return {
      queryKey: `product-${product.productID}`,
      link: getProductRoute(product.productID)
    };
  });

  const orderPriceHTMLFields: TextDataType[] = [
    {
      text: lang.global.discount,
      data: '0 $'
    },
    {
      text: lang.global.subtotal,
      data: order.productsPrice.toString() + ' $'
    },
    {
      text: lang.global.delivery,
      data: order.deliveryPrice.toString() + ' $'
    },
    {
      text: lang.global.total,
      data: (order.productsPrice + order.deliveryPrice).toFixed(2).toString() + ' $'
    }
  ];

  const orderDeliveryHTMLFields: TextDataType[] = [
    {
      text: lang.global.name,
      data: order.name
    },
    {
      text: lang.global.city,
      data: order.city
    },
    {
      text: lang.global.address,
      data: order.address
    },
    {
      text: lang.global.zipcode,
      data: order.zipcode.toString()
    },
    {
      text: lang.global.phone,
      data: order.phone
    }
  ];

  const { data: products, error, isLoading } = useMultipleFetch(productData);

  if (isLoading) {
    return <Loading height='20px'/>;
  }

  if (error !== undefined) {
    window.location.href = '/404';
  }

  return (
    <CustomModal
      activateButtonText={lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal.activateButtonText}
      activateButtonClassName={'btn-success'}
      modalHeader={
        <CenteredItems flexColumn>
          <Image src={rexlanLogo} style={{ width: '50px' }} />
          <p className='mt-1 mb-0'>Rexlan</p>
          <div className='text-center mt-3 text-muted' style={{ fontSize: '0.7em' }}>
            <p className='m-0'>{lang.global.hello} {order.name}</p>
            <p className='m-0'>{lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal.header}</p>
          </div>
        </CenteredItems>
      }
      modalBody={
        <div className='d-flex flex-column'>
          <p className='text-center fs-5'>
            {lang.dashboard.tabs.myOrders.ordersTable.header.order} : {order.cartID.substring(order.cartID.length, order.cartID.length - 4)}
          </p>

          <p className='text-muted text-uppercase'>{lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal.orderedProducts}</p>

          {products.map((product: Product, index: number) => (
            <div className='d-flex justify-content-between my-3' key={index}>
              <CenteredItems>
                <Image src={product.image} style={{ width: '50px' }} fluid alt={product.title} />
                <Link className='text-black' to={`/${product.category}/product/${product.id}`}>
                  <p className='ms-3'>{product.title}</p>
                </Link>
              </CenteredItems>
              <CenteredItems className='text-nowrap'>
                <p className='me-3 ms-2'>{order.products.map((orderProduct) => {
                  return orderProduct.productID === product.id && 'x ' + orderProduct.productQuantity;
                })}</p>
                <p>{product.price} $</p>
              </CenteredItems>
            </div>
          ))}

          <hr className='mt-4 mb-1' />

          <div className='d-flex my-2 flex-column flex-lg-row justify-content-between text-uppercase text-muted'>
            <p className='m-0'>{lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal.shippingAddress}</p>
            <p className='m-0'></p>
          </div>

          <DataSplitBetween textData={orderDeliveryHTMLFields} />
          <DataSplitBetween textData={orderPriceHTMLFields} className={'my-3'} />

          <div className='text-center mt-3 text-muted'>
            <p>{lang.dashboard.tabs.myOrders.ordersTable.viewOrderModal.ifYouNeedHelp}</p>
          </div>
        </div>}
    />
  );
};

export default ViewOrderModal;
