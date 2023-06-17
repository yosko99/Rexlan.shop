import InputStructure from './inputStructure';

export interface CategoryStructure {
  name: string;
  bannerImage: string;
  _id: string;
  categoryURL: string;
  inputs: {
    [key: string]: InputStructure[];
  };
}

export const categoryStructure: CategoryStructure = {
  _id: '',
  name: '',
  bannerImage: '',
  categoryURL: '',
  inputs: {
    en: [
      {
        title: 'Name',
        name: 'name'
      },
      {
        title: 'Banner image URL',
        name: 'bannerImage'
      }
    ],
    bg: [
      {
        title: 'Заглавие',
        name: 'name'
      },
      {
        title: 'URL на банер',
        name: 'bannerImage'
      }
    ],
    es: [
      {
        title: 'Nombre',
        name: 'name'
      },
      {
        title: 'URL de la imagen del banner',
        name: 'bannerImage'
      }
    ]
  }
};
