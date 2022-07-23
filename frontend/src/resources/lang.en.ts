import { faCircleDollarToSlot, faClock, faLock, faTruck } from '@fortawesome/free-solid-svg-icons';

import HTMLFields from '../types/htmlFields';

const lang: HTMLFields = {
  header: {
    languageSwitcherButton: 'Language',
    homeButton: 'Home',
    categoriesButton: 'Categories',
    contactsButton: 'Contacts',
    cartButton: 'Cart',
    favouritesButton: 'Favourits',
    loginButton: 'Login',
    logoutButton: 'Log out',
    profileButton: 'Profile'
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
      description: 'Amazing products added recently in our catalog'
    },
    featuredProductsHeading: {
      title: 'Featured Products',
      description: 'Amazing products added recently in our catalog'
    },
    summerCollectionHeading: {
      title: 'Summer Collection',
      description: 'Amazing products added recently in our catalog'
    }
  }
};

export default lang;
