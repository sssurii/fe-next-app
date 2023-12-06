import { selectors } from "../support/selectors";
const { signUpForm: form } = selectors;
class EmailGenerator {
  static id = 1;
  static generate (baseEmail) {
    const uniqueId = `+a${this.id++}${Math.floor(Date.now() / 1000)}`;
    return baseEmail.replace('@', `${uniqueId}@`);
  }
}
describe('Sign up page scenarios', () => {
  beforeEach(() => {
    cy.visit('/account/signup');
  });
  it('Should not create a user with first name as blank', () => {
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@7777');
    cy.get(form.passwordConfirmation).type('Test@7777');
    cy.get(form.termsAndConditions).click();
    cy.get(form.signUpButton).click();
    cy.get(form.firstNameError).contains('This field is required')
  });
  it('Should not create a  user with email as blank', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.password).type('Test@7777');
    cy.get(form.passwordConfirmation).type('Test@7777');
    cy.get(form.termsAndConditions).click();
    cy.get(form.signUpButton).click();
    cy.get(form.emailError).contains('This field is required');
  });
  it('Should not create a  user with password as blank', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.passwordConfirmation).type('Test@7777');
    cy.get(form.termsAndConditions).click();
    cy.get(form.signUpButton).click();
    cy.get(form.passwordError).contains('This field is required');
  });
  it('Should not create a  user with confirm password as blank', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@7777');
    cy.get(form.termsAndConditions).click();
    cy.get(form.signUpButton).click();
    cy.get(form.passwordConfirmationError).contains('This field is required');
  });
  it('should not create a  user with terms as blank', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@7777');
    cy.get(form.passwordConfirmation).type('Test@7777');
    cy.get(form.signUpButton).click();
    cy.get(form.termsAndConditionsError).contains('You must agree to Privacy Policy to proceed')
  });
  it('should not create a  user with password  as less than 8 chars', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@77').click();
    cy.get(form.signUpButton).click();
    cy.get(form.passwordError).contains('Please enter a valid password');
  });
  it('should not create a  user with password without a capital letter', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('test@7777');
    cy.get(form.signUpButton).click();
    cy.get(form.passwordError).contains('Please enter a valid password');
  });
  it('should not create a  user with password without a lowercase', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('TEST@1234');
    cy.get(form.signUpButton).click();
    cy.get(form.passwordError).contains('Please enter a valid password');
  });
  it('should not create a  user with password without a special char', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test1234');
    cy.get(form.signUpButton).click();
    cy.get(form.passwordError).contains('Please enter a valid password');
  });
  it('should not create a  user with password without a number', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@abcd');
    cy.get(form.signUpButton).click();
    cy.get(form.passwordError).contains('Please enter a valid password');
  });
  it('should not create a user when password and confirm password do not match', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@8888');
    cy.get(form.passwordConfirmation).type('Test@7777');
    cy.get(form.termsAndConditions).click();
    cy.get(form.signUpButton).click();
    cy.get(form.passwordConfirmationError).contains('Please make sure your passwords match');
  });
  it('should not create a user when existing email is entered ', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type('test@yopmail.com');
    cy.get(form.password).type('Test@7777');
    cy.get(form.passwordConfirmation).type('Test@7777');
    cy.get(form.termsAndConditions).click();
    cy.get(form.signUpButton).click();
    cy.get(form.existingEmailError).contains('The email has already been taken.');
  });
  it('should  create a user when existing email is cleared and new email is  entered ', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type('test@yopmail.com');
    cy.get(form.email).clear()
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@7777');
    cy.get(form.passwordConfirmation).type('Test@7777');
    cy.get(form.termsAndConditions).click();
    cy.get(form.signUpButton).click();
    cy.url().should('include', '/success');
  });
  it('should create a successful user account', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName).type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@7777');
    cy.get(form.passwordConfirmation).type('Test@7777');
    cy.get(form.termsAndConditions).click();
    cy.get(form.signUpButton).click();
    cy.url().should('include', '/success');
  });
});






