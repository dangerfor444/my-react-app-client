import React, { useState } from 'react';
import '../css/formDelivery.css'
import { useCart } from '../props/CartContext';
import sdekLogo from '../components/cdek-logo.png'
import russiaLogo from '../components/russia.png'
import dpdLogo from '../components/dpd-logo.png'
import sbpLogo from '../imageLogo/SBP.svg'
import sberLogo from '../imageLogo/SberPay.png'
import tinkoffLogo from '../imageLogo/tinkoff.png'

const RecipientsForm = () => {

  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((a, b) => a + b.quantity, 0)

  const [selectedDelivery, setSelectedDelivery] = useState(''); 
  const [selectedPayment, setSelectedPayment] = useState(''); 

  const handleDeliverySelection = (option) => {
    setSelectedDelivery(option);
  };

  const handlePaymentSelection = (option) => {
    setSelectedPayment(option);
  };

  const initialFormData = {
    firstName: '',
    lastName: '',
    middleName: '',
    address: '',
    zipCode: '',
    phone: '',
    deliveryMethod: '',
    paymentMethod: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (totalQuantity === 0) { 
      alert('Ваша корзина пуста. Добавьте товары, чтобы завершить оформление заказа.'); 
      return; 
    }
    console.log('Данные формы:', formData);

    setFormData(initialFormData);
    setSelectedDelivery('');
    setSelectedPayment('');
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

    <fieldset>
        <legend>Способ доставки</legend>
        <div className="form__radios">
          {['sdek', 'russia', 'dpd'].map(method => (
            <div
              key={method}
              className={`form__radio ${selectedDelivery === method ? 'selected' : ''}`}
              onClick={() => handleDeliverySelection(method)}
            >
              <img src={method === 'sdek' ? sdekLogo : method === 'russia' ? russiaLogo : dpdLogo} alt={method} className="icon-delivery" />
              <input
                type="radio"
                id={method}
                name="delivery-method"
                value={method}
                checked={selectedDelivery === method}
                readOnly
                style={{ display: 'none' }}
              />
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Способ оплаты</legend>
        <div className="form__radios">
          {['sbp', 'sber', 'tinkoff'].map(method => (
            <div
              key={method}
              className={`form__radio ${selectedPayment === method ? 'selected' : ''}`}
              onClick={() => handlePaymentSelection(method)}
            >
              <img src={method === 'sbp' ? sbpLogo : method === 'sber' ? sberLogo : tinkoffLogo} alt={method} className="icon-delivery" />
              <input
                type="radio"
                id={method}
                name="payment-method"
                value={method}
                checked={selectedPayment === method}
                readOnly
                style={{ display: 'none' }}
              />
            </div>
          ))}
        </div>
      </fieldset>
    <button class = "confirm-order" type="submit">Подтвердить заказ</button>
  </form>
  );
};

export default RecipientsForm;