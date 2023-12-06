const header = {
  logout: 'Log out',
  settings: 'Settings',
  close: 'Close',
  notifications: 'Notifications',
  clear: 'Clear',
  viewAll: 'View all',
  ariaLabels: {
    company: 'Your company name',
    openMenu: 'Open main menu',
    openNotifications: 'Open notifications',
    closeMenu: 'Close main menu',
    avatar: 'User avatar',
  },
}

const dashboard = {
  title: 'Admin Page',
  login: 'Log in',
  logout: 'Log out',
  settings: 'Settings',
  close: 'Close',
  loggedIn: 'You are signed in successfully!',
  payment: 'Payment',
};

const home = {
  title: ' Platform Template',
  visitDocsText: 'Visit Documentation',
  signUp: 'Sign up',
  login: 'Log in',
  logout: 'Log out',
  payment: 'Payment',
  loggedIn: 'You are signed in successfully!',
  admin: 'Admin',
  dashboard: 'Dashboard',
};

const signUp = {
  header: 'Create an account',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  newEmail: 'New email',
  confirmationEmail: 'Re-enter email',
  emailPlaceholder: 'Email address',
  password: 'Password',
  passwordPlaceholder: 'Password',
  confirmPassword: 'Re-enter password',
  submitButtonLabel: 'Sign up',
  iAgree: 'I agree to the',
  terms: 'Terms & Conditions',
  acknowledge: 'and acknowledge the',
  privacyPolicy: 'Privacy Policy',
  accountExists: 'Already a member?',
  login: 'Sign in',
  errorSigningUp: 'Error signing up.',
  save: 'Save',
};

const signIn = {
  header: 'Sign in to your account',
  email: 'Email',
  emailPlaceholder: 'Email address',
  password: 'Password',
  passwordPlaceholder: 'Password',
  submitButtonLabel: 'Sign in',
  forgotPassword: 'Forgot password?',
  notAMember: 'Not a member?',
  createAccount: 'Create an account',
  donthaveAccount: 'Don’t have an account?',
  signUp: 'Sign up',
  signInError: 'Please enter a valid email and password.',
  rememberMe: 'Remember me',
};

const forgotPassword = {
  resetPassword: 'Reset Password',
  instructions: 'Please enter your email and we’ll send you instructions on how to reset your password',
  emailAddress: 'Email address',
  sendEmail: 'Send email',
  noEmail: 'Didn’t receive an email?',
  contactSupport: 'Contact support',
  errorResettingPassword: 'Error resetting password.',
  success: 'Email sent!',
};

const resetPassword = {
  header: 'Reset password',
  headerSuccess: 'Password reset',
  instruction: 'Please enter your new password',
  newPassword: 'Password',
  confirmPassword: 'Re-enter password',
  resetPasswordCTA: 'Reset Password',
  success: 'Password reset',
  successMessage: 'Your password has been reset. Please sign in to your account',
  error: 'Error resetting password.',
  login: 'Sign in',
};

const auth = {
  emailFormat: 'Please enter a valid email address',
  emailsMustMatch: 'Email fields must be the same',
  passwordFormat: 'Please enter a valid password',
  fieldRequired: 'This field is required',
  passwordValidationCheck: 'Please make sure your passwords match',
  password: {
    lowercase: 'One lowercase character',
    uppercase: 'One uppercase character',
    number: 'One number',
    special: 'One special character',
    length: '8 characters minimum',
  },
  consent: 'You must agree to Privacy Policy to proceed',
};

const signUpSuccess = {
  header: 'Thanks for signing up',
  login: 'Sign in',
  description: 'Please verify your account by clicking on the activation link you received in the email',
  emailNotReceived: 'Didn’t receive the email?',
  resendEmail: 'Resend email',
}

const confirmEmailSuccess = {
  header: 'Congrats {userName}!',
  description: 'You’re now officially our youngest member!',
  login: 'Fantastic',
}

const signUpVerification = {
  header: 'Thanks for signing up',
  instructions: 'Please verify your email by entering the confirmation code sent to %email%',
  code: 'Verification code',
  verifyAccount: 'Verify account',
  noCode: 'Didn’t receive a code?',
  resendCode: 'Resend code',
}

const settingsNavigation = {
  general: 'General',
  notifications: 'Notifications',
  plan: 'Plan',
  billing: 'Billing',
  support: 'Support',
}

const settings = {
  billing: {
    header: 'Payment',
    description: 'Manage your payment details',
    paymentMethod: 'Payment method',
    ending: 'Ending in',
    expires: 'Expires',
    lastUpdated: 'Last updated on',
    noPaymentMethod: 'No payment method added',
    edit: 'Edit',
    undefinedPaymentDetails: 'N/A',
  },
  general: {
    userInfoHeader: 'User information',
    userInfoDescription: 'Your personal information tied to your account',
    userInfoUpdateSuccess: 'User information updated successfully',
    userImageUpdateSuccess: 'User image updated successfully',
    userImageProcessed: 'User image processed successfully',
    userImageProcessingFailed: 'User image processing failed',
    userImageProcessingTimeout: 'User image processing timeout, please try again later',
    userImageUpdateError: 'Error updating user image',
    errorWhileReadingFile: 'Error while reading file',
    userImageCroppingError: 'An error occurred while saving the image',
    userImageUploadProcessError: 'Error checking the user image upload process',
    imageSizeError: 'Image size should be less than',
    imageTypeError: 'Image type should be JPG or PNG',
    userInfoUpdateError: 'Error updating user information',
    emailChangeInfo: `*Changing the email address will result in logging out and the need to confirm the new e-mail 
    address by clicking on the activation link sent to your inbox.`,
    profileImage: 'Profile image',
    profileImageDescription: 'Your profile image',
    update: 'Update',
    processing: 'Processing...',
    userAvatar: 'User avatar',
    deleteImage: 'Delete',
    userImageDeleteSuccess: 'User image deleted successfully',
    userImageDeleteError: 'Error deleting user image',
    errorWhileFetchingUserDetails: 'Error while fetching user details',
    imageUploadStatusInvalid: 'Invalid status',
  },
}

const dropdown = {
  ariaLabels: {
    dropdownButton: 'Dropdown button',
  },
}

const modal = {
  ariaLabels: {
    close: 'Close modal',
  },
}

const flyoutMenu = {
  ariaLabels: {
    open: 'Flyout menu button',
  },
}

const cropperModal = {
  save: 'Save',
  cancel: 'Cancel',
  crop: 'Crop image',
  zoom: 'Zoom',
}

const confirmationModal = {
  confirm: 'Confirm',
  cancel: 'Cancel',
}

const removeProfileImageModal = {
  title: 'Remove profile image',
  description: 'Are you sure you want to remove your profile image?',
}

const notifications = {
  allClear: 'All clear',
  header: 'Notifications',
  description: 'Alerts from your team members',
  errorMarkingNotificationAsRead: 'Error marking notification as read',
  notificationMarkedAsRead: 'Notification marked as read',
  allNotificationsMarkedAsRead: 'All notifications marked as read',
  errorMarkingAllNotificationsAsRead: 'Error marking all notifications as read',
  title: 'Title',
  message: 'Message',
  markAsRead: 'Mark as read',
  emptyNotifications: 'You don’t have any notifications yet',
  uploadPicture: 'Upload picture',
}

const payments = {
  header: 'Payment',
  paymentCheckoutError: 'Error checking out payment session',
}

const team = {
  search: 'Search by email',
  members: 'Members',
  noResults: 'No users found',
  noMatchingResults: 'No members match your search, please try again',
}

const responseErrorMessages = {
  unauthorized: 'Unauthorized',
  specifyFeatureFlag: 'Please specify a flag to check',
  flagNotFound: 'Flag not found',
  fetchError: 'Fetch error',
  serverError: 'Server error',
  methodNotAllowed: 'Method not allowed',
}

const signupVerificationExpired = {
  header: 'This link has already been used or expired',
  description: 'We can send a new link to %email% to help you get started',
  resendLink: 'Resend link',
}

const support = {
  header: 'Support',
  description: 'Contact our support team',
}

const boundaryError = {
  title: 'Error',
  description: 'Something went wrong. Please try again later or contact our support team.',
  buttonText: 'Try again',
}

export const lang = {
  header,
  dashboard,
  home,
  signUp,
  signIn,
  auth,
  forgotPassword,
  resetPassword,
  signUpSuccess,
  confirmEmailSuccess,
  signUpVerification,
  settingsNavigation,
  settings,
  dropdown,
  modal,
  cropperModal,
  confirmationModal,
  removeProfileImageModal,
  flyoutMenu,
  notifications,
  payments,
  team,
  responseErrorMessages,
  signupVerificationExpired,
  support,
  boundaryError,
};

export default lang;
