import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { signUpUrl } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import {
  SignUpDTO, SignupRequestResponse,
} from "@/app/account/types";
import { routes } from "@/common/routes";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import {
  Dict, MixpanelEventName, mixpanelUserEvent,
} from "@/common/utils/mixpanel/eventTriggers";
import { handleFetchError } from "@/common/utils/network/errorHandler";
import { httpRequestMethods } from "@/common/utils/network/constants";
import lang from "@/common/lang";

const { signUp: signUpCopy } = lang;
const { POST } = httpRequestMethods;

const signUpUserFetcher = async (key: string, { arg }: { arg: { body: SignUpDTO }}) => {
  return fetcher(key, {
    arg: {
      method: POST,
      body: parseObjectPropertiesToSnakeCase(arg.body),
    },
  });
}

export const useSignup = () => {
  const router = useRouter();
  const signUp = useSWRMutation(signUpUrl, signUpUserFetcher);
  const {
    trigger, isMutating: isLoading, error,
  } = signUp;

  const onSubmit: SubmitHandler<SignUpDTO> = async (data) => {
    const payload: SignUpDTO = { ...data };

    try {
      const response: SignupRequestResponse = await trigger({ body: parseObjectPropertiesToSnakeCase(payload) });
      const id = response.data?.id.toString();
      const mixpanelProps: Dict = {
        $name: `${payload.firstName} ${payload.lastName}`,
        $distinct_id: id,
        $email: payload.email,
      }
      mixpanelUserEvent({
        mixpanelProps,
        id: id?.toString(),
        eventName: MixpanelEventName.register,
      });
      router.push(routes.accountSetupSuccessPath);
    } catch (error) {
      handleFetchError(error, signUpCopy.errorSigningUp);
    }
  };

  return {
    isLoading,
    onSubmit,
    error,
  }
}
