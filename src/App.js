import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RegisterPage, Signinpage, HomePage, DetailedInvoicePage, DetailedSoaPage, EditDocumentPage, 
          InvoicePage, SoaPage, UploadPage, CompareDocumentPage, ProductPage } from './pages';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<RegisterPage />} />
          <Route path = '/registerpage' element = {<RegisterPage />} />
          <Route path = '/signinpage' element = {<Signinpage />} />
          <Route path = '/homepage' element = {<HomePage />} />
          <Route path = '/detailedinvoicepage' element = {<DetailedInvoicePage />} />
          <Route path = '/detailedsoapage' element = {<DetailedSoaPage />} />
          <Route path = '/editdocumentpage' element = {<EditDocumentPage />} />
          <Route path = '/invoicepage' element = {<InvoicePage />} />
          <Route path = '/soapage' element = {<SoaPage />}/>
          <Route path = '/productpage' element = {<ProductPage />}/>
          <Route path = '/uploadpage' element = {<UploadPage />} />
          <Route path = '/comparedocumentpage' element = {<CompareDocumentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App