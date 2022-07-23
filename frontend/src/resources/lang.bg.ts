import { faCircleDollarToSlot, faClock, faLock, faTruck } from '@fortawesome/free-solid-svg-icons';

import HTMLFields from '../types/htmlFields';

const lang: HTMLFields = {
  header: {
    languageSwitcherButton: 'Език',
    homeButton: 'Начало',
    categoriesButton: 'Категории',
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
  mainPageInfobar: [
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
  ]
};

export default lang;
