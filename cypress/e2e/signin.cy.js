// cypress/integration/signin.spec.js

describe('SignIn Page', () => {
    beforeEach(() => {
      // Visit the sign-in page before each test
      cy.visit('/signin'); // Update with your actual sign-in page URL
    });
  
    it('should display an error for empty email and password', () => {
      // Submit the form without entering email and password
      cy.get('#submitlogin').click();
  
      // Assert that error messages are displayed for email and password
      cy.get('.error-message').should('contain', 'Email is required');
      cy.get('.error-message').should('contain', 'Password is required');
    });
  
    it('should display an error for incorrect email or password', () => {
      // Enter incorrect email and password
      cy.get('input[name="email"]').type('devakitella@gmail.com');
      cy.get('input[name="password"]').type('incorrectpassword');
  
      // Submit the form
      cy.get('#submitlogin').click();
  
      // Assert that an error message is displayed
      cy.get('.error-message').should('contain', 'Incorrect email or password');
    });
  
    it('should successfully sign in with valid credentials', () => {
      // Enter valid email and password
      cy.get('input[name="email"]').type('devakitella@gmail.com');
      cy.get('input[name="password"]').type('123456');
  
      // Submit the form
      cy.get('#submitlogin').click();
  
  
      // Assert that redirection to addbudget page occurred
      cy.url().should('include', '/addbudget');
    });
  
    // Add more test cases for different scenarios as needed
  });
  