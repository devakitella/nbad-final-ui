import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import NavBar from '../navbar/navbar';

function SignIn() {
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear validation error on change
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    }

    // Password validation
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://192.81.209.146:4005/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
          // Handle success
          setFormMessage('Login successful');
          console.log('Login successful:', data);
          
          // Store the token in local storage
          localStorage.setItem('token', data.token);

          // Redirect to the add budgets page
          navigate('/addbudget');
        } else {
          // Handle errors
          if (response.status === 401) {
            setFormMessage('Incorrect email or password');
          } else if (response.status === 404) {
            setFormMessage('User not found');
          } else {
            setFormMessage(`Login failed: ${data.message}`);
          }
          console.error('Login failed:', data.message);
        }
      } catch (error) {
        setFormMessage('Error during login');
        console.error('Error during login:', error);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="page-h">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3>SignIn</h3>
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
                  <fieldset className="col-md-12">
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
                  <fieldset className="col-md-12">
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
                    <button id="submitlogin" type="submit" className="main-button">
                      Submit
                    </button>
                  </fieldset>
                  <div className="form-message">
                    {formMessage && (
                      <h1 className={formMessage.includes('successful') ? 'success-message' : 'error-message'}>
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

export default SignIn;
