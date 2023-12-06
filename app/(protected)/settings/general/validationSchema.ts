import * as Yup from 'yup';
import lang from '@/common/lang';
import { emailRegex } from "@/common/constants";
const { auth: {
  fieldRequired, emailFormat, emailsMustMatch,
} } = lang;

export const userDetailsValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(fieldRequired),
  lastName: Yup.string().required(fieldRequired),
  email: Yup.string()
    .required(fieldRequired)
    .matches(emailRegex, {
      message: emailFormat,
      excludeEmptyString: true,
    }),
  newEmail: Yup.string()
    .when('confirmationEmail', {
      is: (confirmationEmail: string) => confirmationEmail?.length > 0,
      then: (schema) => schema
        .required(fieldRequired)
        .matches(emailRegex, {
          message: emailFormat,
          excludeEmptyString: true,
        }),
      otherwise: (schema) => schema.optional(),
    }),
  confirmationEmail: Yup.string()
    .when('newEmail', {
      is: (newEmail: string) => newEmail?.length > 0,
      then: (schema) => schema
        .required(fieldRequired)
        .matches(emailRegex, {
          message: emailFormat,
          excludeEmptyString: true,
        })
        .oneOf([Yup.ref('newEmail')], emailsMustMatch),
      otherwise: (schema) => schema.optional(),
    }),
}, [['confirmationEmail', 'newEmail']]);
