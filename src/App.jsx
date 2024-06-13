// import React from 'react';
// import './App.css';
// import HeaderComponent from './assets/components/HeaderComponent';
// import FooterComponent from './assets/components/FooterComponent';
// import Register from './assets/components/Register';
// import Login from './assets/components/Login';
// import Event from './assets/components/Event'; // Import the Event component
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react';
import './App.css';
import ListEmployeeComponent from './assets/components/ListEmployeeComponent';
import HeaderComponent from './assets/components/HeaderComponent';
import FooterComponent from './assets/components/FooterComponent';
import HomePage from './assets/components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeComponent from './assets/components/EmployeeComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* Root path displaying home page */}
          <Route path='/' element={<HomePage />} />
          {/* Specific employees path displaying the list of employees */}
          <Route path='/employees' element={<ListEmployeeComponent />} />
          <Route path='/add-employee' element={<EmployeeComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;

