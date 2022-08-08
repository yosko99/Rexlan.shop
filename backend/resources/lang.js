const lang = {
  en: {
    global: {
      noProductID: 'No product ID provided',
      category: 'Category',
      created: 'Created',
      removed: 'Removed',
      product: 'Product',
      deleted: 'Deleted',
      updated: 'Updated',
      noData: 'No data',
      account: 'Account',
      data: 'Data',
      apiKeyNotProvided: 'API key not provided',
      noDataWithProvidedID: 'Could not find data with provided ID',
      noDataWithProvidedCategory: 'Could not find data with provided category',
      dataDeleted: 'Data successfully deleted.',
      couldNotFindData: 'Could not find data'
    },
    controllers: {
      cart: {
        invalidCartID: 'Invalid cart ID',
        noItemsInCart: 'No items in cart'
      },
      category: {
        nameAlreadyExists: 'Category with provided name already exists.'
      },
      openWeather: {
        coordinatedNotProvided: 'Coordinates not provided',
        invalidCoordinated: 'Invalid coordinates'
      },
      user: {
        userDeleted: 'User successfully deleted.',
        passwordUpdated: 'Password updated successfully',
        passwordMismatch: 'Password does not match registered email.',
        userWithEmailElreadyExists: 'User with this email already exists.',
        accountCreated: 'Your account has been successfully created.',
        loggedIn: 'You Have Successfully Logged in.',
        checkMailForPassword: 'You can check your email for a new password.',
        couldNotFindEmail: 'We could not find your email.'
      }
    }
  },
  bg: {

  }
};

export default lang;
