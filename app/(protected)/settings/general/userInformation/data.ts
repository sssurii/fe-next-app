import { FormInputProps } from "@/app/(protected)/settings/general/userInformation/types";

export const userDetailsFormInputs: FormInputProps[] = [{
  name: 'firstName',
  disabled: false,
  size: '47%',
  'data-cy': 'first-name',
}, {
  name: 'lastName',
  disabled: false,
  size: '47%',
  'data-cy': 'last-name',
}, {
  name: 'email',
  disabled: true,
  'data-cy': 'email',
}, {
  name: 'newEmail',
  disabled: false,
  'data-cy': 'new-email',
}, {
  name: 'confirmationEmail',
  disabled: false,
  'data-cy': 'confirmation-email',
}];
