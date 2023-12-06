'use client';
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import {
  useRouter, useSearchParams,
} from "next/navigation";
import {
  Button, Typography, ContentLayout,
} from "@/common/components/atoms";
import {
  getLocalStorageItem, removeLocalStorageItem,
} from "@/common/utils/helpers";
import useSWRMutation from "swr/mutation";
import { logoutUrl } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { Logo } from "@/common/components/icons";
import lang from '@/common/lang';
import { routes } from "@/common/routes";
import { httpRequestMethods } from "@/common/utils/network/constants";
import { authToken } from "@/common/constants";

const { confirmEmailSuccess } = lang;
const { POST } = httpRequestMethods;

const Confirmed = () => {
  const signOutOnBE = useSWRMutation(
    logoutUrl, fetcher);
  const { trigger } = signOutOnBE;
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchUserName = searchParams.get('user_name') || '';
  const congratsText = confirmEmailSuccess.header.replace('{userName}', searchUserName);


  useEffect(() => {
    const handleLogout = async () => {
      const token = getLocalStorageItem(authToken)
      if (token) {
        await trigger({
          method: POST,
        });
      }
      await signOut({ redirect: false });
      removeLocalStorageItem(authToken);
    };
    void handleLogout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContentLayout>
      <div className="flex items-center flex-col">
        <div className="w-full flex items-center flex-col">
          <Logo width={80} height={40} />
          <Typography variant="h3" classes="mt-6 text-center font-semibold text-text-primary text-3xl">
            {congratsText}
          </Typography>
          <Typography variant="p" classes="w-[164px] mt-2.5 text-center text-text-secondary text-sm">
            {confirmEmailSuccess.description}
          </Typography>
          <div className="mt-12">
            <Button
              type="button"
              variant="solid"
              size="sm"
              data-cy="login"
              width="w-full"
              onClick={() => router.push(routes.loginPath)}
            >
              {confirmEmailSuccess.login}
            </Button>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Confirmed;
