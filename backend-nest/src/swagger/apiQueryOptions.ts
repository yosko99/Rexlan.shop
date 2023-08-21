import Language from 'src/enums/supportedLanguages.enum';

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