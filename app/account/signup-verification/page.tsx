'use client';
import Link from 'next/link'
import {
  useForm, Controller,
} from 'react-hook-form';
import lang from '@/common/lang';
import { Input } from "@/common/components/molecules";
import {
  Button, Typography, ContentLayout,
} from "@/common/components/atoms";
import { routes } from "@/common/routes";

const { signUpVerification: signUpVerificationCopy } = lang;

const SignupVerification = () => {
  const { control } = useForm();
  return (
    <ContentLayout>
      <div className="w-full flex items-center flex-col">
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="mb-12">
            <Typography variant="h4" classes="text-center font-semibold text-text-primary text-2xl">
              {signUpVerificationCopy.header}
            </Typography>
            <Typography variant="p" classes="text-center font-medium text-text-secondary mt-3 text-sm">
              {signUpVerificationCopy.instructions}
            </Typography>
          </div>
          <form className="w-full" onSubmit={() => null}>
            <Controller
              control={control}
              name="verificationCode"
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
                    data-cy="verification-code"
                    labelText={signUpVerificationCopy.code}
                    error={!!error}
                    errorMessage={error?.message}
                    {...fieldProperties}
                  />)}
              }
            />
            <div className="mt-8">
              <Button
                type="submit"
                variant="solid"
                size="sm"
                data-cy="verify-account"
                width="w-full"
              >
                {signUpVerificationCopy.verifyAccount}
              </Button>
            </div>
          </form>
          <div className="w-full mt-9 text-center">
            <Typography variant="span" classes="text-text-secondary text-sm" data-cy="no-code">
              {signUpVerificationCopy.noCode}
            </Typography>
            {' '}
            <Link href={routes.signUpVerificationPath} className="text-sm text-brand-500 hover:text-brand-300" data-cy="resend-code">
              {signUpVerificationCopy.resendCode}
            </Link>
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

export default SignupVerification;
