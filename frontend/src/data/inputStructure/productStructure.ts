import InputStructure from './inputStructure';

export interface ProductStructure {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  categoryURL: string;
  inputs: InputStructure[];
}

export const productStructure: ProductStructure = {
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
  categoryURL: '',
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
      title: 'Image URL',
      name: 'image'
    },
    {
      title: 'Category',
      name: 'category',
      isDropdown: true
    }
  ]
};
