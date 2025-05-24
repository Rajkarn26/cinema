import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cinema from '../assests/cinemathree.jpeg';
import './LoginPage.css';

const ForgetPasswordPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      newErrors.username = 'Enter a valid username 😄';
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
        const response = await fetch('https://endcini.onrender.com/forgot_password_api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, newPassword: password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          setUsername('');
          setPassword('');
          setErrors({});
        } else {
          alert(data.message);
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
            <h2 style={{ color: 'white', fontWeight: 'bold'}}>𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐁𝐥𝐮𝐞𝐒𝐭𝐚𝐫!!🎬</h2>
            <p style={{ color: 'white', fontWeight: 'bold'}}>𝑅𝑒𝓈𝑒𝓉 𝓎𝑜𝓊𝓇 𝓅𝒶𝓈𝓈𝓌𝑜𝓇𝒹 𝒽𝑒𝓇𝑒!!!🔐</p>
            <form className="mt-3 mainform" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 labels">Username</label><br />
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
                <label className="mb-1 labels">Password</label><br />
                <div className="position-relative">
                  <input
                    className="inputs"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter New Password"
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
              <button className="buttons">Reset Password</button>
              <div className="mt-2">
                <Link to="/register" className="small">Create New Account</Link><br />
                <Link to="/" className="small">Back to Login Page</Link>
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

export default ForgetPasswordPage;
