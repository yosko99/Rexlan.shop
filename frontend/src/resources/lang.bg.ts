import { faCircleDollarToSlot, faClock, faLock, faTruck } from '@fortawesome/free-solid-svg-icons';

import HTMLFields from '../types/htmlFields';

const lang: HTMLFields = {
  global: {
    findOutMore: 'Научете повече',
    categories: 'Категории',
    contacts: 'Контакти',
    help: 'Помощ',
    orders: 'Поръчки',
    pricing: 'Цени',
    settings: 'Настройки'
  },
  header: {
    languageSwitcherButton: 'Език',
    homeButton: 'Начало',
    contactsButton: 'Контакти',
    cartButton: 'Количка',
    favouritesButton: 'Любими',
    loginButton: 'Вход',
    logoutButton: 'Изход',
    profileButton: 'Профил'
  },
  searchBar: {
    buttonText: 'Търси продукти',
    inputfieldPlaceholder: 'Търсене',
    titleText: 'Търси продукти',
    productNotFound: 'Съжаляваме не можахме да намерим съвпадения за'
  },
  mainPage: {
    infoBar: [
      {
        icon: faTruck,
        title: 'Безплатна доставка и връщане',
        description: 'Безплатна доставка на поръчки над 99$'
      },
      {
        icon: faCircleDollarToSlot,
        title: 'Гарантирано връщане на парите',
        description: '100% гарантирано връщане'
      },
      {
        icon: faClock,
        title: 'Онлайн поддръжка 24/7',
        description: 'Lorem ipsum lorem lorem'
      },
      {
        icon: faLock,
        title: 'Сигурно плащане',
        description: 'Lorem ipsum lorem lorem'
      }
    ],
    bestSellersHeading: {
      title: 'Най-продавани продукти',
      description: 'Невероятни продукти, добавени наскоро в нашия каталог'
    },
    featuredProductsHeading: {
      title: 'Специални продукти',
      description: 'Невероятни продукти, добавени наскоро в нашия каталог'
    },
    summerCollectionHeading: {
      title: 'Лятна колекция',
      description: 'Невероятни продукти, добавени наскоро в нашия каталог'
    },
    homegrownHeading: {
      title: 'Homegrown',
      description: 'Ние обичаме всички наши красиви марки тук в Rexlan, но има специално място в сърцето ни за Българските марки. Улеснихме ви да намерите малко за всяка от тези невероятни марки. Преминете към нашата страница Homegrown, където ви даваме кратка представа какво прави всяка от тези марки толкова специална.'
    }
  },
  footer: {
    getConnected: 'Свържете се с нас в социалните мрежи',
    usefullLinks: 'Полезни линкове'
  }
};

export default lang;
