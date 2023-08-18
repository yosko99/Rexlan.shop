import HTMLFields from '../types/htmlFields';
import { Order } from '../types/orderTypes';
import TextDataType from '../types/textDataType';

const getOrderPriceHTMLFields = (lang: HTMLFields, order: Order) => {
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
      data:
        (order.productsPrice + order.deliveryPrice).toFixed(2).toString() + ' $'
    }
  ];

  return orderPriceHTMLFields;
};

export default getOrderPriceHTMLFields;
