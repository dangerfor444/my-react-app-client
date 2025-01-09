import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import '../css/orderStyle.css'
import Order from '../components/Order';

const OrderPage = () => {
  const [ showNav, setShowNav] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://85.208.87.56/api/v1/checkouts', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`,
          },
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      } 
    };

    fetchOrders();
  }, []);

  return (
    <body class = "productPage" onMouseEnter={() => setShowNav(true)}>
      <header class = "menu" >
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <h1>Мои заказы</h1>
        </header>
        <Navbar show = {showNav}/>   
        <div className="orders-list">
        {orders.map((order) => (
          <Order key={order.id} order={order} /> 
        ))}
      </div>              
    </body>
  );
}

export default OrderPage;
