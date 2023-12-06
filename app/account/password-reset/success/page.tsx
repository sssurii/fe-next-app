'use client';
import { useRouter } from "next/navigation";
import {
  Button, Typography,
} from "@/common/components/atoms";
import { routes } from "@/common/routes";
import { ContentLayout } from "@/common/components/atoms";
import lang from "@/common/lang";

const { resetPassword: resetPasswordCopy } = lang;

const Success = () => {
  const router = useRouter();
  return (
    <ContentLayout>
      <div className="w-full flex items-center flex-col">
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="mb-12">
            <Typography variant="h4" classes="text-center font-semibold text-text-primary text-2xl">
              {resetPasswordCopy.headerSuccess}
            </Typography>
            <Typography variant="p" classes="text-center font-medium text-text-secondary mt-3 text-sm">
              {resetPasswordCopy.successMessage}
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <Button
              type="button"
              variant="solid"
              size="md"
              data-cy="sign-in"
              width="w-full"
              onClick={() => router.push(routes.loginPath)}
            >
              {resetPasswordCopy.login}
            </Button>
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

export default Success;
