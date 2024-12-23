import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";



const OrderPage = () => {
  const [ showNav, setShowNav] = useState(false);

  return (
    <body class = "productPage" onMouseEnter={() => setShowNav(true)}>
      <header class = "menu" >
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <h1>Мои заказы</h1>
        </header>
        <Navbar show = {showNav}/>              
    </body>
  );
}

export default OrderPage;
