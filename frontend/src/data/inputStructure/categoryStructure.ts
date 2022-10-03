import InputStructure from './inputStructure';

export interface CategoryStructure {
    name: string;
    bannerImage: string;
    _id: string;
    inputs: InputStructure[];
}

export const categoryStructure: CategoryStructure = {
  _id: '',
  name: '',
  bannerImage: '',
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
