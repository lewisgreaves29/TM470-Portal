import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import '../../styles/LoginPage.css';
import '../../styles/Shared.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();  // Get the navigate function

  const isValidEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  };

  const handleLogin = () => {
    if (!isValidEmail(username)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Reset error and continue with login if email is valid
    setError(null);

    // Navigate to the Accounts page
    navigate('/accounts');
  };

  const handleRegister = () => {
    // Navigate to the Register page
    navigate('/register');
  };

  return (
    <div className="login-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <div className="login-box">
        <input 
          type="text" 
          placeholder="Username (Email)" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default LoginPage;