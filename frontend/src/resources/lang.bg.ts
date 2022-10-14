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
    submit: 'Изпрати',
    delivery: 'Доставка',
    discount: 'Отстъпка',
    free: 'Безплатна',
    addToCart: 'Добави в количката',
    outOf: 'от',
    users: 'Потребители',
    close: 'Затвори',
    hello: 'Здравей',
    subtotal: 'Междинна сума',
    total: 'Обща сума',
    address: 'Адрес',
    city: 'Град',
    name: 'Име',
    phone: 'Телефон',
    zipcode: 'Пощенски код'
  },
  pdp: {
    inStock: 'В наличност - вземете от магазин или поръчайте чрез куриер',
    addToCartModal: {
      header: 'Продуктът е добавен в количката',
      addedQuantity: 'Добавено количество',
      productID: 'ИД на продукт',
      continueShopping: 'Продължи с пазаруването',
      finishThePurchase: 'Приключи поръчката'
    }
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
    usefullLinks: 'Полезни линкове',
    copyright: 'Авторско право'
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
      placeholder: '+12345678910',
      inputAlert: 'Очакваният формат за телефонен номер е \'+xxxxxxxxxxxx\''
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
      placeholder: 'Изберете куриер'
    }
  },
  cart: {
    addProductsToCart: 'Добави продукти в количката',
    emptyCart: 'Няма нищо :(',
    header: 'Количка',
    orderBox: {
      total: 'Обща сума',
      header: 'Твоята поръчка',
      removeProduct: 'Премахни продукта'
    },
    deliveryBox: {
      initialPriceOfDelivery: 'Начална цена на фирмата за доставка ',
      selectedCourier: 'Избран куриер',
      deliverToAddress: 'Доставка до адрес',
      deliveryToOffice: 'Доставка до офис'
    },
    paymentPage: {
      choosePayment: 'Моля изберете начин на плащане',
      developmentWarning: 'Внимание! В момента плащането не е в пълна функционалност. Всички плащания работят само с "sandbox" профили.',
      toPay: 'Сума за плащане'
    },
    successfulPaymentPage: {
      createTime: 'Дата на създаване',
      currentCurrency: 'Валута на превод',
      description: 'Описание',
      email: 'Имейл на купувача',
      paymentID: 'ID на транзакцията',
      status: 'Статус',
      amountPayed: 'Платена сума'
    }
  },
  favouritesPage: {
    header: 'Харесани продукти'
  },
  freeShippingBarText: 'Безплатна доставка на поръчки над ',
  contactsPage: {
    contactUs: 'Свържи се с нас',
    hereToHelp: 'Ние сме тук да помогнем',
    askQuestion: {
      title: 'Задай въпрос',
      subtitle: 'Попълнете нашия формуляр и ние ще ви отговорим до 24 часа.',
      secondSubtitle: 'Започни'
    },
    callUs: {
      title: 'Обадете ни се',
      subtitle: 'Ние сме на линия от неделя 7:00 PM EST до петък 7:00 PM EST',
      secondSubtitle: '+111 1 111 1111'
    },
    chatWithUs: {
      title: 'Чат с нашия екип по продажбите',
      subtitle: 'Ние сме на линия от неделя 7:00 PM EST до петък 7:00 PM EST',
      secondSubtitle: 'Започнете чат'
    },
    lookingForSomeone: 'Търсиш някой който познаваш?',
    tryOurStaffDirectory: 'Нашия указател на персонала',
    forMediaQueries: 'За медийни запитвания се свържете с email@email.com или намерете своя регионален медиен контакт',
    regionalMediaContacts: 'Контакти с регионални медии'
  },
  dashboard: {
    myAccount: 'Моят профил',
    navigationButtons: {
      myDetails: 'Моите данни',
      myOrders: 'Моите поръчки',
      passwordChange: 'Смяна на парола',
      adminPanel: 'Админ панел'
    },
    tabs: {
      myDetails: {
        header: {
          title: 'Моите данни',
          subtitle: 'Лична информация'
        },
        lastProfileUpdate: 'Последна актуализация на профила'
      },
      passwordChange: {
        header: {
          title: 'Смяна на парола',
          subtitle: 'Тук можете да промените вашата парола'
        },
        enterOldPassword: 'Въведете старата парола',
        enterNewPassword: 'Въведете новата парола'
      },
      myOrders: {
        header: {
          title: 'Моите поръчки',
          subtitle: 'Всичките ваши поръчки са изброени по-долу'
        },
        noOrders: 'В момента нямате създадени поръчки.',
        ordersTable: {
          header: {
            date: 'Дата',
            order: '# Поръчка',
            status: 'Статус',
            total: 'Обща сума'
          },
          viewOrderModal: {
            activateButtonText: 'Прегледай',
            header: 'Получихме вашата поръчка! Вашият свят е на път да изглежда много по-добре. Ще ви изпратим друг имейл, когато поръчката ви бъде изпратена.',
            orderedProducts: 'Поръчани продукти',
            billingInfo: 'Информация за плащане',
            shippingAddress: 'Адрес за доставка',
            ifYouNeedHelp: 'Ако имате нужда от помощ за нещо, моля, не се колебайте да ни изпратите имейл :)'
          }
        }
      },
      adminPanel: {
        header: {
          title: 'Админ панел',
          subtitle: 'Изберете кои данни искате да редактирате'
        }
      }
    }
  }
};

export default lang;
