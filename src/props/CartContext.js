import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('authToken'); 
                const response = await fetch('http://85.208.87.56/api/v1/basket', {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`, 
                    },
                });

                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }
                   
                const data = await response.json();
                console.log(data);
                setCartItems(data.items);
            } catch (error) {
                console.error('Ошибка при получении товаров из корзины с сервера:', error);
            }
        };

        fetchCartItems();
    }, []);

    const addToCart = async (product) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find(item => item.id === product.id);
            if (itemExists) {
                return prevItems.map(item => 
                    item.id === product.id 
                    ? { ...item, count: item.count + 1 } 
                    : item
                );
            }
            return [...prevItems, { ...product, count: 1 }]; 
        });

        try {
            const token = localStorage.getItem('authToken'); 

            console.log('Добавление товара в корзину:', product.id);

            const requestBody = {
                goodId: product.id
            };
    
            const response = await fetch(`http://85.208.87.56/api/v1/basket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }
            
        } catch (error) {
            console.error('Ошибка при добавлении товара в корзину на сервере:', error);
        }
    };

    const removeFromCart = async (basketItemId) => {

        setCartItems((prevItems) => prevItems.filter(item => item.id !== basketItemId));

        try {
            const token = localStorage.getItem('authToken'); 

            console.log('Удаление товара из корзины:', basketItemId);
    
            const response = await fetch(`http://85.208.87.56/api/v1/basket/${basketItemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка при удалении товара: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Ошибка при удалении товара из корзины на сервере:', error);
        }
    };

    const updateQuantity = async (id, newValue) => {
        const parsedValue = parseInt(newValue, 10);
        
        if (isNaN(parsedValue) || parsedValue < 1) {
            return; 
        }
    
         setCartItems(prevItems => 
            prevItems.map(item => {
                if (item.id === id) {               
                    return { ...item, count: parsedValue }; 
                }
                return item; 
            })
        );
 
        const requestBody = {
            goodId: id,
            count: parsedValue 
        };

        try {
            const token = localStorage.getItem('authToken'); 
 
            const response = await fetch(`http://85.208.87.56/api/v1/basket`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
 
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }
 
        } catch (error) {
            console.error('Ошибка при обновлении количества товара на сервере:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};