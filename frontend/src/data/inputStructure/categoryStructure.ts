import InputStructure from './inputStructure';

export interface CategoryStructure {
    name: string;
    bannerImage: string;
    _id: string;
    categoryURL: string;
    inputs: InputStructure[];
}

export const categoryStructure: CategoryStructure = {
  _id: '',
  name: '',
  bannerImage: '',
  categoryURL: '',
  inputs: [
    {
      title: 'Name',
      name: 'name'
    },
    {
      title: 'Banner image URL',
      name: 'bannerImage'
    }
  ]
};
