'use client';
import {
  useEffect, useMemo, useState,
} from 'react';
import passwordValidator from './passwordValidator';
import { InputValue } from './types';
import { Typography } from "@/common/components/atoms/typography";

type PasswordValidationProps = {
  passwordValue: InputValue | null,
  onValidityChange?: (validity: boolean) => void,
}

type colorTypes = {
  default: 'default',
  valid: 'valid',
  invalid: 'invalid',
}

const textColors = {
  default: 'text-grey-800',
  valid: 'text-green-600',
  invalid: 'text-grey-800',
}

const dotColors = {
  default: 'bg-grey-800',
  valid: 'bg-green-600',
  invalid: 'bg-grey-800',
}

const getColorState = (valid: boolean, value: string) => {
  let defaultColorState = 'default';
  if (value.length > 0) {
    defaultColorState = valid ? 'valid' : 'invalid';
  }
  return defaultColorState;
};

export const PasswordValidation = ({
  passwordValue, onValidityChange = () => { return; },
} : PasswordValidationProps) => {
  const passwordValidationSchema = {
    uppercase: true,
    lowercase: true,
    number: true,
    min: 8,
    specialCharacter: true,
  };

  const [passwordValidations, setPasswordValidations] = useState(passwordValidator('', passwordValidationSchema));

  useEffect(() => {
    if (passwordValue === '' || passwordValue === null) {
      const validationRules = passwordValidator('', passwordValidationSchema);
      setPasswordValidations([...validationRules]);
      return;
    }
    if (passwordValue) {
      validatePassword(passwordValue);
    }
  }, [passwordValue]);

  useEffect(() => {
    const valid = passwordValidations.every((validation) => validation.valid);
    onValidityChange(valid);
  }, [passwordValidations]);

  const validatePassword = (value: InputValue) => {
    const castedValue = typeof value === 'string' ? value : value.toString();
    const valid = passwordValidator(castedValue, passwordValidationSchema);
    setPasswordValidations([...valid]);
  };

  const rules = useMemo(() => {
    return passwordValidations.map(({
      id, valid, message, value,
    }) => {
      const dotColor = dotColors[getColorState(valid, value) as keyof colorTypes];
      const textColor = textColors[getColorState(valid, value) as keyof colorTypes];
      return (
        <div className="flex items-center" key={id}>
          <div className={`w-1 h-1 mr-2 rounded-full ${dotColor}`}></div>
          <Typography variant="span" classes={`${textColor} text-xs`}>{message}</Typography>
        </div>
      );
    });
  }, [passwordValidations]);

  return (
    <div className="flex flex-col">
      {rules}
    </div>
  );
};
