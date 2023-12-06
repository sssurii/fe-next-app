import { selectors } from "../support/selectors";

const { profile } = selectors;

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
    cy.get('[data-cy="upload-user-image-input"]').selectFile('cypress/files/orange.png', { force: true })
    cy.get(profile.profileImageCancelButton).click()

  });

  it('Should allow user to update JPEG image ', () => {
    cy.get(profile.profileDropdown).click()
    cy.get(profile.generalSettings).click();
    cy.visit('settings/general');
    cy.contains('Your profile image').should('be.visible');
    cy.get(profile.profileImageIcon).click()
    cy.get('[data-cy="upload-user-image-input"]').selectFile('cypress/files/flower.jpeg', { force: true })
    cy.get('[data-cy="crop-image-button"]').click()
    cy.get(profile.profileImageUploadButton).click()
    cy.get(profile.profileUploadSuccessMessage).contains('User image processed successfully')



  });
  it('Should allow user to update PNG image ', () => {
    cy.get(profile.profileDropdown).click()
    cy.get(profile.generalSettings).click();
    cy.visit('settings/general');
    cy.contains('Your profile image').should('be.visible');
    cy.get(profile.profileImageIcon).click()
    cy.get(profile.profileImageInput).selectFile('cypress/files/orange.png', { force: true })
    cy.get(profile.profileImageSaveButton).click()
    cy.get(profile.profileImageUploadButton).click()
    cy.get(profile.profileUploadSuccessMessage).contains('User image processed successfully')


  });
  it('Should allow user to update <= 10 mb image ', () => {
    cy.get(profile.profileDropdown).click()
    cy.get(profile.generalSettings).click();
    cy.visit('settings/general');
    cy.contains('Your profile image').should('be.visible');
    cy.get(profile.profileImageIcon).click()
    cy.get(profile.profileImageInput).selectFile('cypress/files/lake.jpeg', { force: true })
    cy.get(profile.profileImageSaveButton).click()
    cy.get(profile.profileImageUploadButton).click()
    cy.get(profile.profileUploadSuccessMessage).contains('User image processed successfully')
  });

  it('Should NOT allow user to update > 10 mb  image ', () => {
    cy.get(profile.profileDropdown).click()
    cy.get(profile.generalSettings).click();
    cy.visit('settings/general');
    cy.contains('Your profile image').should('be.visible');
    cy.get(profile.profileImageIcon).click()
    cy.get(profile.profileImageInput).selectFile('cypress/files/10MB.png', { force: true })
    cy.get('[data-cy="alert-toast-content"]').contains('Image size should be less than 10MB')

  });
  it.skip('Should  NOT allow user to Delete Image when delete and cancel is selected', () => {
    cy.get(profile.profileDropdown).click()
    cy.get(profile.generalSettings).click();
    cy.visit('settings/general');
    cy.contains('Your profile image').should('be.visible');
    cy.get(profile.profileImageIcon).click()
    cy.get(profile.profileImageInput).selectFile('cypress/files/lake.jpeg', { force: true })
    cy.get(profile.profileImageSaveButton).click()
    cy.get(profile.profileImageUploadButton).click()
    cy.get(profile.profileUploadSuccessMessage).contains('User image processed successfully')
    cy.get('[data-cy="delete-user-image"]', { timeout: 20000 }).should('be.visible')
    cy.get('[data-cy="delete-user-image"]',{ timeout: 30000 }).click()
    cy.get(profile.profileImagedeletePopUpMessage).contains('Are you sure you want to remove your profile image?')
    cy.get(profile.profileImagedeletePopUpCancelButton).click()


  });
  it.skip('Should allow user to Delete Image when delete and confirm is selected', () => {
    cy.get(profile.profileDropdown).click()
    cy.get(profile.generalSettings).click();
    cy.visit('settings/general');
    cy.contains('Your profile image').should('be.visible');
    cy.get(profile.profileImageIcon).click()
    cy.get(profile.profileImageInput).selectFile('cypress/files/flower.jpeg', { force: true })
    cy.get(profile.profileImageSaveButton).click()
    cy.get(profile.profileImageUploadButton).click()
    cy.get(profile.profileUploadSuccessMessage).contains('User image processed successfully')
    cy.get('[data-cy="delete-user-image"]', { timeout:20000 }).should('be.visible')
    cy.get('[data-cy="delete-user-image"]', { timeout:30000 }).click()
    cy.contains('Are you sure you want to remove your profile image?')
    cy.get(profile.profileImagedeletePopUpConfirmButton).click()
    cy.get(profile.profileImageDeleteSuccessMessage).contains('Profile image deleted successfully')
  });

  it.skip('Should allow user to update Image, log out , login back ,  Delete Image and update', () => {
    cy.get(profile.profileDropdown).click()
    cy.get(profile.generalSettings).click();
    cy.visit('settings/general');
    cy.contains('Your profile image').should('be.visible');
    cy.get(profile.profileImageIcon).click()
    cy.get(profile.profileImageInput).selectFile('cypress/files/flower.jpeg', { force: true })
    cy.get(profile.profileImageSaveButton).click()
    cy.get(profile.profileImageUploadButton).click()
    cy.get(profile.profileUploadSuccessMessage).contains('User image processed successfully')
    cy.wait(4000)
    cy.get(profile.profileDropdown).click()
    cy.get('[data-cy="logout"]').click()
    cy.url().should('include', '/signin');
    cy.login('test@yopmail.com', 'Test@7777');
    cy.visit('/dashboard');
    cy.get('[data-cy="profile-dropdown"]').click()
    cy.get(profile.generalSettings).click();
    cy.visit('settings/general');
    cy.contains('Your profile image').should('be.visible');
    cy.get(profile.profileImageIcon).click()
    cy.get('[data-cy="delete-user-image"]').click()
    cy.get(profile.profileImagedeletePopUpMessage).contains('Are you sure you want to remove your profile image?')
    cy.get(profile.profileImagedeletePopUpConfirmButton).click()
    cy.get(profile.profileImageDeleteSuccessMessage).contains('Profile image deleted successfully')
    cy.get(profile.profileImageIcon).click()
    cy.get(profile.profileImageInput).selectFile('cypress/files/orange.png', { force: true })
    cy.get(profile.profileImageSaveButton).click()
    cy.get(profile.profileImageUploadButton).click()
    cy.get(profile.profileUploadSuccessMessage).contains('User image processed successfully')
    cy.get('[alt="User avatar"]').should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })

  });
});


