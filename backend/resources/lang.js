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
        coordinatesNotProvided: 'Coordinates not provided',
        invalidCoordinates: 'Invalid coordinates'
      },
      user: {
        userDeleted: 'User successfully deleted.',
        passwordUpdated: 'Password updated successfully',
        passwordMismatch: 'Password does not match registered email.',
        userWithEmailAlreadyExists: 'User with this email already exists.',
        accountCreated: 'Your account has been successfully created.',
        loggedIn: 'You Have Successfully Logged in.',
        checkMailForPassword: 'You can check your email for a new password.',
        couldNotFindEmail: 'We could not find your email.',
        userWithEmailDoesNotExist: 'User with this email does not exist.'
      }
    }
  },
  bg: {
    global: {
      noProductID: 'Не е предоставен ID на продукта',
      category: 'Категория',
      created: 'Създаден',
      removed: 'Премахнат',
      product: 'Продукт',
      deleted: 'Изтрит',
      updated: 'Обновен',
      noData: 'Няма данни',
      account: 'Акаунт',
      data: 'Данни',
      apiKeyNotProvided: 'Няма предоставен API ключ',
      noDataWithProvidedID: 'Не можахме да намериме данни с предоставения ID',
      noDataWithProvidedCategory: 'Не можахме да намерим данни с предоставената категория',
      dataDeleted: 'Данните бяха успешно изтрити.',
      couldNotFindData: 'Не можахме да намерим данни'
    },
    controllers: {
      cart: {
        invalidCartID: 'Невалиден ID на количка',
        noItemsInCart: 'Няма продукти в количката'
      },
      category: {
        nameAlreadyExists: 'Категория с предоставеното име вече съществува.'
      },
      openWeather: {
        coordinatesNotProvided: 'Няма предоставени координати',
        invalidCoordinates: 'Невалидни координати'
      },
      user: {
        userDeleted: 'Потребителят е успешно изтрит.',
        passwordUpdated: 'Паролата е обновна успешно',
        passwordMismatch: 'Паролата не съответства на регистрирания имейл.',
        userWithEmailAlreadyExists: 'Потребител с предоставения имейл вече съществува.',
        accountCreated: 'Вашият акаунт беше успешно създаден.',
        loggedIn: 'Вие успешно влязохте.',
        checkMailForPassword: 'Можете да проверите вашият имейл за нова парола.',
        couldNotFindEmail: 'Не можахме да намерим вашият имейл.',
        userWithEmailDoesNotExist: 'Потребител с предоставения имейл не съществува.'
      }
    }
  }
};

module.exports = lang;
