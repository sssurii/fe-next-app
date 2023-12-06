import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { logoutUrl } from "@/common/utils/network/endpoints";
import { routes } from "@/common/routes";
import { httpRequestMethods } from "@/common/utils/network/constants";
import { removeLocalStorageItem } from "@/common/utils/helpers";
import { authToken } from "@/common/constants";

export const useLogout = () => {
  const router = useRouter();
  const signOutOnBE = useSWRMutation(
    logoutUrl, fetcher);
  const {
    trigger, isMutating: isLoading,
  } = signOutOnBE;

  const handleLogout = async () => {
    await trigger({
      method: httpRequestMethods.POST,
    });
    await signOut({ redirect: false });
    removeLocalStorageItem(authToken);
    router.push(routes.loginPath);
  };

  return {
    handleLogout,
    isLoading,
  };
};
