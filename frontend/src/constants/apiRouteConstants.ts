const REACT_APP_PROXY_URL = process.env.REACT_APP_PROXY_URL;
const proxyURL = REACT_APP_PROXY_URL === undefined ? 'http://localhost:5000' : REACT_APP_PROXY_URL;

export const USERS_ROUTE = proxyURL + '/api/users/';
export const CARTS_ROUTE = proxyURL + '/api/carts/';
export const ORDERS_ROUTE = proxyURL + '/api/orders/';
export const PRODUCTS_ROUTE = proxyURL + '/api/products/';
export const DELIVERIES_ROUTE = proxyURL + '/api/deliveries/';
export const CATEGORIES_ROUTE = proxyURL + '/api/categories/';
export const OPENWEATHER_ROUTE = proxyURL + '/api/openweather/';
