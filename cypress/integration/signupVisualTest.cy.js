// cypress/integration/signup-applitools.spec.js

const { eyesOpen, eyesCheckWindow, eyesClose } = require('@applitools/eyes-cypress');

describe('Signup Form with Applitools', () => {
  beforeEach(() => {
    eyesOpen({ appName: 'App', testName: 'Signup Form Test' });
  });
  var randomNumber = Math.floor(Math.random()*(999-100+1)+100);

  it('should display the signup form correctly', () => {
    cy.visit('/signup'); // Replace with the actual path

    // Visual checkpoint for the entire page
    eyesCheckWindow('Signup Page');

    // Fill out the signup form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe'+randomNumber+'@example.com');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');

    // Visual checkpoint for the filled-out form
    eyesCheckWindow('Filled-out Signup Form');

    // Submit the form
    cy.get('form').submit();

    // Visual checkpoint for the success message
    eyesCheckWindow('Registration Successful');
  });

  afterEach(() => {
    eyesClose();
  });
});