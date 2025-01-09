import React from 'react';
import '../css/modal.css'
import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, product, onClose}) => {
  if (!isOpen) return null;

  return (
    <div class="modal-overlay">
      <div class="modal-content">
      <RxCross2 className="cross-icon" onClick={onClose}/>
        <h2 class = "modal-component productName">{product.name}</h2>
        <p class = "modal-component">{product.description}</p>
        <p class = "modal-component countProduct"><strong>Количество:</strong> {product.count}</p>
      </div>
    </div>
  );
};

export default Modal;