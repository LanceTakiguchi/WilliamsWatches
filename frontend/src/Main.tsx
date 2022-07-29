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
import { OrderIdContext, OrderIdempotencyContext, PaymentIdContext, PaymentIdempotencyContext } from './Context';

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
  const [orderIdempotency, setOrderIdempotency] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [paymentIdempotency, setPaymentIdempotency] = useState('');
  const changeOrderId = (val: string) => setOrderId(val);
  const changeOrderIdempotency = (val: string) => setOrderIdempotency(val);
  const changePaymentId = (val: string) => setPaymentId(val);
  const changePaymentIdempotency = (val: string) => setPaymentIdempotency(val);

  return (
    <OrderIdContext.Provider
      value={{
        orderId,
        changeOrderId,
      }} >
      <OrderIdempotencyContext.Provider
        value={{
          orderIdempotency,
          changeOrderIdempotency,
        }}
      >
        <PaymentIdContext.Provider
          value={{
            paymentId,
            changePaymentId
          }}
        >
          <PaymentIdempotencyContext.Provider
            value={{
              paymentIdempotency,
              changePaymentIdempotency
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
          </PaymentIdempotencyContext.Provider>
        </PaymentIdContext.Provider>
      </OrderIdempotencyContext.Provider>
    </OrderIdContext.Provider>
  );
}

export default Main;