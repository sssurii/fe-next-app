import { selectors } from "../support/selectors";

const { signInForm: form } = selectors;

describe('Log in  page scenarios', () => {
  beforeEach(() => {
    cy.visit('/account/signin');
  });

  it('Should not login when email is  blank', () => {
    cy.get(form.email).click()
    cy.get(form.password).type('test@1234')
    cy.get(form.emailError).contains('Please enter a valid email address')
  });

  it('Should not login when password is  blank', () => {
    cy.get(form.email).type('test@yopmail.com')
    cy.get(form.password).click();
    cy.get(form.email).click()
    cy.get(form.passwordError).contains('Please enter a valid password')
  });

  it('Should not login when email is invalid', () => {
    cy.get(form.email).type('test@yopmail')
    cy.get(form.password).type('test@1234')
    cy.get(form.emailError).contains('Please enter a valid email address')
  });
  it('Should not login when email is unverified', () => {
    cy.get(form.email).type('kevin@yopmail.com')
    cy.get(form.password).type('Test@1234')
    cy.get(form.loginButton).click({ force: true })
    cy.get(form.errorMessage).contains('Email address is not verified.')
  });

  it('Should not login when password is incorrect', () => {
    cy.get(form.email).type('test@yopmail.com')
    cy.get(form.password).type('test@1234')
    cy.get(form.loginButton).click({ force: true })
    cy.get(form.passwordError).contains('Please enter a valid password')
  });

  it('Should not login when email or password is Incorrect', () => {
    cy.get(form.email).type('test8@yopmail.com')
    cy.get(form.password).type('Test@7777')
    cy.get(form.loginButton).click()
    cy.get(form.errorMessage).contains('These credentials do not match our records')
  });

  it('Should login when email and password is correct', () => {
    cy.get(form.email).type('test@yopmail.com')
    cy.get(form.password).type('Test@7777')
    cy.get(form.loginButton).click()
    cy.url().should('include', '/dashboard');
    cy.get(form.headline).contains('You are signed in successfully!')
  });

  it('Should redirect from login when user is already logged in', () => {
    cy.login('test@yopmail.com', 'Test@7777')
    cy.visit('/account/signin');
    cy.url().should('include', '/dashboard');
  });
});
