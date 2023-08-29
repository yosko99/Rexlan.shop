import { faCircleDollarToSlot, faClock, faLock, faTruck } from '@fortawesome/free-solid-svg-icons';

import HTMLFields from '../types/htmlFields';

const lang: HTMLFields = {
  current: 'es',
  global: {
    findOutMore: 'Más información',
    categories: 'Categorías',
    contacts: 'Contactos',
    help: 'Ayuda',
    deliveries: 'Entregas',
    orders: 'Órdenes',
    pricing: 'Precios',
    settings: 'Configuración',
    products: 'Productos',
    submit: 'Enviar',
    delivery: 'Entrega',
    discount: 'Descuento',
    free: 'Gratis',
    addToCart: 'Agregar al carrito',
    outOf: 'fuera de',
    users: 'Usuarios',
    close: 'Cerrar',
    hello: 'Hola',
    subtotal: 'Subtotal',
    total: 'Total',
    address: 'Dirección',
    city: 'Ciudad',
    name: 'Nombre',
    phone: 'Teléfono',
    zipcode: 'Código Postal'
  },
  pdp: {
    inStock: 'En stock - recoger o pedir por mensajería',
    relatedProducts: 'Productos que también te pueden gustar',
    addToCartModal: {
      addedQuantity: 'Cantidad agregada',
      header: 'Producto agregado al carrito',
      productID: 'ID del producto',
      continueShopping: 'Continuar comprando',
      finishThePurchase: 'Finalizar la compra'
    }
  },
  header: {
    languageSwitcherButton: 'Idioma',
    homeButton: 'Inicio',
    contactsButton: 'Contactos',
    cartButton: 'Carrito',
    favouritesButton: 'Favoritos',
    loginButton: 'Iniciar sesión',
    logoutButton: 'Cerrar sesión',
    profileButton: 'Perfil',
    noCategories: 'No hay categorías disponibles'
  },
  searchBar: {
    buttonText: 'Buscar productos',
    inputfieldPlaceholder: 'Buscar',
    titleText: 'Buscar productos',
    productNotFound: 'Lo sentimos, no encontramos coincidencias para'
  },
  mainPage: {
    infoBar: [
      {
        icon: faTruck,
        title: 'Envío y devolución gratuitos',
        description: 'Envío gratuito en todos los pedidos superiores a 99$'
      },
      {
        icon: faCircleDollarToSlot,
        title: 'Garantía de devolución del dinero',
        description: 'Garantía de devolución del 100% del dinero'
      },
      {
        icon: faClock,
        title: 'Soporte en línea 24/7',
        description: 'Lorem ipsum lorem lorem'
      },
      {
        icon: faLock,
        title: 'Pago seguro',
        description: 'Lorem ipsum lorem lorem'
      }
    ],
    bestSellersHeading: {
      title: 'Productos más vendidos',
      subtitle: 'Productos increíbles añadidos recientemente a nuestro catálogo'
    },
    featuredProductsHeading: {
      title: 'Productos destacados',
      subtitle: 'Productos increíbles añadidos recientemente a nuestro catálogo'
    },
    summerCollectionHeading: {
      title: 'Colección de verano',
      subtitle: 'Productos increíbles añadidos recientemente a nuestro catálogo'
    },
    homegrownHeading: {
      title: 'Producido localmente',
      subtitle:
        'Amamos todas nuestras hermosas marcas aquí en Rexlan, pero hay un lugar especial en nuestro corazón para las marcas búlgaras. Hemos facilitado que descubras un poco sobre cada una de estas marcas increíbles. Dirígete a nuestra página de "Producido localmente" donde te daremos una pequeña idea de lo que hace que cada una de estas marcas sea tan especial.'
    }
  },
  footer: {
    getConnected: 'Conéctate con nosotros en las redes sociales',
    usefullLinks: 'Enlaces útiles',
    copyright: 'Derechos de autor'
  },
  loginPage: {
    heading: {
      title: '¡Bienvenido de nuevo!',
      subtitle: 'Por favor, introduce tus datos de inicio de sesión.'
    },
    dontHaveAccount: '¿No tienes una cuenta?',
    signUpForFree: '¡Regístrate gratis!',
    rembemberMe: 'Recuérdame',
    resetPassword: '¿Olvidaste tu contraseña?'
  },
  registerPage: {
    heading: {
      title: 'Regístrate ahora',
      subtitle: 'Introduce tus credenciales a continuación.'
    },
    providedDataIsUsedFor:
      'Los datos proporcionados se utilizarán para un proceso de compra más rápido.'
  },
  resetPasswordPage: {
    heading: {
      title: 'Olvidé mi contraseña',
      subtitle:
        'Enviaremos una contraseña temporal a tu correo electrónico para que puedas iniciar sesión 😄.'
    },
    backToLogin: 'Volver a iniciar sesión'
  },
  inputs: {
    email: {
      label: 'Dirección de correo electrónico',
      placeholder: 'steven@gmail.com',
      inputAlert:
        'Por favor, proporciona un formato de correo electrónico válido.',
      inputText: 'Nunca compartiremos tu correo electrónico con nadie más.'
    },
    password: {
      label:
        'Contraseña <span className=\'text-muted\'>(mínimo 8 caracteres)</span>',
      placeholder: 'Contraseña',
      inputAlert:
        'Por favor, proporciona una contraseña que incluya (Al menos 1 mayúscula, Al menos 1 minúscula, Al menos 1 número, Al menos 1 símbolo (símbolos permitidos !@#$%^&*_=+-))'
    },
    name: {
      label: 'Nombre',
      placeholder: 'Steven Willson'
    },
    address: {
      label: 'Tu dirección',
      placeholder: 'Calle Principal 119'
    },
    phone: {
      label: 'Tu teléfono',
      placeholder: '+12345678910',
      inputAlert:
        'El formato esperado para el número de teléfono es "+xxxxxxxxxxxx"'
    },
    city: {
      label: 'Ciudad',
      placeholder: 'Amsterdam',
      inputText:
        'Al permitir "ubicación actual", completaremos este valor por ti.'
    },
    postalCode: {
      label: 'Código postal',
      placeholder: '1234'
    },
    delivery: {
      label: 'Opción de entrega',
      placeholder: 'Selecciona un mensajero'
    }
  },
  cart: {
    addProductsToCart: 'Añadir productos al carrito',
    emptyCart: 'Estoy vacío :(',
    header: 'Carrito de compras',
    orderBox: {
      total: 'Total',
      header: 'Tu pedido',
      removeProduct: 'Eliminar producto'
    },
    deliveryBox: {
      initialPriceOfDelivery: 'Precio inicial de la empresa de entrega',
      selectedCourier: 'Mensajero seleccionado',
      deliverToAddress: 'Entregar a la dirección',
      deliveryToOffice: 'Entregar en la oficina'
    },
    paymentPage: {
      choosePayment: 'Por favor, elige un método de pago',
      developmentWarning:
        '¡Atención! El pago actualmente no está completamente funcional. Todos los pagos solo funcionan con cuentas de "sandbox".',
      toPay: 'Cantidad a pagar',
      payPalNotSet:
        'Lo sentimos, no puedes finalizar tu pedido en este momento. No se pudo encontrar la clave API de PayPal.'
    },
    successfulPaymentPage: {
      createTime: 'Fecha de creación',
      currentCurrency: 'Moneda de transferencia',
      description: 'Descripción',
      email: 'Correo electrónico del comprador',
      paymentID: 'ID de transacción',
      status: 'Estado',
      amountPayed: 'Cantidad pagada',
      title: 'Pago exitoso'
    }
  },
  favouritesPage: {
    header: 'Productos favoritos'
  },
  freeShippingBarText: 'ENVÍO GRATIS CON UN PEDIDO SUPERIOR A ',
  contactsPage: {
    contactUs: 'Contáctanos',
    hereToHelp: 'Estamos aquí para ayudarte',
    askQuestion: {
      title: 'Haz una pregunta',
      subtitle: 'Rellena nuestro formulario y te responderemos en 24 horas.',
      secondSubtitle: 'Empezar'
    },
    callUs: {
      title: 'Llámanos directamente al',
      subtitle: 'Estamos disponibles de Dom 7:00pm EST - Vie 7:00pm EST.',
      secondSubtitle: '+111 1 111 1111'
    },
    chatWithUs: {
      title: 'Chatea con nuestro equipo de ventas',
      subtitle: 'Estamos disponibles de Dom 7:00pm EST - Vie 7:00pm EST.',
      secondSubtitle: 'Chatea ahora'
    },
    lookingForSomeone: '¿Buscas a alguien que conozcas?',
    tryOurStaffDirectory: 'Prueba nuestro directorio de personal',
    forMediaQueries:
      'Para consultas de medios, ponte en contacto con email@email.com o encuentra tu contacto regional de medios',
    regionalMediaContacts: 'Contactos regionales de medios'
  },
  dashboard: {
    myAccount: 'Mi cuenta',
    navigationButtons: {
      myDetails: 'Mis detalles',
      myOrders: 'Mis pedidos',
      passwordChange: 'Cambio de contraseña',
      adminPanel: 'Panel de administración'
    },
    tabs: {
      myDetails: {
        header: {
          title: 'Mis detalles',
          subtitle: 'Información personal'
        },
        lastProfileUpdate: 'Última actualización de perfil'
      },
      passwordChange: {
        header: {
          title: 'Cambio de contraseña',
          subtitle: 'Aquí puedes cambiar tu contraseña'
        },
        enterOldPassword: 'Introduce la contraseña antigua',
        enterNewPassword: 'Introduce la contraseña nueva'
      },
      myOrders: {
        header: {
          title: 'Mis pedidos',
          subtitle: 'Todos tus pedidos se muestran a continuación'
        },
        noOrders: 'Actualmente no tienes ningún pedido creado.',
        ordersTable: {
          header: {
            date: 'Fecha',
            order: '# Pedido',
            status: 'Estado',
            total: 'Total'
          },
          viewOrderModal: {
            activateButtonText: 'Ver',
            header:
              '¡Hemos recibido tu pedido! Tu mundo está a punto de verse mucho mejor. Te enviaremos otro correo electrónico cuando tu pedido se envíe.',
            orderedProducts: 'Productos solicitados',
            billingInfo: 'Información de facturación',
            shippingAddress: 'Dirección de envío',
            ifYouNeedHelp:
              'If you need help with anything please don\'t hesitate to drop us an email :)'
          }
        }
      },
      adminPanel: {
        header: {
          title: 'Panel de administrador',
          subtitle: 'Seleccione los datos que desea editar'
        },
        editProducts: {
          header: {
            title: 'Editar productos',
            subtitle: 'Aquí puede agregar, quitar y actualizar productos'
          },
          editProductsTableCols: {
            imageCol: 'Imagen',
            titleCol: 'Título'
          }
        },
        editDeliveries: {
          header: {
            title: 'Editar entregas',
            subtitle: 'Aquí puedes agregar, eliminar y actualizar entregas.'
          },
          editDeliveriesTableCols: {
            imageCol: 'Imagen',
            titleCol: 'Título'
          }
        },
        editCategories: {
          header: {
            title: 'Editar categorías',
            subtitle: 'Aquí puede agregar, eliminar y actualizar categorías',
            secondSubtitle:
              'Eliminar una categoría eliminará todos los productos relacionados con ella.'
          },
          editCategoriesTableCols: {
            bannerImageCol: 'Imagen de la pancarta',
            nameCol: 'Nombre'
          }
        },
        editUsers: {
          header: {
            title: 'Editar usuarios',
            subtitle: 'Aquí puede editar y eliminar usuarios'
          },
          editUsersTable: {
            emailCol: 'Correo electrónico',
            nameCol: 'Nombre'
          }
        },
        editDataTable: {
          addDataBtn: 'Editar datos',
          editDataBtn: 'Borrar',
          deleteDataBtn: 'Editar',
          deleteDataPrompt: '¿Estás seguro de que quieres eliminar esto?'
        }
      }
    }
  }
};

export default lang;
