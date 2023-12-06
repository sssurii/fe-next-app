import { Button } from "@/common/components/atoms";
import { ActionButtonsProps } from "@/app/(protected)/settings/general/profileImage/types";
import lang from "@/common/lang";
const { settings: { general } } = lang;

export const ActionButtons = ({
  openDeleteConfirmationModal,
  imageUploadDisabled,
  croppedImage,
  userImage,
  shouldCheckUserImageUploadStatus,
}: ActionButtonsProps) => {
  return (
    <div className="flex border-t border-gray-200 px-8 py-4">
      {userImage && (
        <div className="mr-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={openDeleteConfirmationModal}
            data-cy="delete-user-image"
            disabled={imageUploadDisabled}
          >
            {general.deleteImage}
          </Button>
        </div>
      )}
      <Button
        type="submit"
        variant="solid"
        size="sm"
        disabled={!croppedImage || imageUploadDisabled}
        data-cy="update-user-image"
      >
        {shouldCheckUserImageUploadStatus ? general.processing : general.update}
      </Button>
    </div>
  )
}
