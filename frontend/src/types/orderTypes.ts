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

interface OrderProductsType {
	productID: string;
	productQuantity: number;
}

export interface OrderType {
	userID: string;
	cartID: string;
	orderStatus: OrderStatusType;
	selectedCourier: string;
	name: string;
	address: string;
	city: string;
	zipcode: number;
	phone: string;
	products: OrderProductsType[];
	createdAt: Date;
	updatedAt: Date;
	productsPrice: number;
	deliveryPrice: number;
}
