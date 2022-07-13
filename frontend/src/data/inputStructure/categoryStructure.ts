import inputStructure from './inputStructure';

export interface CategoryStructure {
    name: string;
    bannerImage: string;
    _id: string;
    inputs: inputStructure[];
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
