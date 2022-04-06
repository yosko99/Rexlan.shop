import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import GlobalCSS from './styles/global.css';
import MainPage from './views/MainPage';
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
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
