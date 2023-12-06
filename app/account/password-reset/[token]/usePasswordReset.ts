import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ResetPasswordDTO } from "@/app/account/types";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { handleFetchError } from "@/common/utils/network/errorHandler";
import { PasswordResetProps } from "@/app/account/password-reset/[token]/types";
import { httpRequestMethods } from "@/common/utils/network/constants";
import useSWRMutation from "swr/mutation";
import { resetPasswordUrl } from "@/common/utils/network/endpoints";
import { routes } from "@/common/routes";
import { fetcher } from "@/common/utils/network/baseFetcher";
import lang from "@/common/lang";

const { resetPassword: resetPasswordCopy } = lang;
const { POST } = httpRequestMethods;

export const usePasswordReset = ({
  params, searchParams,
}: PasswordResetProps) => {
  const { token } = params;
  const { email } = searchParams;
  const router = useRouter();

  const resetPasswordOnBE = useSWRMutation(resetPasswordUrl, fetcher);
  const {
    trigger, isMutating: isLoading,
  } = resetPasswordOnBE;

  const resetPassword: SubmitHandler<ResetPasswordDTO> = async (data) => {
    const body = parseObjectPropertiesToSnakeCase({
      ...data,
      token,
      email,
    });

    try {
      await trigger({
        body,
        method: POST,
      });
      router.push(routes.resetPasswordSuccessPath)
    } catch (error) {
      handleFetchError(error, resetPasswordCopy.error);
    }
  };

  return {
    resetPassword,
    isLoading,
  }
}
