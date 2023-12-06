import { useMemo } from "react";
import useSWR from 'swr';
import { UserDetailsRequestResponse } from "@/app/(protected)/settings/general/userInformation/types";
import { userDetailsUrl } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { parseObjectPropertiesToCamelCase } from "@/common/utils/helpers";

export const useGetUserDetails = () => {
  const result = useSWR<UserDetailsRequestResponse>(
    userDetailsUrl, fetcher,
    { revalidateOnFocus: false },
  );
  const {
    data, isLoading, isValidating, error,
  } = result;

  const userDetailsParsed = useMemo(() => parseObjectPropertiesToCamelCase(data?.data), [data?.data]);

  return {
    userDetails: userDetailsParsed,
    isLoading,
    isValidating,
    error,
  }
}
