import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cinema from '../assests/cinematwo.jpeg';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      newErrors.username = 'Give a Valid Username 😄';
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      newErrors.password = 'Password must be strong 🔐';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:5000/login_api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.message); // Login successful
          setUsername('');
          setPassword('');
          setErrors({});
          navigate('/main');
        } else {
          alert(data.message); // Invalid credentials or error
        }
      } catch (error) {
        alert('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="main">
      <div className="row h-100">
        <div className="col-lg-6 mainone">
          <div className="maintwo">
            <h2 style={{ color: 'white', fontWeight: 'bold'}}>𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐁𝐥𝐮𝐞𝐒𝐭𝐚𝐫!!!!!🎬</h2>
            <p style={{ color: 'white', fontWeight: 'bold'}}>𝐻𝑒𝓎 𝒲𝑒𝓁𝒸𝑜𝓂𝑒 𝒴𝑜𝓊 𝒯𝑜 𝐵𝓁𝓊𝑒𝒮𝓉𝒶𝓇!!!</p>
            <form className="mt-3 mainform" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 labels">UserName</label> <br />
                <input
                  className="inputs mb-2"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <div className="inputss">{errors.username}</div>
                )}
              </div>
              <div className="mb-2 password-wrapper">
                <label className="mb-1 labels">Password</label> <br />
                <div className="position-relative">
                  <input
                    className="inputs"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="password-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </span>
                </div>
                {errors.password && (
                  <div className="inputss">{errors.password}</div>
                )}
              </div>
              <button className="buttons">Login</button>
              <div className="mt-2">
                <Link to="/forgot-password" className="small mt-5">
                  Forgot Password?
                </Link>
                <br />
                <Link to="/register" className="small">
                  Create New Account
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6 d-none d-lg-block p-0">
          <div className="image-wrapper">
            <img src={cinema} alt="cinema" className="centered-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
