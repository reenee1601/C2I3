import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { RegisterPage, HomePage } from './pages';
import './App.css';
import RegisterPage from './pages/registerPage/RegisterPage';

const App = () => {
  return (
    <div><RegisterPage></RegisterPage>
      {/* <BrowserRouter>
        <Routes>
          <Route index element = {<RegisterPage />}>
          <Route path = '/homepage' element = { <HomePage /> }></Route>
          <Route path = '/registerpage' element = {<RegisterPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter> */}
    </div>
  )
}

export default App