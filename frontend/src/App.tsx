import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import CompanyLogos from './components/header/CompanyLogos';
import Header from './components/header/Header';
import GlobalCSS from './styles/global.css';
import CategoryProducts from './views/categories/CategoryProducts';
import MainPage from './views/mainpage/MainPage';
import Screen404 from './views/Screen404';

function App () {
  return (
    <Router>
      <GlobalCSS/>
      <Header />
      <main style={{ minHeight: '90vh' }}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/*' element={<Screen404 />} />
          <Route path='/category/:category' element={<CategoryProducts />} />
        </Routes>
      </main>
      <CompanyLogos />
      <Footer />
    </Router>
  );
}

export default App;
