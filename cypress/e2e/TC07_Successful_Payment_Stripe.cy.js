import 'cypress-plugin-stripe-elements';
import { selectors } from "../support/selectors";
const { payment } = selectors;


describe('Stripe payment is successful', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  it.skip('should redirect to stripe on allow payment', () => {
    cy.login('test@yopmail.com', 'Test@7777');

    cy.visit('payment');

    cy.get(payment.toggle).should('be.visible');
    cy.get(payment.toggle).click();

    cy.get(payment.simple.paymentButton).click();
    cy.origin('https://checkout.stripe.com/', () => {
      cy.url().should('include', 'c/pay/cs_test_');
      cy.get('#cardNumber').type('4111 1111 1111 1111')
      cy.get('#cardExpiry').type('12/24')
      cy.get('#cardCvc').type('123')
      cy.get('#billingName').type('Mark Johnson')
      cy.get('.SubmitButton-IconContainer').click()

      //cy.url().should('include', 'https://fl-web-boilerplate-uat.vercel.app/?success=true');


    })
  })
})

