import InfoBarData from './infotBarTypes';

interface HeadingType {
  title: string;
  subtitle: string;
  secondSubtitle?: string;
}

interface FormInputType {
  label: string;
  placeholder: string;
  inputText?: string;
  inputAlert?: string;
}

interface HTMLFields {
  current: string;
  toasts: {
    favoriteProductButton: {
      productAddedToFavorites: string;
      productRemoveFromFavorites: string;
    }
    removeProductFromCartButton: {
      productRemovedFromCart: string;
    }
    review: {
      reviewAdded: string;
      reviewAlreadyCreated: string;
    }
  };
  global: {
    findOutMore: string;
    categories: string;
    contacts: string;
    pricing: string;
    settings: string;
    orders: string;
    help: string;
    products: string;
    submit: string;
    discount: string;
    deliveries: string;
    delivery: string;
    free: string;
    addToCart: string;
    outOf: string;
    users: string;
    close: string;
    hello: string;
    subtotal: string;
    total: string;
    name: string;
    city: string;
    address: string;
    zipcode: string;
    phone: string;
  };
  pdp: {
    inStock: string;
    relatedProducts: string;
    addToCartModal: {
      header: string;
      productID: string;
      addedQuantity: string;
      continueShopping: string;
      finishThePurchase: string;
    };
  };
  header: {
    homeButton: string;
    languageSwitcherButton: string;
    contactsButton: string;
    loginButton: string;
    logoutButton: string;
    profileButton: string;
    favouritesButton: string;
    cartButton: string;
    noCategories: string;
  };
  searchBar: {
    buttonText: string;
    titleText: string;
    inputfieldPlaceholder: string;
    productNotFound: string;
  };
  mainPage: {
    infoBar: InfoBarData[];
    featuredProductsHeading: HeadingType;
    summerCollectionHeading: HeadingType;
    bestSellersHeading: HeadingType;
    homegrownHeading: HeadingType;
  };
  footer: {
    usefullLinks: string;
    getConnected: string;
    copyright: string;
  };
  loginPage: {
    heading: HeadingType;
    dontHaveAccount: string;
    signUpForFree: string;
    rembemberMe: string;
    resetPassword: string;
  };
  registerPage: {
    heading: HeadingType;
    providedDataIsUsedFor: string;
  };
  resetPasswordPage: {
    heading: HeadingType;
    backToLogin: string;
  };
  inputs: {
    email: FormInputType;
    password: FormInputType;
    name: FormInputType;
    address: FormInputType;
    phone: FormInputType;
    city: FormInputType;
    postalCode: FormInputType;
    delivery: FormInputType;
  };
  cart: {
    emptyCart: string;
    addProductsToCart: string;
    header: string;
    orderBox: {
      header: string;
      total: string;
      removeProduct: string;
    };
    deliveryBox: {
      selectedCourier: string;
      initialPriceOfDelivery: string;
      deliveryToOffice: string;
      deliverToAddress: string;
    };
    paymentPage: {
      toPay: string;
      developmentWarning: string;
      choosePayment: string;
      payPalNotSet: string;
    };
    successfulPaymentPage: {
      paymentID: string;
      createTime: string;
      email: string;
      status: string;
      currentCurrency: string;
      amountPayed: string;
      description: string;
      title: string;
    };
  };
  favouritesPage: {
    header: string;
  };
  freeShippingBarText: string;
  contactsPage: {
    contactUs: string;
    hereToHelp: string;
    callUs: HeadingType;
    chatWithUs: HeadingType;
    askQuestion: HeadingType;
    lookingForSomeone: string;
    tryOurStaffDirectory: string;
    forMediaQueries: string;
    regionalMediaContacts: string;
  };
  dashboard: {
    myAccount: string;
    navigationButtons: {
      myDetails: string;
      passwordChange: string;
      myOrders: string;
      adminPanel: string;
    };
    tabs: {
      myDetails: {
        header: HeadingType;
        lastProfileUpdate: string;
      };
      passwordChange: {
        header: HeadingType;
        enterOldPassword: string;
        enterNewPassword: string;
      };
      myOrders: {
        header: HeadingType;
        noOrders: string;
        ordersTable: {
          header: {
            order: string;
            date: string;
            status: string;
            total: string;
          };
          viewOrderModal: {
            activateButtonText: string;
            header: string;
            orderedProducts: string;
            billingInfo: string;
            shippingAddress: string;
            ifYouNeedHelp: string;
          };
        };
      };
      adminPanel: {
        header: HeadingType;
        editProducts: {
          header: HeadingType;
          editProductsTableCols: {
            imageCol: string;
            titleCol: string;
          };
        };
        editDeliveries: {
          header: HeadingType;
          editDeliveriesTableCols: {
            imageCol: string;
            titleCol: string;
          };
        };
        editCategories: {
          header: HeadingType;
          editCategoriesTableCols: {
            bannerImageCol: string;
            nameCol: string;
          };
        };
        editUsers: {
          header: HeadingType;
          editUsersTable: {
            emailCol: string;
            nameCol: string;
          };
        };
        editDataTable: {
          addDataBtn: string;
          editDataBtn: string;
          deleteDataBtn: string;
          deleteDataPrompt: string;
        };
      };
    };
  };
}

export default HTMLFields;
