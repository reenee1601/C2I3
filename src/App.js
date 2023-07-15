import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RegisterPage, HomePage } from './pages';
import './App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<RegisterPage />} />
          <Route path = '/registerpage' element = {<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App