import React, { useState } from 'react';
import './Contact.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [responseType, setResponseType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');
    setResponseType('');
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:5000/contact_api', formData);
      setResponseMessage('✅ Message sent successfully!');
      setResponseType('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setResponseMessage('❌ Something went wrong. Please try again.');
      setResponseType('error');
    }

    setTimeout(() => {
      setResponseMessage('');
      setResponseType('');
    }, 3000);
  };

  return (
    <div className="main-container">
      <nav className="navbar-container">
        <div className="navbar-left">
          <div className="logo-icon"></div>
          <span className="brand-title">BlueStar</span>
        </div>
        <div className="navbar-right">
          <button onClick={() => navigate('/main')}>Home</button>
          <button onClick={() => navigate('/about')}>About</button>
          <button onClick={() => navigate('/contact')}>Contact</button>
        </div>
      </nav>

      <div className="form-wrapper">
        <div className="form-section">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="form-error">{errors.name}</div>}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {responseMessage && <div className="modal-overlay"></div>}
      {responseMessage && (
        <div className={`response-modal ${responseType}`}>
          <div className="icon">{responseType === 'success' ? '✔️' : '❌'}</div>
          <div className="text">{responseMessage}</div>
        </div>
      )}
    </div>
  );
};

export default Contact;
