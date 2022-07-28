import React, { Component, useState, useEffect } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from './Navbar';
import Landing from './Landing'
import History from './pages/History'
import Watches from './pages/Watches'

import  { HashRouter, BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Cart from './pages/Cart';

function Main () {
  return (
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
  );
}

export default Main;