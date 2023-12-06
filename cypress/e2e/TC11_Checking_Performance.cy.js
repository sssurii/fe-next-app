import "@cypress-audit/lighthouse/commands";
const lighthousemetrics = {
  performance: 95,
  accessibility: 100,
  "best-practices": 95,
  seo: 85,
  pwa: 100,
};

//Feature: Home Page Verification on platform website   
//Scenario: check web page health through lighthouse audit  on platform home page
//Given I open platform homepage
//Then I should see title "Platform Template"
//And I should see "Sign up" and "Login" text displayed
//And I should see web audit results

describe('Lighthouse Test', () => {
  it.skip('Test #1', () => {
    cy.visit('/');
    cy.lighthouse(lighthousemetrics).then((result) => {
      cy.log(JSON.stringify(result));
      

    });
  });
});