import { Product } from './productTypes';

export interface OrderData {
  phone: string;
  address: string;
  name: string;
  city: string;
  zipcode: string;
  delivery: string;
}

export interface DefaultValues {
  phone: string;
  address: string;
  name: string;
  zipcode: string;
}

type OrderStatusType = 'Pending Approval' | 'Processing' | 'Delivered';

export interface OrderProductsType {
  productId: string;
  productQuantity: number;
}

export interface Order {
  id: string;
  userId: string;
  orderStatus: OrderStatusType;
  selectedCourier: string;
  name: string;
  address: string;
  city: string;
  zipcode: number;
  phone: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
  productsPrice: number;
  deliveryPrice: number;
}
