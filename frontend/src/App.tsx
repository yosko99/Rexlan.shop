import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import CompanyLogos from './components/partials/CompanyLogos';
import GlobalCSS from './styles/global.css';
import CategoryProducts from './views/categories/CategoryProducts';
import MainPage from './views/mainpage/MainPage';
import ScreenPDP from './views/pdp/ScreenPDP';
import Screen404 from './views/Screen404';

function App () {
  return (
    <Router>
      <GlobalCSS/>
      <Header />
      <main style={{ minHeight: '90vh' }}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/category/:category' element={<CategoryProducts />} />
          <Route path='/:category/product/:id' element={<ScreenPDP />} />
          <Route path='/*' element={<Screen404 />} />
        </Routes>
      </main>
      <CompanyLogos />
      <Footer />
    </Router>
  );
}

export default App;
