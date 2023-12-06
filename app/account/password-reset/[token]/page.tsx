'use client';
import {
  useMemo, useEffect,
} from 'react';
import {
  useForm, Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  PasswordValidation, Loader, Input,
} from "@/common/components/molecules";
import {
  Button, Typography, ContentLayout,
} from "@/common/components/atoms";
import lang from '@/common/lang';
import type { ResetPasswordDTO } from '../../types';
import { resetPasswordValidationSchema } from '../validationSchema';
import { PasswordResetProps } from "@/app/account/password-reset/[token]/types";
import { usePasswordReset } from "@/app/account/password-reset/[token]/usePasswordReset";
import { usePasswordValidationVisibility } from "@/common/hooks";

const { resetPassword: resetPasswordCopy } = lang;

const ResetPassword = ({
  params, searchParams,
}: PasswordResetProps) => {

  const {
    isLoading, resetPassword,
  } = usePasswordReset({
    params,
    searchParams,
  });
  const {
    showValidation, hideValidation, isValidationVisible,
  } = usePasswordValidationVisibility();

  const {
    handleSubmit, control, formState: { isValid }, watch,
  } = useForm<ResetPasswordDTO>({
    resolver: yupResolver(resetPasswordValidationSchema),
    mode: 'onBlur',
  });
  const password = watch('password');

  const passwordValidations = useMemo(() => {
    return <PasswordValidation passwordValue={password} onValidityChange={() => { return; }} />;
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
          <div className="mb-12">
            <Typography variant="h4" classes="text-center font-semibold text-text-primary text-2xl">
              {resetPasswordCopy.header}
            </Typography>
            <Typography variant="p" classes="text-center font-medium text-text-secondary mt-3 text-sm">
              {resetPasswordCopy.instruction}
            </Typography>
          </div>
          <form className="w-full" onSubmit={handleSubmit(resetPassword)}>
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
                    labelText={resetPasswordCopy.newPassword}
                    error={!!error}
                    errorMessage={error?.message}
                    onFocus={showValidation}
                    {...fieldProperties}
                  />)}
              }
            />
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
                      labelText={resetPasswordCopy.confirmPassword}
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                    />)}
                }
              />
            </div>
            <div className="mt-6">
              <Button
                type="submit"
                variant="solid"
                size="md"
                disabled={!isValid}
                data-cy="reset-password"
                width="w-full"
              >
                {resetPasswordCopy.resetPasswordCTA}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ContentLayout>
  );
};

export default ResetPassword;
