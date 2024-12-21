import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useCart } from '../props/CartContext';
import '../css/basketStyle.css'

const BasketWindow = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();


  const totalQuantity = cartItems.reduce((a, b) => a + (b.count || 0), 0);
  const totalPrice = cartItems.reduce((a, b) => a + ((b.price || 0) * (b.count || 0)), 0);

    return (
      <section className="section-cart">
        <div className="section-cart__body">
          <div className="container_cart">
            <section className="cart">
              <header className="cart-header">
                <div className="cart-header__title">наименование</div>
                <div className="cart-header__count">количество</div>
                <div className="cart-header__cost">стоимость</div>
              </header>
  
              {cartItems.map((item) => (
                <section key={item.id} className="product">
                  <div className="product__img">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className="product__title">{item.name}</div>
                  <div className="product__count">
                    <div className="count">
                      <div className="count__box">
                        <input
                          type="number"
                          className="count__input"
                          min="1"
                          max={item.availableCount}
                          value={item.count || 1}
                          onChange={(e) => updateQuantity(item.id, e.target.value)}
                        />
                      </div>
                      <div className="count__controls">
                          <IoIosArrowUp onClick={() => updateQuantity(item.id, item.count + 1)} className="count__up_down"/>
                          <IoIosArrowDown onClick={() => updateQuantity(item.id, Math.max(1, item.count - 1))} className="count__up_down"/>
                      </div>
                    </div>
                  </div>
                  <div className="product__price">{item.price * item.count} ₽</div>
                  <div className="product__controls">
                    <RxCross2 onClick={() => removeFromCart(item.id)} className="remove-from-basket"/>
                  </div>
                </section>
              ))}
  
              <footer className="cart-footer">
                  {totalQuantity === 0 ? (
                    <div className="cart-footer__empty">Корзина пуста</div>
                      ) : (
                        <>
                          <div className="cart-footer__count">{totalQuantity} единицы</div>
                          <div className="cart-footer__price">{totalPrice} ₽</div>
                        </>
                      )}
                </footer>
            </section>
          </div>
        </div>
      </section>
    );
  };
  
  export default BasketWindow;