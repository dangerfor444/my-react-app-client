import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './props/CartContext';
import './App.css'


import BasketPage from './pages/basketPage';
import OrderPage from './pages/ordersPage';
import ProductPage from './pages/productsPage';
import AuthorizationPage from './pages/AuthorizationPage';

const App = () => {
  return (
    <CartProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthorizationPage  />} />  
          <Route path="/ProductPage" element={<ProductPage />} />   
          <Route path="/OrderPage" element={<OrderPage />} />     
          <Route path="/BasketPage" element={<BasketPage />} />           
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
};

export default App;