export interface MultilanguageFieldType {
  [key: string]: {
    global: {
      noProductID: string;
      category: string;
      created: string;
      removed: string;
      product: string;
      deleted: string;
      updated: string;
      noData: string;
      account: string;
      data: string;
      apiKeyNotProvided: string;
      noDataWithProvidedID: string;
      noDataWithProvidedCategory: string;
      dataDeleted: string;
      dataUpdated: string;
      couldNotFindData: string;
    };
    controllers: {
      cart: {
        invalidCartID: string;
        noItemsInCart: string;
        cartDeleted: string;
      };
      category: {
        nameAlreadyExists: string;
        categoryUpdated: string;
        categoryCreated: string;
      };
      openWeather: {
        coordinatesNotProvided: string;
        invalidCoordinates: string;
      };
      user: {
        userDeleted: string;
        passwordUpdated: string;
        passwordMismatch: string;
        userWithEmailAlreadyExists: string;
        accountCreated: string;
        loggedIn: string;
        checkMailForPassword: string;
        couldNotFindEmail: string;
        userWithEmailDoesNotExist: string;
        userUpdated: string;
        userCreated: string;
      };
      product: {
        productUpdated: string;
        productCreated: string;
      };
      order: {
        orderCreated: string;
        orderDeleted: string;
      };
    };
  };
}
