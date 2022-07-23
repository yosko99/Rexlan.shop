import { faCircleDollarToSlot, faClock, faLock, faTruck } from '@fortawesome/free-solid-svg-icons';

import HTMLFields from '../types/htmlFields';

const lang: HTMLFields = {
  global: {
    findOutMore: 'Find out more',
    categories: 'Categories',
    contacts: 'Contacts',
    help: 'Help',
    orders: 'Orders',
    pricing: 'Pricing',
    settings: 'Settings'
  },
  header: {
    languageSwitcherButton: 'Language',
    homeButton: 'Home',
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
    },
    homegrownHeading: {
      title: 'Homegrown',
      description: 'We love all of our beautiful brands here at Rexlan but there is a special place in our heart for the Bulgarian brands. We have made it easy for you to find a little about each of these amazing brands. Head over to our Homegrown page where we give you a little insight into what makes each of these brands so special.'
    }
  },
  footer: {
    getConnected: 'Get connected with us on social networks',
    usefullLinks: 'Usefull links'
  }
};

export default lang;
