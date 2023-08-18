import HTMLFields from '../types/htmlFields';
import { Order } from '../types/orderTypes';
import TextDataType from '../types/textDataType';

const getOrderDeliveryHTMLFields = (lang: HTMLFields, order: Order) => {
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

  return orderDeliveryHTMLFields;
};

export default getOrderDeliveryHTMLFields;
