import { selectors } from "../support/selectors";

const { signInForm: login } = selectors;
const { profile } = selectors;
const { notifications } = selectors;

describe('Notifications page scenarios', () => {
  beforeEach(() => {
    cy.visit('/account/signin');
    failOnStatusCode: false
    cy.get(login.email).type('aditya888@yopmail.com')
    cy.get(login.password).type('Test@1234!')
    cy.get(login.loginButton).click()
    cy.url().should('include', '/dashboard');

  });
  it('Should show notifications Icon, notifications and view all', () => {
    cy.get(notifications.notificationsIcon).click()
    cy.contains('Notifications').should('be.visible');
    cy.get(notifications.notificationViewAllButton).contains('View all').should('be.visible')
    

  });
  it('Should  redirect to profile image upload page on clicking view all', () => {
    cy.get(notifications.notificationsIcon).click()
    cy.contains('View all').should('be.visible')
    cy.get(notifications.notificationViewAllButton).as('notifications.notificationViewAllButton').click()
    cy.contains('Alerts from your team members').should('be.visible');
  });
  it('Should  redirect to profile image upload page on clicking Upload picture button', () => {
    cy.get(notifications.notificationsIcon).click()
    cy.contains('Upload picture').should('be.visible')
    cy.get(notifications.notificationUploadPictureButton).first().click()
    cy.contains('Your profile image').should('be.visible');
  });

  it('Should show notification information, status of notifications and Orange button to mark notifications', () => {
    cy.get(profile.profileDropdown).click()
    cy.get(profile.generalSettings).click();
    cy.get(notifications.notificationsTab).click();
    cy.contains('Alerts from your team members').should('be.visible');
    cy.get(notifications.notificationsAll).contains('All');
    cy.get(notifications.notificationsRead).contains('Read');
    cy.get(notifications.notificationsUnread).contains('Unread');
    cy.get(notifications.notificationsUnread).click()
    cy.contains('You haven’t updated your profile picture, login and let other users see what you look like').should('be.visible');
    cy.get(notifications.notificationOrangeButton).should('be.visible');
  });
  it.skip('Should Mark notification as Read when clicked on orange dot', () => {
    cy.get(profile.profileDropdown).click()
    cy.get(profile.generalSettings).click();
    cy.get(notifications.notificationsTab).click();
    cy.contains('Alerts from your team members').should('be.visible');
    cy.get(notifications.notificationsUnread).contains('Unread');
    cy.get(notifications.notificationsUnread).click()
    cy.contains('You haven’t updated your profile picture, login and let other users see what you look like').should('be.visible');
    cy.get(notifications.notificationOrangeButton).eq(1).click()
    cy.get('[data-cy="alert-toast-content"]').contains('Notification(s) updated successfully')
    cy.get('[data-cy=read-notifications]').click()
    cy.contains('You haven’t updated your profile picture, login and let other users see what you look like').should('be.visible');

  });
});
