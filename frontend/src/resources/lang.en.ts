import {
  faCircleDollarToSlot,
  faClock,
  faLock,
  faTruck
} from '@fortawesome/free-solid-svg-icons';

import HTMLFields from '../types/htmlFields';

const lang: HTMLFields = {
  current: 'en',
  global: {
    findOutMore: 'Find out more',
    categories: 'Categories',
    contacts: 'Contacts',
    help: 'Help',
    orders: 'Orders',
    pricing: 'Pricing',
    settings: 'Settings',
    products: 'Products',
    submit: 'Submit',
    delivery: 'Delivery',
    discount: 'Discount',
    free: 'Free',
    addToCart: 'Add to cart',
    outOf: 'out of',
    users: 'Users',
    close: 'Close',
    hello: 'Hello',
    subtotal: 'Subtotal',
    total: 'Total',
    address: 'Address',
    city: 'City',
    name: 'Name',
    phone: 'Phone',
    zipcode: 'Zipcode'
  },
  pdp: {
    inStock: 'In stock - pickup or order via courier',
    relatedProducts: 'Products you may also like',
    addToCartModal: {
      addedQuantity: 'Added quantity',
      header: 'Product added to cart',
      productID: 'Product ID',
      continueShopping: 'Continue shopping',
      finishThePurchase: 'Finish the purchase'
    }
  },
  header: {
    languageSwitcherButton: 'Language',
    homeButton: 'Home',
    contactsButton: 'Contacts',
    cartButton: 'Cart',
    favouritesButton: 'Favourites',
    loginButton: 'Login',
    logoutButton: 'Log out',
    profileButton: 'Profile',
    noCategories: 'No categories available'
  },
  searchBar: {
    buttonText: 'Search products',
    inputfieldPlaceholder: 'Search',
    titleText: 'Search products',
    productNotFound: "Sorry we couldn't find any matches for"
  },
  mainPage: {
    infoBar: [
      {
        icon: faTruck,
        title: 'Free shipping & return',
        description: 'Free shipping on all orders over 99$'
      },
      {
        icon: faCircleDollarToSlot,
        title: 'Money back guarantee',
        description: '100% money back guarantee'
      },
      {
        icon: faClock,
        title: 'Online support 24/7',
        description: 'Lorem ipsum lorem lorem'
      },
      {
        icon: faLock,
        title: 'Secure payment',
        description: 'Lorem ipsum lorem lorem'
      }
    ],
    bestSellersHeading: {
      title: 'Best Seller Products',
      subtitle: 'Amazing products added recently in our catalog'
    },
    featuredProductsHeading: {
      title: 'Featured Products',
      subtitle: 'Amazing products added recently in our catalog'
    },
    summerCollectionHeading: {
      title: 'Summer Collection',
      subtitle: 'Amazing products added recently in our catalog'
    },
    homegrownHeading: {
      title: 'Homegrown',
      subtitle:
        'We love all of our beautiful brands here at Rexlan but there is a special place in our heart for the Bulgarian brands. We have made it easy for you to find a little about each of these amazing brands. Head over to our Homegrown page where we give you a little insight into what makes each of these brands so special.'
    }
  },
  footer: {
    getConnected: 'Get connected with us on social networks',
    usefullLinks: 'Usefull links',
    copyright: 'Copyright'
  },
  loginPage: {
    heading: {
      title: 'Welcome back !',
      subtitle: 'Please enter your login details.'
    },
    dontHaveAccount: "Don't have an account?",
    signUpForFree: 'Sign up for free!',
    rembemberMe: 'Remember me',
    resetPassword: 'Forgot your password?'
  },
  registerPage: {
    heading: {
      title: 'Register now',
      subtitle: 'Enter your credentials below.'
    },
    providedDataIsUsedFor: 'Provided data will be used for a faster checkout.'
  },
  resetPasswordPage: {
    heading: {
      title: 'Forgot password',
      subtitle:
        'We will send a temporary password to your email so you can login 😄.'
    },
    backToLogin: 'Back to login'
  },
  inputs: {
    email: {
      label: 'Email address',
      placeholder: 'steven@gmail.com',
      inputAlert: 'Please provide a valid email format.',
      inputText: "We'll never share your email with anyone else."
    },
    password: {
      label: "Password <span className='text-muted'>(min 8 chars)</span>",
      placeholder: 'Password',
      inputAlert: `Please provide a password that includes
      (At least 1 Uppercase,
      At least 1 Lowercase,
      At least 1 Number,
      At least 1 Symbol (allowed symbols !@#$%^&*_=+-))`
    },
    name: {
      label: 'Name',
      placeholder: 'Steven Willson'
    },
    address: {
      label: 'Your address',
      placeholder: 'Main Street 119'
    },
    phone: {
      label: 'Your phone',
      placeholder: '+12345678910',
      inputAlert: "The expected format for phone number is '+xxxxxxxxxxxx'"
    },
    city: {
      label: 'City',
      placeholder: 'Amsterdam',
      inputText:
        "By allowing 'current location' we will populate this value for you."
    },
    postalCode: {
      label: 'Postal code',
      placeholder: '1234'
    },
    delivery: {
      label: 'Delivery option',
      placeholder: 'Select a courier'
    }
  },
  cart: {
    addProductsToCart: 'Add products to cart',
    emptyCart: "I'm empty :(",
    header: 'Shopping cart',
    orderBox: {
      total: 'Total',
      header: 'Your order',
      removeProduct: 'Remove product'
    },
    deliveryBox: {
      initialPriceOfDelivery: 'Initial price of the delivery company',
      selectedCourier: 'Selected courier',
      deliverToAddress: 'Deliver to address',
      deliveryToOffice: 'Deliver to office'
    },
    paymentPage: {
      choosePayment: 'Please choose a payment method',
      developmentWarning:
        'Attention! Payment is currently not fully functional. All payments only work with "sandbox" accounts.',
      toPay: 'Payment amount',
      payPalNotSet:
        'Sorry, you can not finish your order right now. PayPal API key could not be found.'
    },
    successfulPaymentPage: {
      createTime: 'Date of creation',
      currentCurrency: 'Currency of transfer',
      description: 'Description',
      email: 'Buyer email',
      paymentID: 'Transaction ID',
      status: 'Status',
      amountPayed: 'Amount paid',
      title: 'Payment successful'
    }
  },
  favouritesPage: {
    header: 'Liked products'
  },
  freeShippingBarText: 'FREE SHIPPING WITH ORDER OVER ',
  contactsPage: {
    contactUs: 'Contact us',
    hereToHelp: 'We are here to help',
    askQuestion: {
      title: 'Ask a question',
      subtitle: 'Fill out our form and we will be back in 24 hours.',
      secondSubtitle: 'Get started'
    },
    callUs: {
      title: 'Call us directly at',
      subtitle: 'We are available Sun 7:00pm EST - Friday 7:00pm EST.',
      secondSubtitle: '+111 1 111 1111'
    },
    chatWithUs: {
      title: 'Chat with our sales team',
      subtitle: 'We are available Sun 7:00pm EST - Friday 7:00pm EST.',
      secondSubtitle: 'Chat now'
    },
    lookingForSomeone: 'Looking for someone you know?',
    tryOurStaffDirectory: 'Try our Staff directory',
    forMediaQueries:
      'For media queries, contact email@email.com or find your regional media contact',
    regionalMediaContacts: 'Regional Media Contacts'
  },
  dashboard: {
    myAccount: 'My account',
    navigationButtons: {
      myDetails: 'My details',
      myOrders: 'My orders',
      passwordChange: 'Password change',
      adminPanel: 'Admin panel'
    },
    tabs: {
      myDetails: {
        header: {
          title: 'My details',
          subtitle: 'Personal information'
        },
        lastProfileUpdate: 'Last profile update'
      },
      passwordChange: {
        header: {
          title: 'Password change',
          subtitle: 'Here you can change your password'
        },
        enterOldPassword: 'Enter old password',
        enterNewPassword: 'Enter new password'
      },
      myOrders: {
        header: {
          title: 'My orders',
          subtitle: 'All your orders are listed below'
        },
        noOrders: "Currently you don't have any created orders.",
        ordersTable: {
          header: {
            date: 'Date',
            order: '# Order',
            status: 'Status',
            total: 'Total'
          },
          viewOrderModal: {
            activateButtonText: 'View',
            header:
              "We've got your order! Your world is about to look a whole lot better. We'll drop you another email when your order ships.",
            orderedProducts: 'Ordered products',
            billingInfo: 'Billing info',
            shippingAddress: 'Shipping address',
            ifYouNeedHelp:
              "If you need help with anything please don't hesitate to drop us an email :)"
          }
        }
      },
      adminPanel: {
        header: {
          title: 'Admin panel',
          subtitle: 'Select which data you want to edit'
        },
        editProducts: {
          header: {
            title: 'Edit products',
            subtitle: 'Here you can add, remove and update products'
          },
          editProductsTableCols: {
            imageCol: 'Image',
            titleCol: 'Title'
          }
        },
        editCategories: {
          header: {
            title: 'Edit categories',
            subtitle: 'Here you can add, remove and update categories',
            secondSubtitle:
              'Deleting a category will remove all products related to it.'
          },
          editCategoriesTableCols: {
            bannerImageCol: 'Banner image',
            nameCol: 'Name'
          }
        },
        editUsers: {
          header: {
            title: 'Edit users',
            subtitle: 'Here you can edit and remove users'
          },
          editUsersTable: {
            emailCol: 'Email',
            nameCol: 'Name'
          }
        },
        editDataTable: {
          addDataBtn: 'Edit data',
          deleteDataBtn: 'Delete',
          editDataBtn: 'Edit',
          deleteDataPrompt: 'Are you sure you want to delete this?'
        }
      }
    }
  }
};

export default lang;
