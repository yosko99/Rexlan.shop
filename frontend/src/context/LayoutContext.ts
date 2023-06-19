import { createContext } from 'react';

import { ILayout } from '../types/layoutType';

interface LayoutType {
  layout: ILayout;
  setLayout: (layout: ILayout) => void;
}

export const LayoutContext = createContext<LayoutType>({
  layout: {
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
  },
  setLayout: () => {},
});
