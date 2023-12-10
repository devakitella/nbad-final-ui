# My Project

My project is a budget management application that allows users to manage their budgets, expenses, and perform user authentication actions.

## Features

1. **Add Budget:** Users can add new budgets to manage their financial goals.
2. **View Budget:** Users can view their budgets to track their financial status.
3. **Add Expense:** Users can add expenses to their budgets, keeping track of their spending.
4. **View Expenses:** Users can view a list of their expenses, providing a detailed overview.
5. **Visualize Budget:** The application provides visualizations to help users understand their budget status.

## User Authentication

The project includes user authentication features:

- **Refresh Token:** Automatic refresh of authentication token to maintain user sessions.
- **Logout:** Users can log out of their accounts securely.
- **Sign Up:** New users can register and create an account.
- **Login:** Existing users can log in to access their budget information.

## Testing

### End-to-End Tests (Cypress)

1. **Test Case 1: Signup**
   - cypress/e2e/signup.cy.js that tests signup and error handling in case of duplicate users.

2. **Test Case 2: Signin**
   - cypress/e2e/signin.js that tests signin using different credntials to validate login page.
### Visual Regression Test (Applitools Eyes Cypress)

- **Visual Regression Test: SignUp Page**
  - Visual regression test using Applitools Eyes to ensure the SignUp page looks consistent.


