/* eslint-disable multiline-ternary */
import React, { FC } from 'react';

import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import imgNotFoundImg from '../../assets/global/image-not-found.png';
import Loading from '../../components/loading/Loading';
import MultipleProductCards from '../../components/product/MultipleProductCards';
import { ASSET_PROXY_URL } from '../../constants/apiRouteConstants';
import useFetch from '../../hooks/useFetch';
import { getCategoriesRoute } from '../../services/apiRoutes';
import Category from '../../types/categoryType';
import { Product } from '../../types/productTypes';

interface Props {
  isLoading: boolean;
  categoryProducts: Product[];
}

const RenderCategoryProducts: FC<Props> = ({
  isLoading,
  categoryProducts
}) => {
  const { category: categoryURL } = useParams();

  const {
    isLoading: isLoadingCategories,
    data: categories
  } = useFetch(
    'categories',
    getCategoriesRoute(),
    true
  );

  if (isLoadingCategories) {
    return <Loading/>;
  }

  const categoryImg = categories.find(
    (category: Category) => category.title === categoryURL
  ).bannerImage;
  const categoryImgURL = categoryImg === undefined ? imgNotFoundImg : ASSET_PROXY_URL + categoryImg;

  return (
    <Container>
      <div className="text-center">
        <Image
          alt={categoryURL}
          className="shadow mt-3"
          fluid
          src={
            categoryImgURL
          }
        />
        <hr className="my-5"/>
      </div>
      <MultipleProductCards products={categoryProducts} isLoading={isLoading}/>
    </Container>
  );
};

export default RenderCategoryProducts;
