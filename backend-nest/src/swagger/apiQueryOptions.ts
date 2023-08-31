import Language from '../enums/supportedLanguages.enum';

export const currentLangQuery = {
  name: 'lang',
  schema: {
    type: 'string',
    enum: Object.values(Language),
  },
  required: false,
  description: 'Selected language',
};

export const quantityQuery = {
  type: Number,
  name: 'qty',
  description: 'Number of products',
  required: false,
};

export const productIdsQuery = {
  type: String,
  name: 'ids',
  description: 'Product ids',
  required: false,
};
