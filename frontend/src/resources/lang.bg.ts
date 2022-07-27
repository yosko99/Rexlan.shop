import { faCircleDollarToSlot, faClock, faLock, faTruck } from '@fortawesome/free-solid-svg-icons';

import HTMLFields from '../types/htmlFields';

const lang: HTMLFields = {
  current: 'bg',
  global: {
    findOutMore: 'Научете повече',
    categories: 'Категории',
    contacts: 'Контакти',
    help: 'Помощ',
    orders: 'Поръчки',
    pricing: 'Цени',
    settings: 'Настройки',
    products: 'Продукти',
    submit: 'Изпрати'
  },
  header: {
    languageSwitcherButton: 'Език',
    homeButton: 'Начало',
    contactsButton: 'Контакти',
    cartButton: 'Количка',
    favouritesButton: 'Любими',
    loginButton: 'Вход',
    logoutButton: 'Изход',
    profileButton: 'Профил',
    noCategories: 'Няма налични категории'
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
      subtitle: 'Невероятни продукти, добавени наскоро в нашия каталог'
    },
    featuredProductsHeading: {
      title: 'Специални продукти',
      subtitle: 'Невероятни продукти, добавени наскоро в нашия каталог'
    },
    summerCollectionHeading: {
      title: 'Лятна колекция',
      subtitle: 'Невероятни продукти, добавени наскоро в нашия каталог'
    },
    homegrownHeading: {
      title: 'Homegrown',
      subtitle: 'Ние обичаме всички наши красиви марки тук в Rexlan, но има специално място в сърцето ни за Българските марки. Улеснихме ви да намерите малко за всяка от тези невероятни марки. Преминете към нашата страница Homegrown, където ви даваме кратка представа какво прави всяка от тези марки толкова специална.'
    }
  },
  footer: {
    getConnected: 'Свържете се с нас в социалните мрежи',
    usefullLinks: 'Полезни линкове'
  },
  loginPage: {
    heading: {
      title: 'Добре дошли !',
      subtitle: 'Моля въведете вашите данни.'
    },
    dontHaveAccount: 'Нямате профил?',
    signUpForFree: 'Регистрирайте се сега!',
    rembemberMe: 'Запомни ме',
    resetPassword: 'Забравена парола?'
  },
  registerPage: {
    heading: {
      title: 'Регистрирай се',
      subtitle: 'Въведете вашите данни по-долу.'
    },
    providedDataIsUsedFor: 'Предоставените данни ще се използват за по-бързо плащане.'
  },
  resetPasswordPage: {
    heading: {
      title: 'Забравена парола',
      subtitle: 'Ще изпратим временна парола на вашия имейл, за да можете да влезете 😄.'
    },
    backToLogin: 'Обратно към входа'
  },
  inputs: {
    email: {
      label: 'Имейл адрес',
      placeholder: 'steven@gmail.com',
      inputAlert: 'Моля, предоставете валиден имейл формат.',
      inputText: 'Никога не бихме споделили вашия имейл с някой друг.'
    },
    password: {
      label: 'Парола <span className=\'text-muted\'>(минимум 8 символа)</span>',
      placeholder: 'Парола',
      inputAlert: `Моля предоставете парола която съдържа
      (поне 1 главна буква,
      поне 1 малка буква,
      поне 1 число,
      поне 1 символ (позволени символи !@#$%^&*_=+-))`
    },
    name: {
      label: 'Име',
      placeholder: 'Иван Иванов'
    },
    address: {
      label: 'Вашият адрес',
      placeholder: 'Ул. Сезам 2321'
    },
    phone: {
      label: 'Вашият телефон',
      placeholder: '+12345678910'
    },
    city: {
      label: 'Град',
      placeholder: 'Амстердам',
      inputText: 'Позволявайки \'текущо местоположение\' ние ще попълни тази стойност за вас.'
    },
    postalCode: {
      label: 'Пощенски код',
      placeholder: '1234'
    },
    delivery: {
      label: 'Доставка',
      placeholder: 'Изберете доставка'
    }
  }
};

export default lang;
