import { getDataCySelector } from "./utils";

const homePage = {
  title: getDataCySelector('fnl-header'),
  signUpButton: getDataCySelector('button-sign-up'),
  signInButton: getDataCySelector('button-sign-in'),
  paymentButton: getDataCySelector('button-test-payment'),
  homeButton: getDataCySelector('home'),
  generalTab: getDataCySelector('general'),
  notificationsTab: getDataCySelector('notifications'),
  planTab: getDataCySelector('plan'),
  billingTab: getDataCySelector('billing'),
  supportTab: getDataCySelector('support'),
}

const signUpForm = {
  firstName: getDataCySelector('first-name'),
  lastName: getDataCySelector('last-name'),
  email: getDataCySelector('email'),
  password: getDataCySelector('password'),
  passwordConfirmation: getDataCySelector('password-confirmation'),
  termsAndConditions: getDataCySelector('terms-and-conditions'),
  signUpButton: getDataCySelector('submit-button'),
  firstNameError: getDataCySelector('firstName-error'),
  emailError: getDataCySelector('email-error'),
  passwordError: getDataCySelector('password-error'),
  passwordConfirmationError: getDataCySelector('passwordConfirmation-error'),
  termsAndConditionsError: getDataCySelector('termsAndConditions-error'),
  existingEmailError: getDataCySelector('alert-toast-content'),

}

const signInForm = {
  email: getDataCySelector('email'),
  password: getDataCySelector('password'),
  loginButton: getDataCySelector('submit-button'),
  emailError: getDataCySelector('email-error'),
  passwordError: getDataCySelector('password-error'),
  errorMessage: getDataCySelector('alert-toast-content'),
  headline: getDataCySelector('login-success-heading'),
}

const forgotPasswordForm = {
  forgotPassword: getDataCySelector('forgot-password-link'),
  email: getDataCySelector('email'),
  sendLink: getDataCySelector('send-link'),
  submitButton: getDataCySelector('submit-button'),
  emailError: getDataCySelector('email-error'),
  invalidEmailError: ('.text-content > .body-compact-01'),
  successMessage: getDataCySelector('alert-toast-content'),
  contactSupport: getDataCySelector('contact-support'),
  resetPasswordTitle: ('.heading-05'),
}

const payment = {
  toggle: getDataCySelector('payment-toggle'),
  simple: {
    paymentButton: getDataCySelector('payment-button-simple'),
  },
}

const general = {
  userInfoFirstName: getDataCySelector('first-name'),
  userInfoLastName: getDataCySelector('last-name'),
  userInfoNewEmail: getDataCySelector('new-email'),
  userInfoConfirmEmail: getDataCySelector('confirmation-email'),
  userInfoSubmit: getDataCySelector('save_user_details'),
  userInfoNewEmailError: getDataCySelector('newEmail-error'),
  userInfoHeadline: ('.mx-auto > :nth-child(1) > :nth-child(1) > .text-sm'),
}

const profile = {
  profileDropdown: getDataCySelector('profile-dropdown'),
  generalSettings: getDataCySelector('general-settings'),
  profileImageIcon: getDataCySelector('upload-user-image-button'),
  profileImageInput: getDataCySelector('upload-user-image-input'),
  profileImageCancelButton: getDataCySelector('cancel-image-cropper-button'),
  profileImageSaveButton: getDataCySelector('crop-image-button'),
  profileImageUploadButton: getDataCySelector('update-user-image'),
  profileUploadSuccessMessage: getDataCySelector('alert-toast-content'),
  profileImageDeleteButton: getDataCySelector('delete-user-image'),
  profileImagedeletePopUpMessage: ('.mt-2 > .text-sm'),
  profileImagedeletePopUpCancelButton: getDataCySelector('cancel-button'),
  profileImagedeletePopUpConfirmButton: getDataCySelector('confirm-button'),
  profileImageDeleteSuccessMessage: getDataCySelector('alert-toast-content'),
}

const notifications = {
  notificationsTab: getDataCySelector('notifications'),
  notificationsMArkAsReadButton: getDataCySelector('trigger-tile-action-button'),
  notificationsIcon: getDataCySelector('notifications-dropdown'),
  notificationViewAllButton:getDataCySelector('trigger-header-action-button'),
  notificationUploadPictureButton:getDataCySelector('tile-action-button'),
  notificationOrangeButton:getDataCySelector('tile-indicator-icon'),
  notificationsToastMessage:getDataCySelector('alert-toast-content'),
  notificationsRead:getDataCySelector('read-notifications'),
  notificationsUnread:getDataCySelector('unread-notifications'),
  notificationsAll:getDataCySelector('all-notifications'),
}

const team = {
  teamTable: getDataCySelector('users-table'),
  searchInput: getDataCySelector('search-input'),
  teamMembersCount: getDataCySelector('team-members-count'),
  tableScrollableContainer: getDataCySelector('table-scrollable-container'),
}

export const selectors = {
  homePage,
  signUpForm,
  signInForm,
  forgotPasswordForm,
  payment,
  general,
  profile,
  notifications,
  team,
}
