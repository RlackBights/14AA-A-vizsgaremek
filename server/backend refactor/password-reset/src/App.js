import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter, Navigate, Outlet, useParams } from 'react-router-dom';
import PasswordReset from './compponents/PasswordReset';
import Home from './compponents/Home';
import AboutUs from './compponents/AboutUs';
import Donwload from './compponents/Donwload';
import Navbar from './Navigation';
import Login from './compponents/Login';
import Register from './compponents/Register';

export function ProtectedRoutes() {
  const { resetToken } = useParams();
  return resetToken ? <Outlet /> : <Navigate to="/login" />;
}

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        
          <Route path='/password-reset/:resetToken' element={<PasswordReset />} />
   

      </Routes>
    </BrowserRouter></>
  );
};

export default App;