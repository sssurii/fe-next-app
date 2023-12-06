import useSWRMutation from "swr/mutation";
import { toast } from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import {
  UserDetailsDTO, UserDetailsRequestDTO,
} from "@/app/(protected)/settings/general/types";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { httpRequestMethods } from "@/common/utils/network/constants";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { userDetailsUrl } from "@/common/utils/network/endpoints";
import { UserDetailsRequestResponse } from "@/app/(protected)/settings/general/userInformation/types";
import { handleFetchError } from "@/common/utils/network/errorHandler";
import lang from "@/common/lang";

const { settings: {
  general: {
    userInfoUpdateError,
    userInfoUpdateSuccess,
  },
} } = lang;

const updateUserDetailsFetcher = async (key: string, { arg }: { arg: { body: UserDetailsRequestDTO }}) => {
  return fetcher(key, {
    arg: {
      method: httpRequestMethods.PATCH,
      body: parseObjectPropertiesToSnakeCase(arg.body),
    },
  });
}
export const useUpdateUserDetails = () => {
  const {
    data: updatedUserDetails, trigger: triggerUserDetailsUpdate, isMutating: isUpdatingUserDetails,
  } = useSWRMutation(userDetailsUrl, updateUserDetailsFetcher);

  const onUserDetailsUpdate: SubmitHandler<UserDetailsDTO> = async (data) => {
    const payload: UserDetailsRequestDTO = {
      firstName: data.firstName,
      lastName: data.lastName,
      ...(data.newEmail ? { email: data.newEmail } : {}),
    };
    try {
      const result: UserDetailsRequestResponse = await triggerUserDetailsUpdate({
        body: payload,
      })
      toast.success(result?.message || userInfoUpdateSuccess);
    } catch (error) {
      handleFetchError(error, userInfoUpdateError)
    }
  }

  return {
    onUserDetailsUpdate,
    isUpdatingUserDetails,
    updatedUserDetails,
  }
}
