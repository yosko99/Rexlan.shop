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
