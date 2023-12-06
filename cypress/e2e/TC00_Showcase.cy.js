import { selectors } from "../support/selectors";
import { getDataCySelector } from "../support/utils";
import { slowCypressDown } from 'cypress-slow-down'

slowCypressDown(300)

const {
  signUpForm, signInForm , forgotPasswordForm, general, profile, notifications
} = selectors;

class EmailGenerator {
  static id = 1;
  static generate (baseEmail) {
    const uniqueId = `+a${this.id++}${Math.floor(Date.now() / 8000)}`;
    return baseEmail.replace('@', `${uniqueId}@`);
  }
}

describe.skip('Boilerplate Showcase', () => {
  describe('Sign up page scenarios', () => {
    beforeEach(() => {
      cy.visit('/account/signup');
    });
    it('Should not create a  user with first name as blank', () => {
      cy.get(signUpForm.lastName).type('thomas');
      cy.get(signUpForm.email).type(EmailGenerator.generate('test@yopmail.com'));
      cy.get(signUpForm.password).type('Test@7777');
      cy.get(signUpForm.passwordConfirmation).type('Test@7777');
      cy.get(signUpForm.termsAndConditions).click();
      cy.get(signUpForm.signUpButton).click();
      cy.get(signUpForm.firstNameError).contains('This field is required')
    });
    it('Should not create a  user with email as blank', () => {
      cy.get(signUpForm.firstName).type('melissa');
      cy.get(signUpForm.lastName).type('thomas');
      cy.get(signUpForm.password).type('Test@7777');
      cy.get(signUpForm.passwordConfirmation).type('Test@7777');
      cy.get(signUpForm.termsAndConditions).click();
      cy.get(signUpForm.signUpButton).click();
      cy.get(signUpForm.emailError).contains('This field is required');
    });
    it('Should not create a  user with password as blank', () => {
      cy.get(signUpForm.firstName).type('melissa');
      cy.get(signUpForm.lastName).type('thomas');
      cy.get(signUpForm.email).type(EmailGenerator.generate('test@yopmail.com'));
      cy.get(signUpForm.passwordConfirmation).type('Test@7777');
      cy.get(signUpForm.termsAndConditions).click();
      cy.get(signUpForm.signUpButton).click();
      cy.get(signUpForm.passwordError).contains('This field is required');
    });
    it('should create a successful user account', () => {
      cy.get(signUpForm.firstName).type('melissa');
      cy.get(signUpForm.lastName).type('thomas');
      cy.get(signUpForm.email).type(EmailGenerator.generate('test@yopmail.com'));
      cy.get(signUpForm.password).type('Test@7777');
      cy.get(signUpForm.passwordConfirmation).type('Test@7777');
      cy.get(signUpForm.termsAndConditions).click();
      cy.get(signUpForm.signUpButton).click();
      cy.url().should('include', '/success');
    });
  });

  describe('Log in  page scenarios', () => {
    beforeEach(() => {
      cy.visit('/account/signin');
    });

    it('Should not login when email is unverified', () => {
      cy.get(signInForm.email).type('kevin@yopmail.com')
      cy.get(signInForm.password).type('Test@1234')
      cy.get(signInForm.loginButton).click({ force: true })
      cy.get(signInForm.errorMessage).contains('Email address is not verified.')
    });

    it('Should not login when password is incorrect', () => {
      cy.get(signInForm.email).type('test@yopmail.com')
      cy.get(signInForm.password).type('test@1234')
      cy.get(signInForm.loginButton).click({ force: true })
      cy.get(signInForm.passwordError).contains('Please enter a valid password')
    });

    it('Should login when email and password is correct', () => {
      cy.get(signInForm.email).type('test@yopmail.com')
      cy.get(signInForm.password).type('Test@7777')
      cy.get(signInForm.loginButton).click()
      cy.url().should('include', '/dashboard');
      cy.get(signInForm.headline).contains('You are signed in successfully!')
    });

  });

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


  describe('Forgot Password', () => {
    beforeEach(() => {
      cy.visit('/account/signin');
    });

    it('Should show a validation message email is entered ', () => {
      cy.get(forgotPasswordForm.forgotPassword).click();
      cy.url().should('include', '/forgot-password');
      cy.get(forgotPasswordForm.email).type('sha@yopmail.com')
      cy.get(forgotPasswordForm.sendLink).click()
      cy.get('[data-cy="alert-toast-content"]').contains("Reset password link sent. Please check your email.");
    });

    it('Should show a validation message when incorrect email format is entered ', () => {
      cy.get(forgotPasswordForm.forgotPassword).click();
      cy.url().should('include', '/forgot-password');
      cy.get(forgotPasswordForm.email).type('shalini@yopmail')
      cy.get('[data-cy="no-email"]').click()
      cy.get(forgotPasswordForm.emailError).contains("Please enter a valid email address")
    });

    it('Should show toast message  when existing email address is entered', () => {
      cy.get(forgotPasswordForm.forgotPassword).click();
      cy.url().should('include', '/forgot-password');
      cy.get(forgotPasswordForm.email).type('shalini@yopmail.com');
      cy.get(forgotPasswordForm.sendLink).click();
      cy.get('[data-cy="alert-toast-content"]').contains("Reset password link sent. Please check your email.");
    });

  });

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
      cy.get(general.userInfoFirstName).clear().type('mellissa1')
      cy.get(general.userInfoLastName).clear().type('Thomas1')
      cy.get(general.userInfoNewEmail).type('disha1@yopmail')
      cy.get(general.userInfoConfirmEmail).type('disha1@yopmail')
      cy.get(general.userInfoSubmit).click()
      cy.get('[data-cy="newEmail-error"]').contains('Please enter a valid email address')
      cy.get('[data-cy="confirmationEmail-error"]').contains('Please enter a valid email address')
    });

    it('Should show not allow user to add different  new email and  confirmation email and save', () => {
      cy.get('[data-cy="profile-dropdown"]').click()
      cy.get('[data-cy="general-settings"]').click();
      cy.visit('settings/general');
      cy.contains('Your personal information tied to your account').should('be.visible');
      cy.get(general.userInfoFirstName).clear().type('disha1')
      cy.get(general.userInfoLastName).clear().type('Thomas1')
      cy.get(general.userInfoNewEmail).type('disha1@yopmail.com')
      cy.get(general.userInfoConfirmEmail).type('disha2@yopmail.com')
      cy.get(general.userInfoSubmit).click()
      cy.get('[data-cy="confirmationEmail-error"]').contains('Email fields must be the same')
    });

    it('Should show not allow user to add valid new email and blank confirmation email and save', () => {
      cy.get('[data-cy="profile-dropdown"]').click()
      cy.get('[data-cy="general-settings"]').click();
      cy.visit('settings/general');
      cy.contains('Your personal information tied to your account').should('be.visible');
      cy.get(general.userInfoFirstName).clear().type('disha1')
      cy.get(general.userInfoLastName).clear().type('Thomas1')
      cy.get(general.userInfoNewEmail).type('disha1@yopmail.com')
      cy.get(general.userInfoSubmit).click()
      cy.get('[data-cy="confirmationEmail-error"]').contains('Email fields must be the same')
    });

    it('Should  allow user to edit first name , last name , add existing email to new email and  confirmation email and save', () => {
      cy.get('[data-cy="profile-dropdown"]').click()
      cy.get('[data-cy="general-settings"]').click();
      cy.visit('settings/general');
      cy.contains('Your personal information tied to your account').should('be.visible');
      cy.get(general.userInfoFirstName).clear().type('mellissa1')
      cy.get(general.userInfoLastName).clear().type('Thomas1')
      cy.get(general.userInfoNewEmail).type('test@yopmail.com')
      cy.get(general.userInfoConfirmEmail).type('test@yopmail.com')
      cy.get(general.userInfoSubmit).click()
      cy.get('[data-cy="alert-toast-content"]').contains('Profile updated successfully')
    });
  });


  describe('Profile Picture scenarios', () => {
    beforeEach(() => {
      cy.login('test@yopmail.com', 'Test@7777');
      cy.visit('/dashboard');
    });

    it('Should NOT allow user to save image if cancel button is clicked', () => {
      cy.get(profile.profileDropdown).click()
      cy.get(profile.generalSettings).click();
      cy.visit('settings/general');
      cy.contains('Your profile image').should('be.visible');
      cy.get(profile.profileImageIcon).click()
      cy.wait(2000)
      const filename = 'orange.png';
      cy.get('[data-cy="upload-user-image-input"]').selectFile('cypress/files/orange.png', { force: true })
      cy.get(profile.profileImageCancelButton).click()
    });

    it('Should allow user to update JPEG image ', () => {
      cy.get(profile.profileDropdown).click()
      cy.get(profile.generalSettings).click();
      cy.visit('settings/general');
      cy.contains('Your profile image').should('be.visible');
      cy.get(profile.profileImageIcon).click()
      const filename = 'flower.jpeg';
      cy.get('[data-cy="upload-user-image-input"]').selectFile('cypress/files/flower.jpeg', { force: true })
      cy.get('[data-cy="crop-image-button"]').click()
      cy.get(profile.profileImageUploadButton).click()
      cy.wait(8000)
      cy.get(profile.profileUploadSuccessMessage).contains('User image processed successfully')
    });

    it('Should NOT allow user to update >10 mb  image ', () => {
      cy.get(profile.profileDropdown).click()
      cy.get(profile.generalSettings).click();
      cy.visit('settings/general');
      cy.contains('Your profile image').should('be.visible');
      cy.get(profile.profileImageIcon).click()
      const filename = '10MB';
      cy.get(profile.profileImageInput).selectFile('cypress/files/10MB.png', { force: true })
      cy.get('[data-cy="alert-toast-content"]').contains('Image size should be less than 10MB')
    });
  });

  describe('Notifications page scenarios', () => {
    beforeEach(() => {
      cy.login('aditya888@yopmail.com', 'Test@1234!');
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
  });
});
