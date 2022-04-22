export interface Product {
	id: string;
	title: string;
	price: number;
	description: number;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	}
}

export interface CartProductType {
  productID: string;
  productQuantity: Number;
}
