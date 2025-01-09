import React, { useState } from 'react';

const Order = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [areItemsVisible, setAreItemsVisible] = useState(false); 

  const toggleOrderDetails = () => {
    setIsOpen(!isOpen); 
  };

  const toggleItemsVisibility = () => {
    setAreItemsVisible(!areItemsVisible); 
  };


  return (
    <div className={`order-card ${isOpen ? 'open' : ''}`}>
      <div className='header-items'>
      <p><strong>ID заказа:</strong> #{order.id}</p>
      <button onClick={toggleItemsVisibility} className="toggle-items-button">
        {areItemsVisible ? '▲ Скрыть товары' : '▼ Показать товары'}
      </button>
      </div>
      {areItemsVisible && (
        <div className="product-info">
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                  {item.name} - <span className="item-count">Количество: {item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p><strong>Общая стоимость:</strong> {order.paymentTotal} ₽</p>


      <button onClick={toggleOrderDetails} className="toggle-button">
        {isOpen ? '▲ Скрыть' : '▼ Детали заказа'}
      </button>

      {isOpen && (
        <div className="order-details">
        <div className="grid-container">
          <div className="grid-item">
            <strong>ФИО:</strong> {order.recipient.LastName} {order.recipient.FirstName} {order.recipient.MiddleName}
          </div>
          <div className="grid-item">
            <strong>Телефон:</strong> {order.recipient.Phone}
          </div>
          <div className="grid-item">
            <strong>Адрес:</strong> {order.recipient.Address}
          </div>
          <div className="grid-item">
            <strong>Почтовый индекс:</strong> {order.recipient.ZipCode}
          </div>
          <div className="grid-item">
            <strong>Способ оплаты:</strong> {order.paymentMethod.title}
          </div>
          <div className="grid-item">
            <strong>Способ доставки:</strong> {order.deliveryMethod.title}
          </div>
          <div className="grid-item" style={{ gridColumn: 'span 2' }}>
            <strong>Дата и время заказа:</strong> {new Date(order.dateTime).toLocaleString()}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Order;