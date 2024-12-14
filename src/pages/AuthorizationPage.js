import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizationForm from '../components/AuthorizationForm';
import '../css/styleLogin.css'

const AuthorizationPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [buttonText, setButtonText] = useState('Отправить код');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
        interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
    } else if (timer === 0) {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const sendCode = async () => {
      try {
        const response = await fetch('http://85.208.87.56/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
  
        if (!response.ok) {
          throw new Error('Не удалось отправить код');
        }

        
        setIsCodeSent(true);
        setMessage('Письмо с кодом было отправлено на ваш почтовый адрес');
        setButtonText('Войти');  
        setIsTimerActive(true);
        setTimer(30);
      } catch (error) {
        setMessage('Ошибка: ' + error.message);
      }
    }

    const confirmCode = async () => {
      try {
        const response = await fetch('http://85.208.87.56/api/v1/auth/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, otp })
        });
  
        if (!response.ok) {
          throw new Error('Некорректный код');
        }

        const token = await response.text()
        localStorage.setItem("authToken", token);

        setMessage('Вход успешен');
        navigate('/ProductPage');
      } catch (error) {
        setMessage('Ошибка: ' + error.message);
      }
    };
  
  const handleSendCode = (e) => {
    e.preventDefault();
    if (buttonText === 'Отправить код') {
      sendCode();
      } 
    else if (otp.length !== 8){
      setMessage('Неверный код');
    }
      else {       
        confirmCode();
      }
  };


  return ( 
    <body class = "bodyLogin">
    <div class="container">
      <div class="login form">
      <div class="ellipse"></div>
      <div class="rectangle"></div>
      <div class="ellipse2"></div>
      <div class="rectangle2"></div>
      {message && <p class = "message">{message}</p>} {}
      <header>Авторизация</header>
      <AuthorizationForm
        email={email}
        setEmail={setEmail}
        handleSendCode = {handleSendCode}
        code={otp}
        setCode={setCode}
        isCodeSent={isCodeSent}
        buttonText={buttonText}
        isTimerActive={isTimerActive}
        timer={timer}
        sendCode = {sendCode}
      />
    </div>
  </div>
  </body>
  );
};

export default AuthorizationPage;