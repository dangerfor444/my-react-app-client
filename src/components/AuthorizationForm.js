import React from 'react';

import ReactCodeInput from 'react-code-input';


const AuthorizationForm = ({ email, setEmail, handleSendCode , code, setCode, isCodeSent, buttonText, isTimerActive, timer, sendCode }) => {

  return (
  <form className = "form-auth" onSubmit={handleSendCode}>
  <input 
    type="email" 
    placeholder="Email" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
    required 
  />
  {isCodeSent && (
    <ReactCodeInput 
    name="code" 
    value={code}
    inputStyle={{
        width: '20px', 
        height: '40px', 
        fontSize: '15px', 
        textAlign: 'center',
        outline: 'none',
    }} 
    fields={8} 
    onChange={setCode} 
    />
    )}
  <button type="submit" class = "button">{buttonText}</button>   
  {isTimerActive && (
    <div class = "resendContainer">
    <p>{timer}</p>
    <button class = "resendButton" onClick={sendCode} disabled={timer > 0}>
    <p>Отправить код ещё раз</p>
    </button>
    </div>
  )}  
  </form>
  );
};

export default AuthorizationForm;