import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import '../css/product.css'

import mockProducts from '../mock/mockData';
import Card from '../components/Card';
import Modal from '../components/Modal';


const ProductPage = () => {
  const [ showNav, setShowNav] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <body class = "productPage" onMouseEnter={() => setShowNav(true)}>
      <header class = "menu" >
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <h1>Товары</h1>
        </header>
        <Navbar show = {showNav}/>     
        <div className="cont container_cards">
        {mockProducts.map((product) => (
          <Card 
            key={product.id} 
            product={product}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>  
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
      />       
    </body>
  );
}

export default ProductPage;
