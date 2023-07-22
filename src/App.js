import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RegisterPage, HomePage, Signin, UploadPage, EditDocumentPage } from './pages';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<RegisterPage />} />
          <Route path = '/registerpage' element = {<RegisterPage />} />
          <Route path = '/signinpage' element = {<Signin />} />
          <Route path = '/homepage' element = {<HomePage />} />
          <Route path = '/uploadpage' element = {<UploadPage />} />
          <Route path = '/editdocumentpage' element = {<EditDocumentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App