import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cinema from '../assests/cinemafour.jpeg';
import './LoginPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!usernameRegex.test(username)) {
      newErrors.username = 'Give a Valid Username 😄';
    }

    if (!emailRegex.test(email)) {
      newErrors.email = 'Email is not valid 🤔';
    }

    if (!strongPasswordRegex.test(password)) {
      newErrors.password = 'Give Strong Password 🔐';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match 🔐';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('https://endcini.onrender.com/register_api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
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
    <div className='main'>
      <div className='row h-100'>
        <div className='col-lg-6 mainone'>
          <div className='maintwo'>
            <h2 style={{ color: 'white', fontWeight: 'bold'}}>𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐁𝐥𝐮𝐞𝐒𝐭𝐚𝐫!!🎬</h2>
            <p style={{ color: 'white', fontWeight: 'bold'}}>𝐻𝑒𝓎 𝒲𝑒𝓁𝒸𝑜𝓂𝑒 𝒴𝑜𝓊 𝒯𝑜 𝐵𝓁𝓊𝑒𝒮𝓉𝒶𝓇!!!</p>
            <form className='mt-2 mainform' onSubmit={handleSubmit}>
              <div>
                <label className='mb-1 labels'>UserName</label> <br />
                <input
                  className='inputs mb-2'
                  type='text'
                  placeholder='Enter Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <div className="inputss">{errors.username}</div>
                )}
              </div>

              <div>
                <label className='mb-1 labels'>Email</label> <br />
                <input
                  className='inputs mb-2'
                  type='text'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="inputss">{errors.email}</div>
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
                    style={{ pointerEvents: 'auto' }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </span>
                </div>
               {errors.password && (
                  <div className="inputss">{errors.password}</div>
                )}
              </div>

              <div className="mb-3 password-wrapper">
                <label className="mb-1 labels">Confirm Password</label> <br />
                <div className="position-relative">
                  <input
                    className="inputs"
                    type={showPasswords ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="password-icon"
                    onClick={() => setShowPasswords(!showPasswords)}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {showPasswords ? '🙈' : '👁️'}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <div className="inputss">{errors.confirmPassword}</div>
                )}      
              </div>

              <button className='buttons' type="submit">Create</button>
              <div className="mt-2">
                <Link to="/" className="small">Back to Login Page</Link>
              </div>
            </form>
          </div>
        </div>

        <div className='col-lg-6 d-none d-lg-block p-0'>
          <div className="image-wrapper">
            <img src={cinema} alt="cinema" className="centered-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
