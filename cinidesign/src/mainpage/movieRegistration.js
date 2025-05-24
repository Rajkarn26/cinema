import React, { useState } from 'react';
import './movieRegistration.css';
import { useNavigate } from 'react-router-dom';

function MovieRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    movieName: '',
    movieNumber: '',
    actorName: '',
    directorName: '',
    email: '',
    countryCode: '+91',
    mobile: '',
    releaseDate: '',
    image: null,
    description: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = ['movieName', 'movieNumber', 'actorName', 'directorName', 'email', 'mobile', 'releaseDate', 'image'];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `Please enter ${field.replace(/([A-Z])/g, ' $1')}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      try {
        const res = await fetch('http://localhost:5000/movie_register_api', {
          method: 'POST',
          body: form,
        });

        const data = await res.json();

        if (res.status === 201) {
          alert(data.message || '✅ Movie registered successfully!');
          e.target.reset();
          navigate('/main')
          setFormData({
            movieName: '',
            movieNumber: '',
            actorName: '',
            directorName: '',
            email: '',
            countryCode: '+91',
            mobile: '',
            releaseDate: '',
            image: null,
            description: '',
          });
          setErrors({});
        } else if (data.warnings) {
          alert(data.warnings.join('\n'));
        } else {
          alert('❌ Error: ' + data.message);
        }
      } catch (error) {
        console.error(error);
        alert('❌ Server error');
      }
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form-frame">
        <h2 className="form-title">🎬 Movie Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {[{ label: 'Movie Name', name: 'movieName' },
              { label: 'Movie Number', name: 'movieNumber' },
              { label: 'Actor Name', name: 'actorName' },
              { label: 'Director Name', name: 'directorName' },
            ].map(({ label, name }) => (
              <div className="col-md-6 form-group" key={name}>
                <label>{label}</label>
                <input type="text" name={name} value={formData[name]} onChange={handleChange} />
                {errors[name] && <div className="input-error">{errors[name]}</div>}
              </div>
            ))}

            <div className="col-md-6 form-group">
              <label>Phone Number</label>
              <div className="d-flex country-mobile">
                <select name="countryCode" value={formData.countryCode} onChange={handleChange}>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input type="tel" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} />
              </div>
              {errors.mobile && <div className="input-error">{errors.mobile}</div>}
            </div>

            <div className="col-md-6 form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <div className="input-error">{errors.email}</div>}
            </div>

            <div className="col-md-6 form-group">
              <label>Expected Release Date</label>
              <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
              {errors.releaseDate && <div className="input-error">{errors.releaseDate}</div>}
            </div>

            <div className="col-md-6 form-group">
              <label>Movie Poster</label>
              <input type="file" name="image" accept="image/*" onChange={handleChange} />
              {errors.image && <div className="input-error">{errors.image}</div>}
            </div>

            <div className="col-12 form-group">
              <label>Description (Optional)</label>
              <textarea name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
            </div>
          </div>
          <button type="submit" className="register-btn">Register 🎟️</button>
        </form>
      </div>
    </div>
  );
}

export default MovieRegistration;
