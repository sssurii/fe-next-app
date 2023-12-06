import { getDataCySelector } from "../support/utils";

describe('Log out button', () => {
  beforeEach(() => {
    cy.login('test@yopmail.com', 'Test@7777');
  });

  it('Should logout successfully', () => {
    cy.visit('/dashboard');
    cy.get(getDataCySelector('profile-dropdown')).click()
    cy.get(getDataCySelector('logout')).click()
    cy.url().should('include', '/signin');
  });
});
