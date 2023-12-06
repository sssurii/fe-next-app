import * as Yup from 'yup';
import lang from '@/common/lang';
import { emailRegex } from '@/common/constants';
const {
  auth: {
    emailFormat, passwordFormat, passwordValidationCheck, fieldRequired, consent,
  },
} = lang;

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(fieldRequired),
  lastName: Yup.string().required(fieldRequired),
  email: Yup.string()
    .required(fieldRequired)
    .matches(emailRegex, emailFormat),
  password: Yup.string().required(fieldRequired)
    .min(8, passwordFormat)
    .matches(/[A-Z]/, passwordFormat)
    .matches(/[a-z]/, passwordFormat)
    .matches(/[#?!@$%^&*-]/, passwordFormat)
    .matches(/[0-9]/, passwordFormat),
  passwordConfirmation: Yup.string()
    .required(fieldRequired)
    .oneOf([Yup.ref('password')], passwordValidationCheck),
  termsAndConditions: Yup.boolean()
    .required(consent)
    .oneOf([true], consent),
});
