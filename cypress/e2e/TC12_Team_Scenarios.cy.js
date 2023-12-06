import { selectors } from "../support/selectors";

const { team } = selectors;

const mockedSearchUsersFixture = [{
  name: 'Darth Vader',
  role: 'user',
  email: 'vader@yopmail.com',
  email_verified_at: '01 Jul 2021',
}, {
  name: 'Darth Maul',
  role: 'user',
  email: 'maul@yopmail.com',
  email_verified_at: '29 Jul 2021',
}, {
  name: 'Darth Sidious',
  role: 'user',
  email: 'sid@yopmail.com',
  email_verified_at: '30 Jul 2021',
}]

const mockedSearchUsers = [{
  name: 'platform user',
  role: 'user',
  email: 'admin1_user@yopmail',
  email_verified_at: 'Invalid Date',
}, {
  name: 'platform user',
  role: 'user',
  email: 'admin2_user@yopmail',
  email_verified_at: 'Invalid Date',
}, {
  name: 'platform user',
  role: 'user',
  email: 'admin3_user@yopmail',
  email_verified_at: 'Invalid Date',
}, {
  name: 'Super Admin',
  role: 'super_admin',
  email: 'test@founderandlightning.com',
  email_verified_at: '11 Aug 2023',
}]

describe('Team page', () => {
  beforeEach(() => {
    cy.login('test@yopmail.com', 'Test@7777');
    cy.visit('/dashboard');
  });

  it('should render users as table records', () => {
    cy.visit('/team');
    cy.get(team.teamTable).should('be.visible');
    cy.get(team.teamTable).find('tbody tr').should('have.length.greaterThan', 0);
  });

  it('should allow user to scroll down the page to see more users', () => {
    cy.visit('/team');
    cy.get(team.teamTable).find('tbody tr').should('have.length', 20);
    cy.get(team.tableScrollableContainer).scrollTo('bottom');
    cy.get(team.teamTable).find('tbody tr').should('have.length', 40);
  });

  it('should display no results text if no users found', () => {
    cy.visit('/team');
    cy.get(team.searchInput).type('extrarandomuser1234@abcd');
    cy.get(team.teamTable).find('tbody tr').should('have.length', 1);
    cy.contains('No members match your search, please try again').should('be.visible');
    cy.get(team.teamMembersCount).contains('0 Members');
  });

  it('should show users matched with search query', () => {
    cy.visit('/team');
    cy.get(team.searchInput).type('admin');
    cy.get(team.teamTable).find('tbody tr').should('have.length', 4);
    cy.get(team.teamTable).find('tbody tr').each((row, idx) => {
      cy.wrap(row).within(() => {
        cy.get('td').eq(0).should('contain', mockedSearchUsers[idx].name);
        cy.get('td').eq(1).should('contain', mockedSearchUsers[idx].role);
        cy.get('td').eq(2).should('contain', mockedSearchUsers[idx].email);
        cy.get('td').eq(3).should('contain', mockedSearchUsers[idx].email_verified_at);
      });
    });
    cy.get(team.teamMembersCount).contains('4 Members');
  });

  // Example of fixture usage as intercepted and mocked users API response
  it('should show users matched with search query - FIXTURE example', () => {
    cy.visit('/team');
    cy.intercept('GET', '/api/v1/users*', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'users.json',
      })
    })
    cy.get(team.searchInput).type('Darth');
    cy.intercept({
      method: 'GET',
      pathname: '/api/v1/users*',
      query: {
        search: 'Darth',
      },
    }, (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'searchUsers.json',
      })
    });
    cy.get(team.teamTable).find('tbody tr').should('have.length', 3);
    cy.get(team.teamTable).find('tbody tr').each((row, idx) => {
      cy.wrap(row).within(() => {
        cy.get('td').eq(0).should('contain', mockedSearchUsersFixture[idx].name);
        cy.get('td').eq(1).should('contain', mockedSearchUsersFixture[idx].role);
        cy.get('td').eq(2).should('contain', mockedSearchUsersFixture[idx].email);
        cy.get('td').eq(3).should('contain', mockedSearchUsersFixture[idx].email_verified_at);
      });
    });
    cy.get(team.teamMembersCount).contains('3 Members');
  });
});
