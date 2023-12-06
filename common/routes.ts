const settings = '/settings';
const account = '/account';

export const routes = {
  homePath: '/',
  loginPath: `${account}/signin`,
  signupPath: `${account}/signup`,
  forgotPasswordPath: `${account}/forgot-password`,
  resetPasswordPath: `${account}/password-reset`,
  resetPasswordSuccessPath: `${account}/password-reset/success`,
  signUpVerificationPath: `${account}/signup-verification`,
  signUpVerificationExpiredPath: `${account}/signup-verification-expired`,
  accountSetupSuccessPath: `${account}/success`,
  dashboardPath: '/dashboard',
  teamPath: '/team',
  settingsPath: settings,
  generalSettingsPath: `${settings}/general`,
  billingSettingsPath: `${settings}/billing`,
  notificationsSettingsPath: `${settings}/notifications`,
  planSettingsPath: `${settings}/plan`,
  supportSettingsPath: `${settings}/support`,
}
