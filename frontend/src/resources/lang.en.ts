import { faCircleDollarToSlot, faClock, faLock, faTruck } from '@fortawesome/free-solid-svg-icons';

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
    outOf: 'out of'
  },
  pdp: {
    inStock: 'In stock - pickup or order via courier',
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
    productNotFound: 'Sorry we couldn\'t find any matches for'
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
      subtitle: 'We love all of our beautiful brands here at Rexlan but there is a special place in our heart for the Bulgarian brands. We have made it easy for you to find a little about each of these amazing brands. Head over to our Homegrown page where we give you a little insight into what makes each of these brands so special.'
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
    dontHaveAccount: 'Don\'t have an account?',
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
      subtitle: 'We will send a temporary password to your email so you can login 😄.'
    },
    backToLogin: 'Back to login'
  },
  inputs: {
    email: {
      label: 'Email address',
      placeholder: 'steven@gmail.com',
      inputAlert: 'Please provide a valid email format.',
      inputText: 'We\'ll never share your email with anyone else.'
    },
    password: {
      label: 'Password <span className=\'text-muted\'>(min 8 chars)</span>',
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
      placeholder: '+12345678910'
    },
    city: {
      label: 'City',
      placeholder: 'Amsterdam',
      inputText: 'By allowing \'current location\' we will populate this value for you.'
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
    emptyCart: 'I\'m empty :(',
    header: 'Shopping cart',
    orderBox: {
      total: 'Total',
      header: 'Your order',
      removeProduct: 'Remove product'
    },
    deliveryBox: {
      initialPriceOfDelivery: 'Initial price of the delivery company',
      selectedCourier: 'Selected courier',
      deliverToAddress: 'Deliver to office',
      deliveryToOffice: 'Deliver to address'
    }
  },
  favouritesPage: {
    header: 'Liked products'
  },
  freeShippingBarText: 'FREE SHIPPING WITH ORDER OVER $99 JUST NOW'
};

export default lang;
