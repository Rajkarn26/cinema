import React, { useEffect, useState } from 'react';
import './Mains.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from '../assests/leo.jpeg';
import slide2 from '../assests/ava.jpg';
import slide3 from '../assests/gbu.jpg';
import slide4 from '../assests/mas.jpg';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const images = [slide1, slide2, slide3, slide4];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNavClick = () => setMenuOpen(false);

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/movieregister');
  };

  const handleViewList = () => {
    navigate('/movielist');
  };

  return (
    <div className="main-container">
      {/* Navbar */}
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


      {/* Section */}
      <div className="content-section">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center text-center mb-4 mb-lg-0">
              <p className="animated-text">Where Passion Meets the Big Screen!</p>
              <button className="register-btn" onClick={handleRegisterClick}>Register Now →</button>
            </div>

            <div className="col-lg-6 text-center">
              <div className="carousel-container">
                <img src={images[slideIndex]} alt="Slide" className="carousel-img" />
                <div className="carousel-controls">
                  <button onClick={prevSlide} className="arrow-btn">❮</button>
                  <button onClick={nextSlide} className="arrow-btn">❯</button>
                </div>
                <div className="dots-container">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${index === slideIndex ? 'active' : ''}`}
                    ></span>
                  ))}
                </div>
              </div>
              <button className="view-btn mt-3" onClick={handleViewList}>
                Watch Movie List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
