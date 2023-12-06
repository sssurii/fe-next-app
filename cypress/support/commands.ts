/// <reference types="cypress" />
import { selectors } from "./selectors";
import "@cypress-audit/lighthouse/commands";

const { signInForm: form } = selectors;

// -- This is a parent command --
Cypress.Commands.add('login', (username = 'test@yopmail.com', password = 'Test@7777') => {
  cy.session([username, password], () => {
    cy.visit('/account/signin')
    cy.get(form.email).type(username)
    cy.get(form.password).type(password)
    cy.get(form.loginButton).click()
    cy.url().should('include', '/dashboard');
  })
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}
