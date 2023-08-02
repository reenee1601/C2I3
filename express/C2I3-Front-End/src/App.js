import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RegisterPage, Signinpage, HomePage, DetailedInvoicePage, DetailedSoaPage, EditDocumentPage, 
          InvoicePage, SoaPage, UploadPage, CompareDocumentPage } from './pages';

import './App.css';

const App = () => {
  const [selected_amount, setSelected_amount] = useState("");
  const [selected_date, setSelected_date] = useState("");
  const [selected_invoicenum, setSelected_invoicenum] = useState("");
  const [selected_suppliername, setSelected_suppliername] = useState("");
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
          <Route path = '/soapage' element = {<SoaPage 
            selected_amount={selected_amount} setSelected_amount={setSelected_amount}
            selected_date={selected_date} setSelected_date={setSelected_date} 
            selected_invoicenum={selected_invoicenum} setSelected_invoicenum={setSelected_invoicenum}
            selected_suppliername={selected_suppliername} setSelected_suppliername={setSelected_suppliername}/>} />
          <Route path = '/uploadpage' element = {<UploadPage />} />
          <Route path = '/comparedocumentpage' element = {<CompareDocumentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App