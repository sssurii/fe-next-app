import useSWRMutation from "swr/mutation";
import { toast } from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { forgotPasswordUrl } from "@/common/utils/network/endpoints";
import {
  ForgotPasswordDTO, ForgotPasswordRequestResponse,
} from "@/app/account/types";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { handleFetchError } from "@/common/utils/network/errorHandler";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { httpRequestMethods } from "@/common/utils/network/constants";
import lang from "@/common/lang";

const { POST } = httpRequestMethods;
const { forgotPassword: forgotPasswordCopy } = lang;

const forgotPasswordFetcher = async (key: string, { arg }: { arg: { body: ForgotPasswordDTO }}) => {
  return fetcher(key,{
    arg: {
      method: POST,
      body: parseObjectPropertiesToSnakeCase(arg.body),
    },
  })
}

export const useForgotPassword = () => {
  const {
    trigger, isMutating: isLoading,
  } = useSWRMutation(forgotPasswordUrl, forgotPasswordFetcher);

  const onSubmit: SubmitHandler<ForgotPasswordDTO> = async (data) => {
    try {
      const result: ForgotPasswordRequestResponse = await trigger({ body: parseObjectPropertiesToSnakeCase(data) });
      toast.success(result?.status)
    } catch (error) {
      handleFetchError(error, forgotPasswordCopy.errorResettingPassword);
    }
  };

  return {
    isLoading,
    onSubmit,
  }
}
