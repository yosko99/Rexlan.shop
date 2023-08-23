import React from 'react';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  icon: IconDefinition;
}

const ProductCarouselButton = ({ icon }: Props) => {
  return (
    <div
      role="button"
      className="h-100 d-flex justify-content-center align-items-center"
    >
      <FontAwesomeIcon size={'1x'} icon={icon} className="px-2" />
    </div>
  );
};

export default ProductCarouselButton;
