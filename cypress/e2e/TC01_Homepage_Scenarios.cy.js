import { selectors } from "../support/selectors";
const { homePage: homePage } = selectors;
describe('Home page scenarios', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Verify Home page buttons and links ', () => {
    cy.get(homePage.title).contains('Platform Template')
    cy.get(homePage.signUpButton).contains('Sign up')
    cy.get(homePage.signInButton).contains('Log in')
    //cy.get(homePage.paymentButton).contains('Payment')
  });

  it('Verify  when sign up button is clicked it redirects to the sign up page', () => {
    cy.get(homePage.signUpButton).click()
    cy.url().should('include', '/account/signup');
  });

  it('Verify  when Log in button is clicked it redirects to the Log in page', () => {
    cy.get(homePage.signInButton).click()
    cy.url().should('include', '/account/signin');
  });

  it.skip('Verify  when Payment button is clicked it redirects to the Log in page', () => {
    cy.get(homePage.paymentButton).click()
    cy.url().should('include', '/account/signin');
  });
});
