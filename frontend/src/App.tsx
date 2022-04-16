import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header';
import CompanyLogos from './components/partials/CompanyLogos';
import GlobalCSS from './styles/global.css';
import CategoryProductsPage from './views/categories';
import FavouritesPage from './views/favourites';
import LoginPage from './views/loginpage';
import MainPage from './views/mainpage';
import Page404 from './views/page404';
import PDPPage from './views/pdp';
import RegisterPage from './views/registerpage';

function App () {
  return (
    <Router>
      <GlobalCSS/>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/category/:category' element={<CategoryProductsPage />} />
          <Route path='/:category/product/:id' element={<PDPPage />} />
          <Route path='/favourites' element={<FavouritesPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </main>
      <CompanyLogos />
      <Footer />
    </Router>
  );
}

export default App;
