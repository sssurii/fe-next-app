import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { httpRequestMethods } from "@/common/utils/network/constants";
import {
  userDetailsUrl, userImageUrl,
} from "@/common/utils/network/endpoints";
import {
  UserImageDeleteRequestResponse, UseUserImageDeleteProps,
} from "@/app/(protected)/settings/general/profileImage/types";
import { toast } from "react-hot-toast";
import { handleFetchError } from "@/common/utils/network/errorHandler";
import lang from "@/common/lang";

const { settings: {
  general: {
    userImageDeleteError,
    userImageDeleteSuccess,
  },
} } = lang;

const { DELETE } = httpRequestMethods;

const imageDeleteFetcher = async (key: string) => {
  return fetcher(key, {
    arg: {
      method: DELETE,
    },
  });
}
export const useUserImageDelete = ({ setCroppedImage }: UseUserImageDeleteProps) => {
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    trigger: triggerDeleteUserImage, isMutating: isDeletingUserImage,
  } = useSWRMutation(userImageUrl, imageDeleteFetcher);

  const openDeleteConfirmationModal = () => setDeleteConfirmationOpen(true);
  const closeDeleteConfirmationModal = () => setDeleteConfirmationOpen(false);

  const onUserImageDelete = async () => {
    try {
      const result: UserImageDeleteRequestResponse = await  triggerDeleteUserImage()
      toast.success(result?.message || userImageDeleteSuccess);
      await mutate(userDetailsUrl);
      setCroppedImage('');
      closeDeleteConfirmationModal();
    } catch (error) {
      handleFetchError(error, userImageDeleteError);
    }
  }

  return {
    onUserImageDelete,
    isDeletingUserImage,
    isDeleteConfirmationOpen,
    openDeleteConfirmationModal,
    closeDeleteConfirmationModal,
  }
}
