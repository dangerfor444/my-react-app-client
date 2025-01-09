import React, { useState, useEffect } from 'react';
import { useCart } from '../props/CartContext';

const Card = ({ product, onOpenModal }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const isAlreadyInCart = cartItems.some(item => item.id === product.id);
    setIsInCart(isAlreadyInCart);
  }, [cartItems, product.id]);

  const handleTitleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
    onOpenModal(product); 
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (isInCart) {
        removeFromCart(product.id); 
        setIsInCart(false);
    } else if (product.count > 0 && (!existingItem || (existingItem.count < product.count))) {
        addToCart({ ...product, quantity: 1 });
        setIsInCart(true);
    } else {
        alert('Товар закончился');
    }
};

  return (
<div class="card glass">
  <div class="card__top">
    <div class="card__image">
      <img src={product.image} alt={product.name} onClick={handleTitleClick}/>
    </div>
  </div>
  <div class="card__bottom">
    <div class="card__prices">
      <div class="card__price card__price--common">{product.price} ₽</div>
    </div>
    <p class="card__title" 
    onClick={handleTitleClick}
    >{product.name}</p>
    <button 
    class={`card__add ${isInCart ? 'card__add--added' : ''}`}
    onClick={handleAddToCart}
    >
      {isInCart ? 'Добавлено' : 'В корзину'}
    </button>
  </div>
</div>
  );
}

export default Card;