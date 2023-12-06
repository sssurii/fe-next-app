import { toast } from "react-hot-toast";
import { imageUploadApiStatuses } from "@/common/utils/network/constants";
import { maxTimeoutCount } from "@/app/(protected)/settings/helpers/constants";
import { SetUserImageUploadStatusProps } from "@/app/(protected)/settings/helpers/types";
import { handleFetchError } from "@/common/utils/network/errorHandler";
import lang from "@/common/lang";

const { settings: {
  general: {
    userImageProcessingFailed,
    userImageUpdateSuccess,
    errorWhileFetchingUserDetails,
    imageUploadStatusInvalid,
  },
} } = lang;

export const setUserImageUploadStatus = ({
  status, timeoutCount, callback, setShouldCheckUserImageUploadStatusOff, revalidateUserDetails,
}: SetUserImageUploadStatusProps) => {
  if (!Object.values(imageUploadApiStatuses).includes(status)) {
    return handleFetchError(new Error(imageUploadStatusInvalid), userImageProcessingFailed);
  }

  if (status === imageUploadApiStatuses.processing && timeoutCount < maxTimeoutCount) {
    try {
      return callback();
    } catch (error) {
      handleFetchError(error, userImageProcessingFailed);
    }
  }

  if (status === imageUploadApiStatuses.failed) {
    try {
      return setShouldCheckUserImageUploadStatusOff();
    } catch (error) {
      handleFetchError(error, userImageProcessingFailed);
    }
  }

  if (status === imageUploadApiStatuses.uploaded) {
    toast.success(userImageUpdateSuccess);
    try {
      setShouldCheckUserImageUploadStatusOff();
      return revalidateUserDetails();
    } catch (error) {
      handleFetchError(error, errorWhileFetchingUserDetails);
    }
  }

  return handleFetchError(new Error(userImageProcessingFailed));
}
