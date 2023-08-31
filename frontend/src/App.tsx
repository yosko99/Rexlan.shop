import React from 'react';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header';
import CompanyLogos from './components/partials/CompanyLogos';
import CustomToast from './components/utils/CustomToast';
import ScrollToTop from './components/utils/ScrollToTop';
import { CurrentLanguageContext } from './context/CurrentLanguageContext';
import { TokenContext } from './context/TokenContext';
import useCurrentLanguage from './hooks/useCurrentLanguage';
import useToken from './hooks/useToken';
import GlobalCSS from './styles/global.css';
import CartPage from './views/cart';
import PaymentPage from './views/cart/payment/PaymentPage';
import SuccessfulPaymentPage from './views/cart/payment/SuccessfulPaymentPage';
import CategoryProductsPage from './views/categories';
import ContactPage from './views/contactpage';
import Dashboard from './views/dashboard';
import FavouritesPage from './views/favourites';
import LoginPage from './views/loginpage';
import MainPage from './views/mainpage';
import Page404 from './views/page404';
import PasswordResetPage from './views/passwordResetPage';
import PDPPage from './views/pdp';
import RegisterPage from './views/registerpage';

const App = () => {
  const {
    currentLanguage,
    setCurrentLanguage
  } = useCurrentLanguage();
  const {
    token,
    setToken
  } = useToken();

  return (
    <HashRouter>
      <ScrollToTop/>
      <GlobalCSS/>
      <PayPalScriptProvider
        options={{
          'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID as string
        }}
      >
        <TokenContext.Provider value={{
          token,
          setToken
        }}>
          <CurrentLanguageContext.Provider
            value={{
              lang: currentLanguage,
              setCurrentLanguage
            }}
          >
            <Header/>
            <main style={{ minHeight: '70vh' }}>
              <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route
                  path="/category/:category"
                  element={<CategoryProductsPage/>}
                />
                <Route path="/:category/product/:id" element={<PDPPage/>}/>
                <Route path="/favourites" element={<FavouritesPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/password-reset" element={<PasswordResetPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/dashboard/:option" element={<Dashboard/>}/>
                <Route
                  path="/dashboard/admin-panel/:option"
                  element={<Dashboard/>}
                />
                <Route path="/contacts" element={<ContactPage/>}/>
                <Route path="/payment" element={<PaymentPage/>}/>
                <Route
                  path="/payment-successful"
                  element={<SuccessfulPaymentPage/>}
                />
                <Route path="/*" element={<Page404/>}/>
              </Routes>
            </main>
            <CompanyLogos/>
            <Footer/>
          </CurrentLanguageContext.Provider>
        </TokenContext.Provider>
      </PayPalScriptProvider>
      <CustomToast/>
    </HashRouter>
  );
};

export default App;
