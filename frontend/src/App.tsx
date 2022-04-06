import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GlobalCSS from './styles/global.css';

function App () {
  return (
    <Router>
      <GlobalCSS/>
      <main style={{ minHeight: '90vh' }}>
        <Routes>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
