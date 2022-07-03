import inputStructure from './inputStructure';

export interface ProductStructure {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    inputs: inputStructure[];
}

export const productStructure: ProductStructure = {
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
  inputs: [
    {
      title: 'Title',
      name: 'title'
    },
    {
      title: 'Price',
      name: 'price',
      isNumber: true
    },
    {
      title: 'Description',
      name: 'description'
    },
    {
      title: 'Category',
      name: 'category'
    },
    {
      title: 'Image URL',
      name: 'image'
    }
  ]
};
