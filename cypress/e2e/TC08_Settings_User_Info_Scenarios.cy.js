import { selectors } from "../support/selectors";

const { general: form } = selectors;

describe('user info page scenarios', () => {
  beforeEach(() => {
    cy.login('test@yopmail.com', 'Test@7777');
    cy.visit('/dashboard');
  });

  it('Should show user information when settings is opened ', () => {
    cy.get('[data-cy="profile-dropdown"]').click()
    cy.get('[data-cy="general-settings"]').click();
    cy.visit('settings/general');
    cy.contains('Your personal information tied to your account').should('be.visible');
  });

  it('Should not allow user to add Invalid new email and same confirmation email and save', () => {
    cy.get('[data-cy="profile-dropdown"]').click()
    cy.get('[data-cy="general-settings"]').click();
    cy.visit('settings/general');
    cy.contains('Your personal information tied to your account').should('be.visible');
    cy.get(form.userInfoFirstName).clear().type('mellissa1')
    cy.get(form.userInfoLastName).clear().type('Thomas1')
    cy.get(form.userInfoNewEmail).type('disha1@yopmail')
    cy.get(form.userInfoConfirmEmail).type('disha1@yopmail')
    cy.get(form.userInfoSubmit).click()
    cy.get('[data-cy="newEmail-error"]').contains('Please enter a valid email address')
    cy.get('[data-cy="confirmationEmail-error"]').contains('Please enter a valid email address')
  });

  it('Should show not allow user to add different  new email and  confirmation email and save', () => {
    cy.get('[data-cy="profile-dropdown"]').click()
    cy.get('[data-cy="general-settings"]').click();
    cy.visit('settings/general');
    cy.contains('Your personal information tied to your account').should('be.visible');
    cy.get(form.userInfoFirstName).clear().type('disha1')
    cy.get(form.userInfoLastName).clear().type('Thomas1')
    cy.get(form.userInfoNewEmail).type('disha1@yopmail.com')
    cy.get(form.userInfoConfirmEmail).type('disha2@yopmail.com')
    cy.get(form.userInfoSubmit).click()
    cy.get('[data-cy="confirmationEmail-error"]').contains('Email fields must be the same')
  });

  it('Should show not allow user to add valid new email and blank confirmation email and save', () => {
    cy.get('[data-cy="profile-dropdown"]').click()
    cy.get('[data-cy="general-settings"]').click();
    cy.visit('settings/general');
    cy.contains('Your personal information tied to your account').should('be.visible');
    cy.get(form.userInfoFirstName).clear().type('disha1')
    cy.get(form.userInfoLastName).clear().type('Thomas1')
    cy.get(form.userInfoNewEmail).type('disha1@yopmail.com')
    cy.get(form.userInfoSubmit).click()
    cy.get('[data-cy="confirmationEmail-error"]').contains('Email fields must be the same')
  });

  it('Should  allow user to edit first name , last name , add existing email to new email and  confirmation email and save', () => {
    cy.get('[data-cy="profile-dropdown"]').click()
    cy.get('[data-cy="general-settings"]').click();
    cy.visit('settings/general');
    cy.contains('Your personal information tied to your account').should('be.visible');
    cy.get(form.userInfoFirstName).clear().type('mellissa1')
    cy.get(form.userInfoLastName).clear().type('Thomas1')
    cy.get(form.userInfoNewEmail).type('test@yopmail.com')
    cy.get(form.userInfoConfirmEmail).type('test@yopmail.com')
    cy.get(form.userInfoSubmit).click()
    cy.get('[data-cy="alert-toast-content"]').contains('Profile updated successfully')
  });
});
