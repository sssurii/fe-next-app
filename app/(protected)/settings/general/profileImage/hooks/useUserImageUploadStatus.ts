import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { toast } from "react-hot-toast";
import { fetcher } from "@/common/utils/network/baseFetcher";
import lang from "@/common/lang";
import { httpRequestMethods } from "@/common/utils/network/constants";
import {
  userDetailsUrl, userImageUploadStatusUrl,
} from "@/common/utils/network/endpoints";
import {
  useCallback, useEffect, useRef, useState,
} from "react";
import { UserImageUploadStatusRequestResponse } from "@/app/(protected)/settings/general/profileImage/types";
import { setUserImageUploadStatus } from "@/app/(protected)/settings/helpers";
import { handleFetchError } from "@/common/utils/network/errorHandler";

import {
  initialTimeoutCount, maxTimeoutCount, timeoutDelay,
} from "@/app/(protected)/settings/helpers/constants";

const { settings: {
  general: {
    userImageProcessingTimeout,
    userImageUploadProcessError,
  },
} } = lang;
const { GET } = httpRequestMethods;

const imageUploadStatusFetcher = async (key: string) => {
  return fetcher(key, {
    arg: {
      method: GET,
    },
  });
}

export const useUserImageUploadStatus = () => {
  const { mutate } = useSWRConfig();
  const [timeoutCount, setTimeoutCount] = useState(initialTimeoutCount);
  const [shouldCheckUserImageUploadStatus, setShouldCheckUserImageUploadStatus] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setShouldCheckUserImageUploadStatusOn = () => setShouldCheckUserImageUploadStatus(true);
  const setShouldCheckUserImageUploadStatusOff = () => setShouldCheckUserImageUploadStatus(false);

  const {
    trigger: triggerCheckUserImageUploadStatus,
  } = useSWRMutation(userImageUploadStatusUrl, imageUploadStatusFetcher);

  const increaseTimeoutCount = () => {
    setTimeoutCount((prevCount: number) => prevCount + 1);
  }

  const resetTimeoutState = () => {
    setShouldCheckUserImageUploadStatusOff();
    setTimeoutCount(initialTimeoutCount);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const checkUserImageUploadStatus = useCallback(async () => {
    try {
      const response: UserImageUploadStatusRequestResponse = await triggerCheckUserImageUploadStatus()
      setUserImageUploadStatus({
        status: response.data.status,
        timeoutCount,
        setShouldCheckUserImageUploadStatusOff,
        callback: increaseTimeoutCount,
        revalidateUserDetails: () => mutate(userDetailsUrl),
      });
    } catch (error) {
      handleFetchError(error, userImageUploadProcessError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeoutCount])

  const runImageUploadStatusTimeout = useCallback(() => {
    if (timeoutCount >= maxTimeoutCount) {
      resetTimeoutState();
      toast.error(userImageProcessingTimeout);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      await checkUserImageUploadStatus();

      if (timeoutCount === maxTimeoutCount) {
        return resetTimeoutState();
      }
    }, timeoutDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkUserImageUploadStatus, timeoutCount])


  useEffect(() => {
    if (!shouldCheckUserImageUploadStatus) {
      return;
    }

    runImageUploadStatusTimeout();
  }, [runImageUploadStatusTimeout, shouldCheckUserImageUploadStatus]);


  useEffect(() => {
    return resetTimeoutState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    shouldCheckUserImageUploadStatus,
    setShouldCheckUserImageUploadStatusOn,
    setShouldCheckUserImageUploadStatusOff,
  }
}
