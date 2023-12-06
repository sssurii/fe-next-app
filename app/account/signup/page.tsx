'use client';
import Link from 'next/link';
import {
  useMemo, useEffect,
} from 'react';
import {
  useForm,
  Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Checkbox, Input, Loader, PasswordValidation,
} from '@/common/components/molecules';
import lang from '@/common/lang';
import type { SignUpDTO } from '../types';
import { signupValidationSchema } from './validationSchema';
import {
  Button, ContentLayout, Typography,
} from "@/common/components/atoms";
import { routes } from "@/common/routes";
import { useSignup } from "@/app/account/signup/useSignup";
import { usePasswordValidationVisibility } from "@/common/hooks";

const { signUp: signUpCopy } = lang;

const SignUp = () => {
  const {
    handleSubmit,
    control,
    watch,
  } = useForm<SignUpDTO>({
    resolver: yupResolver(signupValidationSchema),
    mode: 'onSubmit',
  });
  const {
    isLoading, onSubmit,
  } = useSignup();
  const {
    showValidation, hideValidation, isValidationVisible,
  } = usePasswordValidationVisibility();
  const password = watch('password');
  const passwordValidations = useMemo(() => {
    return (
      <PasswordValidation
        passwordValue={password}
        onValidityChange={() => {
          return;
        }}
      />
    );
  }, [password]);

  useEffect(() => {
    const passwordElement = document.getElementById('password');
    passwordElement?.addEventListener('focusout', hideValidation);
    return () => {
      passwordElement?.removeEventListener('focusout', hideValidation);
    };
  }, [hideValidation]);

  const validationClasses = isValidationVisible ? 'h-20 px-2 mt-3' : 'h-0';
  return (
    <ContentLayout>
      {isLoading && <Loader />}
      <div className="w-full flex items-center flex-col">
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="mt-10 mb-10">
            <Typography variant="h4" classes="font-semibold text-text-primary text-2xl">
              {signUpCopy.header}
            </Typography>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap sm:justify-between">
              <Controller
                control={control}
                name="firstName"
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      width="w-full sm:w-[47%]"
                      id={field.name}
                      data-cy="first-name"
                      labelText={signUpCopy.firstName}
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="lastName"
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      width="w-full mt-5 sm:w-[47%] sm:mt-0"
                      id={field.name}
                      data-cy="last-name"
                      labelText={signUpCopy.lastName}
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                    />
                  );
                }}
              />
            </div>
            <div className="flex mt-5">
              <Controller
                control={control}
                name="email"
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      width="w-full"
                      id={field.name}
                      type="email"
                      data-cy="email"
                      labelText={signUpCopy.email}
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                    />
                  );
                }}
              />
            </div>
            <div className="flex mt-5">
              <Controller
                control={control}
                name="password"
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      width="w-full"
                      id={field.name}
                      type="password"
                      data-cy="password"
                      labelText={signUpCopy.password}
                      error={!!error}
                      errorMessage={error?.message}
                      onFocus={showValidation}
                      {...fieldProperties}
                    />
                  );
                }}
              />
            </div>
            <div className={`${validationClasses} overflow-hidden transition-all duration-300 ease-in-out`}>
              {passwordValidations}
            </div>
            <div className="flex mt-5">
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      width="w-full"
                      id={field.name}
                      type="password"
                      data-cy="password-confirmation"
                      labelText={signUpCopy.confirmPassword}
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                    />
                  );
                }}
              />
            </div>
            <div className="flex mt-6">
              <Controller
                name="termsAndConditions"
                control={control}
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Checkbox
                      error={!!error}
                      errorMessage={error?.message}
                      checked={!!field.value}
                      id={field.name}
                      data-cy="terms-and-conditions"
                      {...fieldProperties}
                      label={
                        <div className="inline-block">
                          <Typography variant="span" classes="text-text-primary text-sm">
                            {signUpCopy.iAgree}
                          </Typography>
                          {' '}
                          <Link
                            href={routes.homePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-brand-500 hover:text-brand-300"
                          >
                            {signUpCopy.terms}
                          </Link>
                        </div>
                      }
                    />
                  );
                }}
              />
            </div>
            <div className="mt-6">
              <Button
                type="submit"
                variant="solid"
                size="sm"
                data-cy="submit-button"
                width="w-full"
              >
                {signUpCopy.submitButtonLabel}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-full flex flex-col items-center mt-8">
          <div>
            <Typography variant="span" classes="text-text-secondary text-sm">
              {signUpCopy.accountExists}
            </Typography>
            {' '}
            <Link href={routes.loginPath} className="text-sm text-brand-500 hover:text-brand-300">
              {signUpCopy.login}
            </Link>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default SignUp;
