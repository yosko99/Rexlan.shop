import {
  USERS_ROUTE,
  CARTS_ROUTE,
  PRODUCTS_ROUTE,
  CATEGORIES_ROUTE,
  DELIVERIES_ROUTE,
  OPENWEATHER_ROUTE,
  ORDERS_ROUTE
} from '../constants/apiRouteConstants';

const getCurrentLang = (): string => {
  const currentLang = localStorage.getItem('language');

  return currentLang === null ? 'en' : currentLang;
};

const getLinkDeffaultSuffixes = (qty?: number) => {
  return qty !== undefined
    ? `?qty=${qty}&lang=${getCurrentLang()}`
    : `?lang=${getCurrentLang()}`;
};

// Product routes
export const getProductsRoute = (qty?: number): string => {
  return PRODUCTS_ROUTE + getLinkDeffaultSuffixes(qty);
};

export const getProductRoute = (id: string): string => {
  return PRODUCTS_ROUTE + id + getLinkDeffaultSuffixes();
};

export const getProductsPatternRoute = (matchString: string): string => {
  return PRODUCTS_ROUTE + 'regex/' + matchString + getLinkDeffaultSuffixes();
};

export const getProductsByCategoryRoute = (category: string): string => {
  return PRODUCTS_ROUTE + 'category/' + category + getLinkDeffaultSuffixes();
};

type productSortingType = 'title' | 'price' | 'description' | 'category' | 'rating';

export const getProductsSortedByRoute = (sort: productSortingType, qty?: number): string => {
  return PRODUCTS_ROUTE + 'sort/' + sort + getLinkDeffaultSuffixes(qty);
};

// Cart routes
export const getCartsRoute = (): string => {
  return CARTS_ROUTE + getLinkDeffaultSuffixes();
};

export const getCartRoute = (id: string): string => {
  return CARTS_ROUTE + id + getLinkDeffaultSuffixes();
};

export const getCartsProductRoute = (): string => {
  return CARTS_ROUTE + 'product' + getLinkDeffaultSuffixes();
};

// Category routes
export const getCategoriesRoute = (): string => {
  return CATEGORIES_ROUTE + getLinkDeffaultSuffixes();
};

export const getCategoryRoute = (category: string): string => {
  return CATEGORIES_ROUTE + category + getLinkDeffaultSuffixes();
};

// User routes
export const getUsersRoute = (): string => {
  return USERS_ROUTE + getLinkDeffaultSuffixes();
};

export const getUserRoute = (id: string): string => {
  return USERS_ROUTE + 'user/' + id + getLinkDeffaultSuffixes();
};

export const getCurrentUserRoute = (): string => {
  return USERS_ROUTE + 'current' + getLinkDeffaultSuffixes();
};

export const getUserLoginRoute = (): string => {
  return USERS_ROUTE + 'login' + getLinkDeffaultSuffixes();
};

export const getUserPasswordUpdateRoute = (): string => {
  return USERS_ROUTE + 'change-password' + getLinkDeffaultSuffixes();
};

export const getUserPasswordResetRoute = (): string => {
  return USERS_ROUTE + 'password-reset' + getLinkDeffaultSuffixes();
};

// Openweather routes
export const getOpenWeatherRoute = (): string => {
  return OPENWEATHER_ROUTE + getLinkDeffaultSuffixes();
};

export const getOpenWeatherCityRoute = (lon: number, lat: number): string => {
  return OPENWEATHER_ROUTE + `city?lon=${lon}&lat=${lat}`;
};

// Deliveries routes
export const getDeliveriesRoute = (): string => {
  return DELIVERIES_ROUTE + getLinkDeffaultSuffixes();
};

// Order routes
export const getOrdersRoute = (): string => {
  return ORDERS_ROUTE + getLinkDeffaultSuffixes();
};

export const getOrderByCartRoute = (cartID: string): string => {
  return ORDERS_ROUTE + 'cart/' + cartID + getLinkDeffaultSuffixes();
};

export const getOrderByUserRoute = (userID: string): string => {
  return ORDERS_ROUTE + 'user/' + userID + getLinkDeffaultSuffixes();
};
