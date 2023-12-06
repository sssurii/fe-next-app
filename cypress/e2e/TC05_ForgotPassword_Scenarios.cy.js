import { selectors } from "../support/selectors";

const { forgotPasswordForm: form } = selectors;

describe('Forgot Password', () => {
  beforeEach(() => {
    cy.visit('/account/signin');
  });

  it('Should show a validation message email is entered ', () => {
    cy.get(form.forgotPassword).click();
    cy.url().should('include', '/forgot-password');
    cy.get(form.email).type('sha@yopmail.com')
    cy.get(form.sendLink).click()
    cy.get('[data-cy="alert-toast-content"]').contains("Reset password link sent. Please check your email.");
  });

  it('Should show a validation message when incorrect email format is entered ', () => {
    cy.get(form.forgotPassword).click();
    cy.url().should('include', '/forgot-password');
    cy.get(form.email).type('shalini@yopmail')
    cy.get('[data-cy="no-email"]').click()
    cy.get(form.emailError).contains("Please enter a valid email address")
  });

  it('Should show a validation message when no  email is entered ', () => {
    cy.get(form.forgotPassword).click();
    cy.url().should('include', '/forgot-password');
    cy.get(form.email).click()
    cy.get('[data-cy="no-email"]').click()
    cy.get(form.emailError).contains("Please enter a valid email address")
  });

  it('Should show toast message  when existing email address is entered', () => {
    cy.get(form.forgotPassword).click();
    cy.url().should('include', '/forgot-password');
    cy.get(form.email).type('shalini@yopmail.com');
    cy.get(form.sendLink).click();
    cy.get('[data-cy="alert-toast-content"]').contains("Reset password link sent. Please check your email.");
  });

  it('Should redirect to contact page when contact support link is clicked', () => {
    cy.get(form.forgotPassword).click();
    cy.get(form.contactSupport).click()
    cy.url().should('include', 'https://fl-web-boilerplate-uat.vercel.app/')
  });
});
