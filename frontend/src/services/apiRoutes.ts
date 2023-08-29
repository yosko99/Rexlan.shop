import {
  CARTS_ROUTE,
  CATEGORIES_ROUTE,
  DELIVERIES_ROUTE,
  OPENWEATHER_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  USERS_ROUTE
} from '../constants/apiRouteConstants';

const getCurrentLang = (): string => {
  const currentLang = localStorage.getItem('language');

  return currentLang === null ? 'en' : currentLang;
};

const getLinkDefaultSuffixes = (qty?: number) => {
  return qty !== undefined
    ? `?qty=${qty}&lang=${getCurrentLang()}`
    : `?lang=${getCurrentLang()}`;
};

// Product routes
export const getProductsRoute = (qty?: number): string => {
  return PRODUCTS_ROUTE + getLinkDefaultSuffixes(qty);
};

export const getProductRoute = (id: string): string => {
  return PRODUCTS_ROUTE + id + getLinkDefaultSuffixes();
};

export const getProductsPatternRoute = (matchString: string): string => {
  return PRODUCTS_ROUTE + 'regex/' + matchString + getLinkDefaultSuffixes();
};

export const getProductsByCategoryRoute = (
  category: string,
  qty?: number
): string => {
  return PRODUCTS_ROUTE + 'category/' + category + getLinkDefaultSuffixes(qty);
};

type productSortingType =
  | 'createdAt'
  | 'updatedAt'
  | 'price'
  | 'mostViewed';

export const getProductsSortedByRoute = (
  sort: productSortingType,
  qty?: number
): string => {
  return PRODUCTS_ROUTE + 'sort/' + sort + getLinkDefaultSuffixes(qty);
};

// Cart routes
export const getCartsRoute = (): string => {
  return CARTS_ROUTE + getLinkDefaultSuffixes();
};

export const getCartRoute = (id: string): string => {
  return CARTS_ROUTE + id + getLinkDefaultSuffixes();
};

export const getCartProductsRoute = (cartId: string): string => {
  return CARTS_ROUTE + `${cartId}` + '/products' + getLinkDefaultSuffixes();
};

export const getCartProductRoute = (
  cartId: string,
  productId: string
): string => {
  return (
    CARTS_ROUTE +
    `${cartId}` +
    '/products' +
    `/${productId}` +
    getLinkDefaultSuffixes()
  );
};

// Category routes
export const getCategoriesRoute = (): string => {
  return CATEGORIES_ROUTE + getLinkDefaultSuffixes();
};

export const getCategoryRoute = (category: string): string => {
  return CATEGORIES_ROUTE + category + getLinkDefaultSuffixes();
};

// User routes
export const getUsersRoute = (id?: string): string => {
  if (id !== undefined) {
    return USERS_ROUTE + id + getLinkDefaultSuffixes();
  } else {
    return USERS_ROUTE + getLinkDefaultSuffixes();
  }
};

export const getUserOrdersRoute = (cartID: string): string => {
  return USERS_ROUTE + 'current/orders' + getLinkDefaultSuffixes();
};

export const getUserRoute = (id: string): string => {
  return USERS_ROUTE + 'user/' + id + getLinkDefaultSuffixes();
};

export const getCurrentUserRoute = (): string => {
  return USERS_ROUTE + 'current' + getLinkDefaultSuffixes();
};

export const getUserLoginRoute = (): string => {
  return USERS_ROUTE + 'login' + getLinkDefaultSuffixes();
};

export const getCurrentUserPasswordUpdateRoute = (): string => {
  return USERS_ROUTE + 'current/password' + getLinkDefaultSuffixes();
};

export const getUserPasswordResetRoute = (): string => {
  return USERS_ROUTE + 'password-reset' + getLinkDefaultSuffixes();
};

// Openweather routes
export const getOpenWeatherRoute = (): string => {
  return OPENWEATHER_ROUTE + getLinkDefaultSuffixes();
};

export const getOpenWeatherCityRoute = (lon: number, lat: number): string => {
  return OPENWEATHER_ROUTE + `city?lon=${lon}&lat=${lat}`;
};

// Deliveries routes
export const getDeliveriesRoute = (): string => {
  return DELIVERIES_ROUTE + getLinkDefaultSuffixes();
};

// Order routes
export const getOrdersRoute = (): string => {
  return ORDERS_ROUTE + getLinkDefaultSuffixes();
};

export const getOrderRoute = (orderId: string): string => {
  return ORDERS_ROUTE + orderId + getLinkDefaultSuffixes();
};
