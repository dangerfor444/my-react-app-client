import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import '../css/product.css'


import Card from '../components/Card';
import Modal from '../components/Modal';


const ProductPage = () => {
  const [ showNav, setShowNav] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [minPrice, setMinPrice] = useState(''); 
  const [maxPrice, setMaxPrice] = useState(''); 
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://85.208.87.56/api/v1/goods');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке продуктов: ' + response.statusText);
            }

            const data = await response.json();
            //console.log('Полученные товары:', data)
            setProducts(data.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                availableCount: item.count,
              })));
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const priceMatch = (minPrice === '' || product.price >= Number(minPrice)) &&
                       (maxPrice === '' || product.price <= Number(maxPrice));
  
    const nameMatch = searchQuery === '' || (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
    return priceMatch && nameMatch;
  });
  return (
    <body class = "productPage" onMouseEnter={() => setShowNav(true)}>
      <header class = "menu" >
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <h1>Товары</h1>
        </header>
        <Navbar show = {showNav}/>

       
        <div className="price-filters">

        <div className="search-container">
        <IoSearchOutline className='iconSearch'/>
        <input className='searchInput'
          type="text"
          placeholder="Поиск по наименованию товара"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

        <h2>Цена</h2>
        <div className="input-container">
          <input
            type="number"
            placeholder="от"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          {minPrice && (
            <span className="clear-icon" onClick={() => setMinPrice('')}>✖</span>
          )}
        </div>
        <div className="input-container">
          <input
            type="number"
            placeholder="до"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          {maxPrice && (
            <span className="clear-icon" onClick={() => setMaxPrice('')}>✖</span>
          )}
        </div>
      </div>

        <div className="cont container_cards">
        {filteredProducts.map((product) => (
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
