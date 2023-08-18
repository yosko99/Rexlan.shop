import { Product } from 'src/interfaces/product';

export interface OrderDto {
  name: string;
  address: string;
  phone: string;
  zipcode: string;
  delivery: string;
  city: string;
  deliveryPrice: string;
  products: Product[];
}
