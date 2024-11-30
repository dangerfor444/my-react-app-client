import React, { useState } from 'react';
import { useCart } from '../props/CartContext';

const Card = ({ product, onOpenModal }) => {

  const [isInCart, setIsInCart] = useState(false);
  const { addToCart } = useCart();

  const handleTitleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
    onOpenModal(product); 
  };

  const handleAddToCart = () => {
    addToCart(product);
    setIsInCart(true);  
  };

  return (
<div class="card glass">
  <div class="card__top">
    <div class="card__image">
      <img src={product.imageUrl} alt="title" onClick={handleTitleClick}/>
    </div>
  </div>
  <div class="card__bottom">
    <div class="card__prices">
      <div class="card__price card__price--common">{product.price} ₽</div>
    </div>
    <p class="card__title" 
    onClick={handleTitleClick}
    >{product.brand}</p>
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