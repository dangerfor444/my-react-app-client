import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useCart } from '../props/CartContext';
import '../css/basketStyle.css'

const BasketWindow = () => {
    const { cartItems, removeFromCart } = useCart();
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.count, 0);

  return (
    <section class="section-cart">
        <div class="section-cart__body">
            <div class="container">
                <section class="cart">
                    <header class="cart-header">
                        <div class="cart-header__title">наименование</div>
                        <div class="cart-header__count">количество</div>
                        <div class="cart-header__cost">стоимость</div>
                    </header>

                      {cartItems.map((item) => (
                            <section className="product" key={item.id}>
                                <div className="product__img">
                                    <img src={item.imageUrl} alt={item.brand} />
                                </div>
                                <div className="product__title">{item.brand}</div>
                                <div className="product__count">
                                    <div className="count">
                                        <div className="count__box">
                                            <input type="number" className="count__input" min="1" max="100" value={item.count} readOnly />
                                        </div>
                                        <div className="count__controls">
                                            <a href="/" className="count__up">
                                                <IoIosArrowUp />
                                            </a>
                                            <a href="/" className="count__down">
                                                <IoIosArrowDown />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="product__price">{item.price * item.count} ₽</div>
                                <div className="product__controls" onClick={() => removeFromCart(item.id)}>
                                    <RxCross2 />
                                </div>
                            </section>
                        ))}

                    

                    <footer class="cart-footer">
                        <div class="cart-footer__count">{cartItems.length}</div>
                        <div class="cart-footer__price">{totalPrice} ₽</div>
                    </footer>
                </section>

                

            </div>
        </div>
    </section>
  );
};

export default BasketWindow;