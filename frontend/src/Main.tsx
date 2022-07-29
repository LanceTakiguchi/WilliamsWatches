import React, { Component, useState, useEffect, useContext, useMemo, createContext } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from './Navbar';
import Landing from './Landing'
import History from './pages/History'
import Watches from './pages/Watches'

import { HashRouter, BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Cart from './pages/Cart';
import { getIdempotency } from './callbackend/request';
import OrderIdContext from './Context';

function Main() {
  // useEffect(() => {
  //   try {
  //     const fetchIdempotency = async () => {
  //       const idempotency = await getIdempotency();
  //       // console.log('what is data', typeof data)
  //       // console.log('what is catalog data', data)
  //       // const json = JSON.parse(data);
  //       return idempotency
  //     }

  //     const cake = fetchIdempotency().catch(console.error);
  //     console.log('cake', cake)

  //     //TODO: Try to set context afterwards
  //   } catch (err) {
  //     console.log('error:', err)
  //   }
  // }, [])

  const [orderId, setOrderId] = useState('');
  const changeOrderId = (value: string) => setOrderId(value);

  return (
    <OrderIdContext.Provider 
      value={{
        orderId,
        changeOrderId,
      }}
    >
      <Router>
        <div className="Main">
          <header className="Main-header">
            <Navbar />
          </header>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/History" element={<History />} />
            <Route path="/Watches" element={<Watches />} />
            <Route path="/Cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </OrderIdContext.Provider>
  );
}

export default Main;