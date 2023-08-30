const REACT_APP_PROXY_URL = process.env.REACT_APP_PROXY_URL;
export const PROXY_URL = REACT_APP_PROXY_URL === undefined ? 'http://localhost:5000' : REACT_APP_PROXY_URL;

export const ASSET_PROXY_URL = PROXY_URL + '/public';

export const USERS_ROUTE = PROXY_URL + '/api/users/';
export const CARTS_ROUTE = PROXY_URL + '/api/carts/';
export const ORDERS_ROUTE = PROXY_URL + '/api/orders/';
export const PRODUCTS_ROUTE = PROXY_URL + '/api/products/';
export const DELIVERIES_ROUTE = PROXY_URL + '/api/deliveries/';
export const CATEGORIES_ROUTE = PROXY_URL + '/api/categories/';
export const OPENWEATHER_ROUTE = PROXY_URL + '/api/openweather/';
