import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header';
import CompanyLogos from './components/partials/CompanyLogos';
import ScrollToTop from './components/partials/ScrollToTop';
import { TokenContext } from './context/TokenContext';
import useToken from './hooks/useToken';
import GlobalCSS from './styles/global.css';
import CartPage from './views/cart';
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

function App () {
  const { token, setToken } = useToken();

  return (
    <Router>
      <ScrollToTop />
      <GlobalCSS/>
      <TokenContext.Provider value={{ token, setToken }}>
        <Header />
        <main style={{ minHeight: '70vh' }}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/category/:category' element={<CategoryProductsPage />} />
            <Route path='/:category/product/:id' element={<PDPPage />} />
            <Route path='/favourites' element={<FavouritesPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/password-reset' element={<PasswordResetPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/dashboard/:option' element={<Dashboard />} />
            <Route path='/dashboard/admin-panel/:option' element={<Dashboard />} />
            <Route path='/contacts' element={<ContactPage />} />
            <Route path='/*' element={<Page404 />} />
          </Routes>
        </main>
        <CompanyLogos />
        <Footer />
      </TokenContext.Provider>
    </Router>
  );
}

export default App;
