export interface UserType {
  email?: string;
  password?: string;
  name: string;
  address: string;
  phone: string;
  cartId?: string;
  zipcode?: string;
  isAdmin?: boolean;
  timeStamps?: Date;
}
