import InputStructure from './inputStructure';

export interface ProductStructure {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  categoryURL: string;
  inputs: {
    [key: string]: InputStructure[];
  };
}

export const productStructure: ProductStructure = {
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
  categoryURL: '',
  inputs: {
    en: [
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
    ],
    bg: [
      {
        title: 'Заглавие',
        name: 'title'
      },
      {
        title: 'Цена',
        name: 'price',
        isNumber: true
      },
      {
        title: 'Описание',
        name: 'description'
      },
      {
        title: 'URL на изображение',
        name: 'image'
      },
      {
        title: 'Категория',
        name: 'category',
        isDropdown: true
      }
    ]
  }
};
