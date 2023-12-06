'use client';
import { useEffect } from "react";
import {
  useForm, Controller,
} from 'react-hook-form';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Input, Loader, Checkbox,
} from '@/common/components/molecules';
import {
  Button, Typography, ContentLayout,
} from "@/common/components/atoms";
import { Logo } from '@/common/components/icons';
import lang from '@/common/lang';
import { routes } from "@/common/routes";
import { useSignIn } from "@/app/account/signin/useSignIn";
import type { SignInDTO } from '../types';
import { signInValidationSchema } from './validationSchema';

const { signIn: signInCopy } = lang;

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<SignInDTO>({
    resolver: yupResolver(signInValidationSchema),
    mode: 'onBlur',
    defaultValues: {
      remember: false,
    },
  });
  const {
    data: session,
    status,
  } = useSession();
  const {
    isLoading, onSubmit, isRememberOption,
  } = useSignIn();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(routes.dashboardPath);
    }
  }, [session, router]);

  return (
    <ContentLayout>
      {(isLoading || status === 'loading') && <Loader/>}
      <div className="w-full flex items-center flex-col">
        <Link href={routes.homePath}>
          <Logo width={80} height={40} />
        </Link>
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="mt-10 mb-10">
            <Typography variant="h4" classes="font-semibold text-text-primary text-2xl">
              {signInCopy.header}
            </Typography>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                    labelText={signInCopy.email}
                    error={!!error}
                    errorMessage={error?.message}
                    {...fieldProperties}
                  />)}
              }
            />
            <div className="mt-6">
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
                      labelText={signInCopy.password}
                      error={!!error}
                      errorMessage={error?.message}
                      optionalText={
                        <Link
                          href={routes.forgotPasswordPath}
                          className="hidden lg:inline text-sm text-brand-500 hover:text-brand-300"
                          data-cy="forgot-password-link"
                        >
                          {signInCopy.forgotPassword}
                        </Link>}
                      {...fieldProperties}
                    />)}
                }
              />
            </div>
            {isRememberOption && (
              <div className="flex mt-6">
                <Controller
                  name="remember"
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
                        data-cy="remember-me"
                        {...fieldProperties}
                        label={signInCopy.rememberMe}
                      />
                    );
                  }}
                />
              </div>
            )}
            <div className="mt-6">
              <Button
                type="submit"
                variant="solid"
                size="sm"
                disabled={!isValid}
                data-cy="submit-button"
                width="w-full"
              >
                {signInCopy.submitButtonLabel}
              </Button>
            </div>
          </form>
          <div className="w-full flex flex-col items-center mt-8">
            <Link href={routes.forgotPasswordPath} className="lg:hidden text-sm text-brand-500 hover:text-brand-300 mb-8" data-cy="forgot-password-link-mobile">
              {signInCopy.forgotPassword}
            </Link>
            <div>
              <Typography variant="span" classes="text-text-secondary text-sm">
                {signInCopy.notAMember}
              </Typography>
              {' '}
              <Link href={routes.signupPath} className="text-sm text-brand-500 hover:text-brand-300">
                {signInCopy.createAccount}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default SignIn;
