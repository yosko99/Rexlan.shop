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
      dataUpdated: 'Data updated successfully',
      couldNotFindData: 'Could not find data'
    },
    controllers: {
      cart: {
        invalidCartID: 'Invalid cart ID',
        noItemsInCart: 'No items in cart',
        cartDeleted: 'The cart was successfully removed.'
      },
      category: {
        nameAlreadyExists: 'Category with provided name already exists.',
        categoryUpdated: 'The category was updated',
        categoryCreated: 'The category was created'
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
        userWithEmailDoesNotExist: 'User with this email does not exist.',
        userUpdated: 'The user was updated',
        userCreated: 'The user was created'
      },
      product: {
        productUpdated: 'The product was updated',
        productCreated: 'The product was created'
      },
      order: {
        orderCreated: 'Your order was created successfully, now you can wait for phone or email comfirmation from our team.',
        orderDeleted: 'The order was successfully removed.'
      }
    }
  },
  bg: {
    global: {
      noProductID: 'Не е предоставен ID на продукта',
      category: 'Категорията',
      created: 'Създаден',
      removed: 'Премахнат',
      product: 'Продукт',
      deleted: 'Изтрит',
      updated: 'Обновена',
      noData: 'Няма данни',
      account: 'Акаунт',
      data: 'Данни',
      apiKeyNotProvided: 'Няма предоставен API ключ',
      noDataWithProvidedID: 'Не можахме да намериме данни с предоставения ID',
      noDataWithProvidedCategory: 'Не можахме да намерим данни с предоставената категория',
      dataDeleted: 'Данните бяха успешно изтрити.',
      dataUpdated: 'Данните бяха успешно обновени',
      couldNotFindData: 'Не можахме да намерим данни'
    },
    controllers: {
      cart: {
        invalidCartID: 'Невалиден ID на количка',
        noItemsInCart: 'Няма продукти в количката',
        cartDeleted: 'Количката беше изтрита успешно'
      },
      category: {
        nameAlreadyExists: 'Категория с предоставеното име вече съществува.',
        categoryUpdated: 'Категория е обновена',
        categoryCreated: 'Категорията е създадена'
      },
      openWeather: {
        coordinatesNotProvided: 'Няма предоставени координати',
        invalidCoordinates: 'Невалидни координати'
      },
      user: {
        userDeleted: 'Потребителят е успешно изтрит.',
        passwordUpdated: 'Паролата е обновена успешно',
        passwordMismatch: 'Паролата не съответства на регистрирания имейл.',
        userWithEmailAlreadyExists: 'Потребител с предоставения имейл вече съществува.',
        accountCreated: 'Вашият акаунт беше успешно създаден.',
        loggedIn: 'Вие успешно влязохте.',
        checkMailForPassword: 'Можете да проверите вашият имейл за нова парола.',
        couldNotFindEmail: 'Не можахме да намерим вашият имейл.',
        userWithEmailDoesNotExist: 'Потребител с предоставения имейл не съществува.',
        userUpdated: 'Данните на потребителя са обновени',
        userCreated: 'Потребителя е създаден'
      },
      product: {
        productUpdated: 'Продуктът е обновен',
        productCreated: 'Продуктът е създаден'
      },
      order: {
        orderCreated: 'Вашата поръчка е създадена успешно, сега можете да изчакате потвърждение по телефона или имейл от нашия екип.',
        orderDeleted: 'Поръчката беше изтрита успешно.'
      }
    }
  }
};

module.exports = lang;
