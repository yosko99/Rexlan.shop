interface Delivery {
  id: string;
  title: string;
  initialPrice: number;
  priceToAddress: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Delivery;
