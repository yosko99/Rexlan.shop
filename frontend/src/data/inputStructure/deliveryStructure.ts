import InputStructure from './inputStructure';

export interface DeliveryStructure {
  title: string;
  image: string;
  initialPrice: number;
  priceToAddress: number;
  inputs: {
    [key: string]: InputStructure[];
  };
}

export const deliveryStructure: DeliveryStructure = {
  title: '',
  image: '',
  initialPrice: 0,
  priceToAddress: 0,
  inputs: {
    en: [
      {
        title: 'Title',
        name: 'title'
      },
      {
        title: 'Initial price',
        name: 'initialPrice',
        isNumber: true
      },
      {
        title: 'Price to address',
        name: 'priceToAddress',
        isNumber: true
      },
      {
        title: 'Image URL',
        name: 'image'
      }
    ],
    bg: [
      {
        title: 'Заглавие',
        name: 'title'
      },
      {
        title: 'Начална цена',
        name: 'initialPrice',
        isNumber: true
      },
      {
        title: 'Цена до адрес',
        name: 'priceToAddress',
        isNumber: true
      },
      {
        title: 'URL на изображение',
        name: 'image'
      }
    ],
    es: [
      {
        title: 'Título',
        name: 'title'
      },
      {
        title: 'Precio inicial',
        name: 'initialPrice',
        isNumber: true
      },
      {
        title: 'Precio a domicilio',
        name: 'priceToAddress',
        isNumber: true
      },
      {
        title: 'URL de la imagen',
        name: 'image'
      }
    ]
  }
};
