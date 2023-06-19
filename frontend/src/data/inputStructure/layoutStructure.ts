import InputStructure from './inputStructure';

export interface LayoutStructure {
  title: string;
  footerDescription: string;
  logoURL: string;
  thumbnailURL1: string;
  thumbnailURL2?: string;
  thumbnailURL3?: string;
  grid1URL: string;
  grid2URL: string;
  grid3URL: string;
  infoBarTitle: string;
  infoBarDescription: string;
  homegrownFieldTopImage: string;
  homegrownFieldRightImage: string;
  homegrownFieldTitle: string;
  homegrownFieldDescription: string;
  sponsorsURL: string;
  _id: string;
  inputs: InputStructure[];
}

export const layoutStructure: LayoutStructure = {
  title: '',
  footerDescription: '',
  logoURL: '',
  thumbnailURL1: '',
  thumbnailURL2: '',
  thumbnailURL3: '',
  grid1URL: '',
  grid2URL: '',
  grid3URL: '',
  infoBarTitle: '',
  infoBarDescription: '',
  homegrownFieldTopImage: '',
  homegrownFieldRightImage: '',
  homegrownFieldTitle: '',
  homegrownFieldDescription: '',
  sponsorsURL: '',
  _id: '',
  inputs: [
    {
      title: 'Title',
      name: 'title',
    },
    {
      title: 'Footer description',
      name: 'footerDescription',
    },
    {
      title: 'Logo URL',
      name: 'logoURL',
    },
    {
      title: 'Thumbnail URL 1',
      name: 'thumbnailURL1',
    },
    {
      title: 'Thumbnail URL 2',
      name: 'thumbnailURL2',
    },
    {
      title: 'Thumbnail URL 3',
      name: 'thumbnailURL3',
    },
    {
      title: 'Grid image URL 1',
      name: 'grid1URL',
    },
    {
      title: 'Grid image URL 2',
      name: 'grid2URL',
    },
    {
      title: 'Grid image URL 3',
      name: 'grid3URL',
    },
    {
      title: 'Info bar title',
      name: 'infoBarTitle',
    },
    {
      title: 'Info bar description',
      name: 'infoBarDescription',
    },
    {
      title: 'Homegrown field top image URL',
      name: 'homegrownFieldTopImage',
    },
    {
      title: 'Homegrown field right image URL',
      name: 'homegrownFieldRightImage',
    },
    {
      title: 'Homegrown field title',
      name: 'homegrownFieldTitle',
    },
    {
      title: 'Homegrown field description',
      name: 'homegrownFieldDescription',
    },
    {
      title: 'Sponsor image URL',
      name: 'sponsorsURL',
    },
  ],
};
