import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import BasketWindow from '../components/BasketWindow';
import RecipientsForm from '../components/RecipientsForm';

const BasketPage = () => {
  const [ showNav, setShowNav] = useState(false);

  return (
    <body class = "basketPage" onMouseEnter={() => setShowNav(true)}>
      <header class = "menu" >
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <h1>Корзина</h1>
        </header>
        <Navbar show = {showNav}/>  
        <BasketWindow /> 
        <RecipientsForm /> 
    </body>
  );
}

export default BasketPage;
