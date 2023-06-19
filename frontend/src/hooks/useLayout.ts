import { useState } from 'react';

import { ILayout } from '../types/layoutType';

const useLayout = () => {
  const getLayout = () => {
    const layoutString = localStorage.getItem('layout');
    if (layoutString !== null) {
      return JSON.parse(layoutString);
    }

    return {
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
    };
  };

  const [layout, setLayout] = useState(getLayout());

  const saveLayout = (layout: ILayout) => {
    if (layout === null) {
      localStorage.removeItem('layout');
    } else {
      localStorage.setItem('layout', JSON.stringify(layout));
      setLayout(JSON.stringify(layout));
    }
    setLayout(getLayout());
  };

  return {
    setLayout: saveLayout,
    layout,
  };
};

export default useLayout;
