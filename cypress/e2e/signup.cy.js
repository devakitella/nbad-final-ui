// cypress/integration/signup.spec.js

describe('SignUp Page', () => {
  var randomNumber = Math.floor(Math.random()*(999-100+1)+100);
    it('should successfully register a new user', () => {
      cy.visit('http://167.99.158.75/signup'); // Replace with the actual URL of your application
  
      // Fill out the signup form
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('john.doe'+randomNumber+'@example.com');
      cy.get('input[name="phone"]').type('1234567890');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
  
      // Submit the form
      cy.get('form').submit();
  
      // Assert that the success message is displayed
      cy.get('.success-message').should('contain', 'Registration successful');
    });
  
    it('should show an error for invalid email', () => {
      cy.visit('http://167.99.158.75/signup'); // Replace with the actual URL of your application
  
      // Fill out the signup form
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('john.doe'+randomNumber+'@example.com');
      cy.get('input[name="phone"]').type('1234567890');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
  
      // Submit the form
      cy.get('form').submit();
  
      // Assert that the success message is displayed
      cy.get('.error-message').should('contain', 'Email is already registered');
    });
  
    // Add more test cases for other scenarios (empty fields, password mismatch, etc.)
  });
  