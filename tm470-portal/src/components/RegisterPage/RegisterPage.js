import React, { useState } from 'react';
import '../../styles/LoginPage.css';
import '../../styles/Shared.css';

const RegisterPage = (props) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const isValidEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  };

  const handleRegister = () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Reset error and continue with registration if email is valid
    setError(null);

    // For now, just navigate to the Accounts page
    props.history.push('/accounts');
  };

  return (
    <div className="register-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <div className="register-box">
        <input 
          type="text" 
          placeholder="First Name" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Surname" 
          value={surname} 
          onChange={(e) => setSurname(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default RegisterPage;