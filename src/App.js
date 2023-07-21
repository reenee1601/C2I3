import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RegisterPage, signInPage, HomePage } from './pages';
import './App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<RegisterPage />} />
          <Route path = '/signin' element = {<signInPage />} />
          <Route path = '/homepage' element = {<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App