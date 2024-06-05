// Sign & Log in page
import { Link } from 'react-router-dom';
import style from './ChangePassword.module.css';
import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import ROUTES from '../../consts/Routes';





const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const generatePassword = () => {
      const length = 9;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let retVal = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
          retVal += charset[Math.floor(Math.random() * n)];
      }
      return retVal;
  };

  const handleGeneratePassword = () => {
      const password = generatePassword();
      setNewPassword(password);
  };

  
    return (
      <div className={style.container}>
        <div className={style.changePassword}>
          <h1>Change Password</h1>
          <div className={style.columns}>
            <div className={style.column}>
              <p>Old Password</p>
              <input 
                type="password" 
                placeholder="OldPassword" 
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
              <button onClick={handleGeneratePassword}>Generate Password</button>
              <p>New Password</p>
              <input 
                type="password" 
                placeholder="NewPassword" 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>           
          </div>
          <Link to={ROUTES.profile}>
            <button
              className={style.change}
              onClick={() => AuthService.changePassword(oldPassword, newPassword)}
            >
              Change Password
            </button>
          </Link>
          <button className={style.return} onClick={() => window.history.back()}>← Terug</button>
        </div>
      </div>
    );
  };
  
  export default ChangePassword;