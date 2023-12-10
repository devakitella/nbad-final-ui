// In your Cypress support/commands.js or directly in your test file
Cypress.Commands.add('configureApplitools', () => {
    cy.eyesOpen({
      appName: 'Your App Name',
      apiKey: '0Hp9qk6fPu107KR6bXLW11013GR105SrnNjyaDEEjaa1SRjSk110',
    });
  });
  