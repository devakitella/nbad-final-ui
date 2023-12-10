import React, { useState } from 'react';
import '../App.css';
import NavBar from '../navbar/navbar';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear validation error on change
  };

  const validateForm = () => {
    setFormMessage('');
    let errors = {};
    let isValid = true;

    // Empty field validation
    Object.keys(formData).forEach((fieldName) => {
      if (!formData[fieldName].trim()) {
        errors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        isValid = false;
      }
    });

    // Email validation
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    // Phone number validation
    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number (10 digits)';
      isValid = false;
    }

    // Password validation
    if (formData.password.trim().length < 6) {
        errors.password = 'Password should be at least 6 characters long';
        isValid = false;
    }

    // Confirm Password validation
    if (formData.confirmPassword.trim() !== formData.password.trim()) {
        errors.confirmPassword = 'Passwords do not match';
        isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://192.81.209.146:4005/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
          // Handle success
          setFormMessage('Registration successful');
          console.log('Registration successful:', data);
        } else {
          // Handle errors
          if (data.error.includes('Duplicate entry')) {
            setFormMessage('Email is already registered');
          } else {
            setFormMessage(`Registration failed: ${data.error}`);
          }
          console.error('Registration failed:', data.error);
        }
      } catch (error) {
        setFormMessage('Error during registration');
        console.error('Error during registration:', error);
      }
    }
  };

  return (
    <>
      <NavBar/>
      <div className="page-h">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3>Signup</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <form onSubmit={handleSubmit}>
                  <fieldset className="col-md-6">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name..."
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {formErrors.firstName && (
                      <p className="error-message">{formErrors.firstName}</p>
                    )}
                  </fieldset>
                  <fieldset className="col-md-6">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name..."
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {formErrors.lastName && (
                      <p className="error-message">{formErrors.lastName}</p>
                    )}
                  </fieldset>
                  <fieldset className="col-md-6">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email..."
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {formErrors.email && (
                      <p className="error-message">{formErrors.email}</p>
                    )}
                  </fieldset>
                  <fieldset className="col-md-6">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone..."
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {formErrors.phone && (
                      <p className="error-message">{formErrors.phone}</p>
                    )}
                  </fieldset>
                  <fieldset className="col-md-6">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password..."
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {formErrors.password && (
                      <p className="error-message">{formErrors.password}</p>
                    )}
                  </fieldset>
                  <fieldset className="col-md-6">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm..."
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {formErrors.confirmPassword && (
                      <p className="error-message">
                        {formErrors.confirmPassword}
                      </p>
                    )}
                  </fieldset>
                  <fieldset className="col-md-6">
                    <button type="submit" className="main-button">
                      Submit
                    </button>
                  </fieldset>
                  <div className="form-message">
                    {formMessage && (
                      <h1
                        className={
                          formMessage.includes('successful')
                            ? 'success-message'
                            : 'error-message'
                        }
                      >
                        {formMessage}
                      </h1>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
