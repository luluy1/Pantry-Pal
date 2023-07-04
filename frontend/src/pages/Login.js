import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './login.css';

const Login = () => {
  const [today, setToday] = useState('');
  const [error, setError] = useState('');
  const cookies = new Cookies();
  const BASE_URL = 'http://localhost:8000';

  const handleLogin = () => {
    if (today) {
      cookies.remove(today, { path: '/' });
      cookies.set('today', today, { path: '/' });
      // Perform the redirection here if needed
    } else {
      setError('Please enter the date for today.');
    }
  };

  return (
    <div className="Login-Container">
      <h2 className='Title'>groceries set-up</h2>
      <div>
        <input
          type="text"
          value={today}
          onChange={(e) => setToday(e.target.value)}
          placeholder='enter the date for today'
        />
        {today ? (
          <Link to="/input">
            <Button variant="primary" onClick={() => handleLogin()}>go!</Button>
          </Link>
        ) : (
          <Button variant="primary" onClick={() => handleLogin()}>go!</Button>
        )}
      </div>
      
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
