import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails'; // <-- Import This!
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from './../pages/About';
import ThankYou from './../pages/ThankYou';
import Feedback from '../pages/Feedback';
const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} /> {/* <-- Add This Line! */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/about' element={<About/>} />
      <Route path='/thank-you' element={<ThankYou/>} />
      <Route path='/feedback' element={<Feedback/>} />
    </Routes>
  );
};

export default Routers;