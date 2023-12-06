'use client';
import {
  Typography, ContentLayout,
} from "@/common/components/atoms";
import lang from '@/common/lang';

const { signUpSuccess } = lang;
const Success = () => {
  return (
    <ContentLayout>
      <div className="w-full flex items-center flex-col">
        <div className="w-full sm:w-96">
          <Typography variant="h4" classes="text-center font-semibold text-text-primary text-2xl">
            {signUpSuccess.header}
          </Typography>
          <Typography variant="p" classes="mt-6 text-center text-text-secondary text-sm">
            {signUpSuccess.description}
          </Typography>
          <Typography variant="p" classes="mt-6 text-center text-grey-500 text-sm">
            {signUpSuccess.emailNotReceived}
            {' '}
            <button
              type="button"
              onClick={() => null}
              className="text-sm text-brand-500 hover:text-brand-300"
            >
              {signUpSuccess.resendEmail}
            </button>
          </Typography>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Success;
