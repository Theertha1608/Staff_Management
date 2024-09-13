import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './signup.css';  

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:5000/user/signup', formData);
      console.log(response.data);
      alert('Signup successful');
    } catch (error) {
      console.error('Error during signup', error);
      alert('Error during signup');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.name && touched.name ? 'error' : ''}`}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input"
            />
            {errors.name && touched.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className={`form-group ${errors.email && touched.email ? 'error' : ''}`}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input"
            />
            {errors.email && touched.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className={`form-group ${errors.password && touched.password ? 'error' : ''}`}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input"
            />
            {errors.password && touched.password && <p className="error-text">{errors.password}</p>}
          </div>
          <button type="submit" className="form-button">Signup</button>
        </form>
        <p className="signin-prompt">
          Already have an account? <Link to="/signin" className="signin-link">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
