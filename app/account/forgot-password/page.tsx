'use client';
import Link from 'next/link'
import {
  useForm, Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Loader, Input,
} from '@/common/components/molecules';
import {
  Button, Typography, ContentLayout,
} from "@/common/components/atoms";
import lang from '@/common/lang';
import { ForgotPasswordDTO } from '../types';
import { forgotPasswordValidationSchema } from './validationSchema';
import { routes } from "@/common/routes";
import { useForgotPassword } from './useForgotPassword';

const { forgotPassword: forgotPasswordCopy } = lang;

const ForgotPassword = () => {
  const {
    isLoading, onSubmit,
  } = useForgotPassword();
  const {
    handleSubmit, control, formState: { isValid },
  } = useForm<ForgotPasswordDTO>({
    resolver: yupResolver(forgotPasswordValidationSchema),
    mode: 'onBlur',
  });

  return (
    <ContentLayout>
      {isLoading && <Loader />}
      <div className="w-full flex items-center flex-col">
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="mb-12">
            <Typography variant="h4" classes="text-center font-semibold text-text-primary text-2xl">
              {forgotPasswordCopy.resetPassword}
            </Typography>
            <Typography variant="p" classes="text-center font-medium text-text-secondary mt-3 text-sm">
              {forgotPasswordCopy.instructions}
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
                    labelText={forgotPasswordCopy.emailAddress}
                    error={!!error}
                    errorMessage={error?.message}
                    {...fieldProperties}
                  />)}
              }
            />
            <div className="mt-6">
              <Button
                type="submit"
                variant="solid"
                size="md"
                disabled={!isValid}
                data-cy="send-link"
                width="w-full"
              >
                {forgotPasswordCopy.sendEmail}
              </Button>
            </div>
          </form>
          <div className="w-full mt-9 text-center">
            <Typography variant="span" classes="text-text-secondary text-sm" data-cy="no-email">
              {forgotPasswordCopy.noEmail}
            </Typography>
            {' '}
            <Link href={routes.homePath} className="text-sm text-brand-500 hover:text-brand-300" data-cy="contact-support">
              {forgotPasswordCopy.contactSupport}
            </Link>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default ForgotPassword;
