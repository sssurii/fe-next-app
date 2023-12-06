import { selectors } from "../support/selectors";
import 'cypress-plugin-stripe-elements';

const { payment } = selectors;

// https://stackoverflow.com/questions/75882883/cypress-12-8-1-not-working-with-stripe-elements-iframe
// function getStripeField({iframeSelector, fieldSelector}, attempts = 0) {
//     Cypress.log({displayName: 'getCardField', message: `${fieldSelector}: ${attempts}`})
//
//     if (attempts > 50) throw new Error('too many attempts')
//
//     return cy.get(iframeSelector, {timeout:10_000, log:false})
//         .eq(0, {log:false})
//         .its('0.contentDocument', {log:false})
//         .find('body', {log:false})
//         .then(body => {
//             const stripeField = body.find(fieldSelector)
//             if (!stripeField.length) {
//                 return cy.wait(300, {log:false})
//                     .then(() => {
//                         getStripeField({iframeSelector, fieldSelector}, ++attempts)
//                     })
//             } else {
//                 return cy.wrap(stripeField)
//             }
//         })
// }

describe('Payments', () => {
  it('should only allow to access payment when you are logged in', () => {
    cy.visit('settings/plan');
    cy.url().should('include', '/account/signin');
  })

  it('should display embedded pricing table and switch to simplified on toggle click', () => {
    cy.login('test@yopmail.com', 'Test@7777');
    cy.visit('settings/plan');
    cy.get(payment.toggle).should('be.visible');
    cy.get(payment.toggle).click();
    cy.get(payment.simple.paymentButton).should('be.visible');
  });

  describe('Simplified', () => {
    it.skip('should redirect to stripe on simplified payment checkout click', () => {
      cy.login('test@yopmail.com', 'Test@7777');
      cy.visit('settings/plan');
      cy.get(payment.toggle).should('be.visible');
      cy.get(payment.toggle).click();
      cy.get(payment.simple.paymentButton).click();
      cy.origin('https://checkout.stripe.com/', () => {
        cy.url().should('include', '/pay/cs_test_');

      });
    });
  });


  // describe.skip('Embedded pricing table', () => {
  //     it('should redirect to stripe on simplified payment checkout click', () => {
  //         cy.login('test@yopmail.com', 'Test@7777');
  //
  //         cy.visit('settings/plan');
  //
  //         getStripeField({
  //             iframeSelector: 'iframe[title="Pricing"]',
  //             fieldSelector: 'button.Button PriceColumn-button Button--primary Button--lg'
  //         }).click();
  //     });
  // });
});
