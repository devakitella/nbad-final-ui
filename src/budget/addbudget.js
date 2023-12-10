import React, { useState } from 'react';
import LoginNavBar from '../navbar/navbar-login';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import RefreshToken from '../signin/refreshtoken';
function AddBudget() {
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    category: '',
    budgetAmount: ''
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

    // Empty field validation
    Object.keys(formData).forEach((fieldName) => {
      if (!formData[fieldName].trim()) {
        errors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        isValid = false;
      }
    });

    // Budget amount validation
    if (formData.budgetAmount.trim() && isNaN(formData.budgetAmount)) {
      errors.budgetAmount = 'Invalid budget amount';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const token = localStorage.getItem('token');
      const budgetAmount = parseInt(formData.budgetAmount, 10); // Convert to integer
  
      try {
        const response = await fetch('http://192.81.209.146:4005/api/addUserBudget', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ...formData, budgetAmount }) // Include the integer budgetAmount
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid, remove the token
            localStorage.removeItem('token');
            alert('Token expired or invalid. Please log in again.');
            // Redirect to the home page
            navigate('/');
            return;
          }
  
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (data.error && data.error.includes('Duplicate entry')) {
              setFormMessage('Budget Category is already registered');
            } else {
              // Handle other JSON errors
              setFormMessage(`Failed to add budget: ${data.message}`);
              console.error('Failed to add budget:', data.message);
            }
          } else {
            // Handle non-JSON content (e.g., HTML error page)
            const text = await response.text();
            setFormMessage(`Server error: ${text}`);
            console.error('Server error:', text);
          }
  
          return;
        }
  
        // Handle success
        const data = await response.json();
        setFormMessage('Budget added successfully');
        console.log('Budget added successfully:', data);
      } catch (error) {
        setFormMessage('Error during budget addition');
        console.error('Error during budget addition:', error);
      }
    }
  };

  return (
    <>
      <LoginNavBar/>
      <div className="page-h">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3>Add Budget</h3>
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
                      name="category"
                      placeholder="Budget Category"
                      value={formData.category}
                      onChange={handleChange}
                    />
                    {formErrors.category && (
                      <p className="error-message">{formErrors.category}</p>
                    )}
                  </fieldset>
                  <fieldset className="col-md-6">
                    <input
                      type="text"
                      name="budgetAmount"
                      placeholder="Amount..."
                      value={formData.budgetAmount}
                      onChange={handleChange}
                    />
                    {formErrors.budgetAmount && (
                      <p className="error-message">{formErrors.budgetAmount}</p>
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
                          formMessage.includes('successfully')
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

export default RefreshToken(AddBudget);
