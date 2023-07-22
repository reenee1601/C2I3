import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RegisterPage, Signin, HomePage, DetailedInvoicePage, DetailedSoaPage, EditDOcumentPage, 
          InvoicePage, RegisterPage, SoaPage, UploadPage } from './pages';

import './App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<RegisterPage />} />
          <Route path = '/signin' element = {<Signin />} />
          <Route path = '/homepage' element = {<HomePage />} />
          <Route path = '/detailedinvoicepage' element = {<DetailedInvoicePage />} />
          <Route path = '/detailedsoapage' element = {<DetailedSoaPage />} />
          <Route path = '/editdocumentpage' element = {<EditDOcumentPage />} />
          <Route path = '/invoicepage' element = {<InvoicePage />} />
          <Route path = '/registerpage' element = {<RegisterPage />} />
          <Route path = '/soapage' element = {<SoaPage />} />
          <Route path = '/uploadpage' element = {<UploadPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App