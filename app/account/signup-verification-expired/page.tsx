'use client';
import {
  Button, ContentLayout, Typography,
} from "@/common/components/atoms";
import lang from "@/common/lang";

const { signupVerificationExpired } = lang;

const SignUpVerificationExpired = () => {
  return (
    <ContentLayout>
      <div className="w-full flex items-center flex-col">
        <div className="w-full sm:w-96 mb-6">
          <Typography variant="h4" classes="text-center font-semibold text-text-primary text-2xl">
            {signupVerificationExpired.header}
          </Typography>
          <Typography variant="p" classes="text-center font-medium text-text-secondary mt-6 text-sm">
            {signupVerificationExpired.description}
          </Typography>
        </div>
        <Button
          type="button"
          variant="solid"
          size="sm"
          data-cy="resend-verification-email"
          onClick={() => null}
        >
          {signupVerificationExpired.resendLink}
        </Button>
      </div>
    </ContentLayout>
  )
}

export default SignUpVerificationExpired;
