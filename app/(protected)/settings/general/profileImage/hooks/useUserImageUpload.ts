import { useCallback } from "react";
import useSWRMutation from 'swr/mutation';
import { SubmitHandler } from "react-hook-form";
import { postImageFetcher } from '@/common/utils/network/baseFetcher';
import { userImageUrl } from "@/common/utils/network/endpoints";
import lang from "@/common/lang";
import { UserImageDTO } from "@/app/(protected)/settings/general/profileImage/types";
import { handleFetchError } from "@/common/utils/network/errorHandler";
import { toast } from "react-hot-toast";
import {
  httpRequestMethods, httpResponseStatuses,
} from "@/common/utils/network/constants";
import { prepareBlobFile } from "@/common/utils/helpers";
import { UseUserImageUploadStatusProps } from "@/app/(protected)/settings/general/profileImage/types";

const { settings: {
  general: {
    userImageProcessed,
    userImageUpdateError,
  },
} } = lang;
const { POST } = httpRequestMethods;

const imageUploadFetcher = async (key: string, { arg }: { arg: { body: FormData }}) => {
  return postImageFetcher(key, {
    arg: {
      method: POST,
      body: arg.body,
    },
  });
}

export const useUserImageUpload = ({
  setShouldCheckUserImageUploadStatusOff,
  setShouldCheckUserImageUploadStatusOn,
  croppedImage,
}: UseUserImageUploadStatusProps) => {
  const {
    trigger: triggerUserImageUpdate, isMutating: isUpdatingUserImage,
  } = useSWRMutation(userImageUrl, imageUploadFetcher);

  const onUserImageUpload: SubmitHandler<UserImageDTO> = useCallback(async () => {
    const file = await prepareBlobFile({
      image: croppedImage,
      errorCallback: setShouldCheckUserImageUploadStatusOff,
    })

    if (!file) {
      return toast.error(userImageUpdateError);
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await triggerUserImageUpdate({
        body: formData,
      })
      if (response?.code === httpResponseStatuses.ACCEPTED) {
        setShouldCheckUserImageUploadStatusOn();
        toast.success(userImageProcessed);
      }
    } catch (error) {
      handleFetchError(error, userImageUpdateError);
      setShouldCheckUserImageUploadStatusOff();
    }
  }, [
    croppedImage,
    setShouldCheckUserImageUploadStatusOff,
    setShouldCheckUserImageUploadStatusOn,
    triggerUserImageUpdate,
  ]);

  return {
    onUserImageUpload,
    isUpdatingUserImage,
  }
}
