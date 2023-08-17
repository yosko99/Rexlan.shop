import InputStructure from './inputStructure';

export interface CategoryStructure {
  title: string;
  id: string;
  bannerImage: string;
  inputs: {
    [key: string]: InputStructure[];
  };
}

export const categoryStructure: CategoryStructure = {
  id: '',
  title: '',
  bannerImage: '',
  inputs: {
    en: [
      {
        title: 'Name',
        name: 'title'
      },
      {
        title: 'Banner image URL',
        name: 'bannerImage'
      }
    ],
    bg: [
      {
        title: 'Заглавие',
        name: 'title'
      },
      {
        title: 'URL на банер',
        name: 'bannerImage'
      }
    ],
    es: [
      {
        title: 'Nombre',
        name: 'title'
      },
      {
        title: 'URL de la imagen del banner',
        name: 'bannerImage'
      }
    ]
  }
};
