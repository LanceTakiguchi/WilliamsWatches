import React, { Component, useContext, useEffect } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import submarinerVideo from './assets/submariner.mp4'
import { getIdempotency } from './callbackend/request';
import { OrderIdempotencyContext, PaymentIdempotencyContext } from './Context';

function Landing() {
  const { orderIdempotency, changeOrderIdempotency } = useContext(OrderIdempotencyContext);
  const { paymentIdempotency, changePaymentIdempotency } = useContext(PaymentIdempotencyContext);
  
  useEffect(() => {
    if (orderIdempotency === '') {
      try {
        const fetchIdempotency = async () => {
          const response = await getIdempotency() as any;
          console.log('fetchIdempotency:', response)
          changeOrderIdempotency(response)
          console.log('landing orderIdempotency:', orderIdempotency)
        }
  
        fetchIdempotency().catch(console.error);
      } catch (err) {
        console.log('error:', err)
      }
    }
    if (paymentIdempotency === '') {
      try {
        const fetchIdempotency = async () => {
          const response = await getIdempotency() as any;
          console.log('fetchIdempotency:', response)
          changePaymentIdempotency(response)
          console.log('landing paymentIdempotency:', paymentIdempotency)
        }
  
        fetchIdempotency().catch(console.error);
      } catch (err) {
        console.log('error:', err)
      }
    }
  }, [])

  return (
    <div className="Landing">
      <video loop={true} autoPlay={true} muted={true} preload={"auto"} className="landing-video" playsInline={true}>
        <source src={submarinerVideo} type="video/mp4" />
      </video>
      <div className="Title">
        <h1>SUBMARINER</h1>
        <h3>The reference among divers' watches</h3>
      </div>
    </div>
  );
}

export default Landing;
