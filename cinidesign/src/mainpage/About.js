import React from 'react';
import './about.css';
import { useNavigate } from 'react-router-dom';

function About() {

    const navigate = useNavigate();

  return (
    <div className="about-container">

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
      <section className="hero">
        <div className="hero-content">
          <h1>🎥 Welcome to BlueStar</h1>
          <p>Where movies come to life through creative thinking and clean design.</p>
        </div>
      </section>

      <section className="info-section">
        <h2>About This Project</h2>
        <p>
          BlueStar is a React-based web application designed to showcase and manage movies name. 
          It features dynamic filtering, editing, and an engaging user interface that brings 
          simplicity and style together.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🎬 Movie Management</h3>
            <p>Add, edit, delete, and view movies with ease.</p>
          </div>
          <div className="feature-card">
            <h3>🧠 Smart Search</h3>
            <p>Filter movies by name or actor seamlessly.</p>
          </div>
          <div className="feature-card">
            <h3>📱 Responsive UI</h3>
            <p>Optimized for desktops and mobile devices.</p>
          </div>
          <div className="feature-card">
            <h3>✨ Creative UI</h3>
            <p>Stylish design with modern visuals and layout.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
