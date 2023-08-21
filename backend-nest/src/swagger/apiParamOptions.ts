import ProductSortAttribute from 'src/enums/productAttribute.enum';

export const productSortParam = {
  name: 'attribute',
  schema: {
    type: 'string',
    enum: Object.values(ProductSortAttribute),
  },
  required: true,
  description: 'Sort attribute',
};
