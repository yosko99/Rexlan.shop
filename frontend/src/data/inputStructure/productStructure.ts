import InputStructure from './inputStructure';

export interface ProductStructure {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
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
        name: 'image',
        isFile: true
      },
      {
        title: 'Category',
        name: 'category',
        isCategoryDropdown: true
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
        name: 'image',
        isFile: true
      },
      {
        title: 'Категория',
        name: 'category',
        isCategoryDropdown: true
      }
    ],
    es: [
      {
        title: 'Título',
        name: 'title'
      },
      {
        title: 'Precio',
        name: 'price',
        isNumber: true
      },
      {
        title: 'Descripción',
        name: 'description'
      },
      {
        title: 'URL de la imagen',
        name: 'image',
        isFile: true
      },
      {
        title: 'Categoría',
        name: 'category',
        isCategoryDropdown: true
      }
    ]
  }
};
