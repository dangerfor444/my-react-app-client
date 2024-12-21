import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegNewspaper } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa"
import { CiLogout } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import '../css/navbar.css'
const Navbar = ({show}) => {

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
        <div class = {show ? 'sidenav active' : 'sidenav'} >
          <ul>     
            <li class={isActive('/ProductPage') ? 'active-link' : ''}>
              <a href='/ProductPage'><FaBoxOpen />Товары</a>
            </li>           
            <li class={isActive('/BasketPage') ? 'active-link' : ''}>
              <a href='/BasketPage'><SlBasket/>Корзина</a>
            </li>
            <li class={isActive('/OrderPage') ? 'active-link' : ''}>
             <a href = '/OrderPage'><FaRegNewspaper />Заказы</a>
            </li>         
            <li class = "logout">
             <a href = '/'><CiLogout />Выйти</a>
            </li>
          </ul>
        </div>
  );
}

export default Navbar;

