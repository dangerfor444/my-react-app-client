import React, { useState, useEffect } from 'react';
import '../css/formDelivery.css'
import { useCart } from '../props/CartContext';


const RecipientsForm = () => {

  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((a, b) => a + b.quantity, 0)

  const [selectedDelivery, setSelectedDelivery] = useState(''); 
  const [selectedPayment, setSelectedPayment] = useState(''); 
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchDeliveryMethods = async () => {
      try {
        const response = await fetch('http://85.208.87.56/api/v1/delivery-methods');
        if (!response.ok) {
          throw new Error('Ошибка');
        }
        const data = await response.json();
        setDeliveryMethods(data);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchDeliveryMethods();
  }, []);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch('http://85.208.87.56/api/v1/payment-methods');
        const data = await response.json();
        setPaymentMethods(data);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };
    fetchPaymentMethods();
  }, []);

  const handleDeliverySelection = (e) => {
    const selectedOption = e.target.value;
    setSelectedDelivery(selectedOption);
  };

  const handlePaymentSelection = (e) => {
    const selectedOption = e.target.value;
    setSelectedPayment(selectedOption);
  };

  const initialFormData = {
    firstName: '',
    lastName: '',
    middleName: '',
    address: '',
    zipCode: '',
    phone: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['firstName', 'lastName', 'middleName'].includes(name) && !/^[а-яА-ЯёЁa-zA-Z]*$/.test(value)) {
      return; 
    }

    if (name === 'zipCode' && !/^\d*$/.test(value)) {
      return; 
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalQuantity === 0) { 
      alert('Ваша корзина пуста. Добавьте товары, чтобы завершить оформление заказа.'); 
      return; 
    }

    const payload = {
      ...formData,
  };

  console.log('Отправляемые данные:', payload);
    let recipientId = 0;
    try {
      const token = localStorage.getItem('authToken'); 
      const response = await fetch('http://85.208.87.56/api/v1/recipients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Status ' + response.status);
      }

      const recipientData = await response.json();
      recipientId = recipientData.id;
      console.log(recipientId)
      console.log(recipientData)

      setFormData(initialFormData);
      setSelectedDelivery('');
      setSelectedPayment('');
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
    <h2>Оформление</h2>
    
    <div className="form-group">
      <label>Имя:</label>
      <input type="text" 
      name="firstName" 
      value={formData.firstName} 
      onChange={handleChange} 
      placeholder="Имя"
      maxLength={30}
      required />
    </div>
    
    <div className="form-group">
      <label>Фамилия:</label>
      <input type="text" 
      name="lastName" 
      value={formData.lastName} 
      onChange={handleChange} 
      placeholder="Фамилия"
      maxLength={30}
      required />
    </div>

    <div className="form-group">
      <label>Отчество:</label>
      <input type="text" 
      name="middleName" 
      value={formData.middleName} 
      onChange={handleChange} 
      placeholder="Отчество"
      maxLength={30}
      required />
    </div>

    <div className="form-group">
      <label>Адрес:</label>
      <input type="text" 
      name="address" 
      value={formData.address} 
      onChange={handleChange} 
      placeholder="Адрес"
      maxLength={100} 
      required />
    </div>

    <div className="form-group">
      <label>Почтовый индекс:</label>
      <input type="text" 
      name="zipCode" 
      value={formData.zipCode} 
      onChange={handleChange} 
      placeholder="Почтовый индекс"
      maxLength={6} 
      required />
    </div>

    <div className="form-group">
      <label>Телефон:</label>
      <input type="tel" 
      name="phone" 
      value={formData.phone}
      onChange={handleChange} 
      placeholder="Телефон"
      maxLength={30} 
      required />
    </div>

    <div className="form-group">
        <label>Способ доставки:</label>
        <select
          id="delivery-method"
          value={selectedDelivery}
          onChange={handleDeliverySelection}
          required
        >
          <option value="" disabled={selectedDelivery}>Выберите способ доставки</option>
          {deliveryMethods.map(method => (
            <option key={method.id} value={method.title}>
              {method.title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Способ оплаты:</label>
        <select
          id="payment-method"
          value={selectedPayment}
          onChange={handlePaymentSelection}
          required
        >
          <option value="" disabled={selectedPayment}>Выберите способ оплаты</option>
          {paymentMethods.map(method => (
            <option key={method.id} value={method.title}>
              {method.title}
            </option>
          ))}
        </select>
      </div>
    <button class = "confirm-order" type="submit">Подтвердить заказ</button>
  </form>
  );
};

export default RecipientsForm;