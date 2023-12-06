import { useRef } from "react";
import Image from 'next/image'
import {
  useForm, Controller,
} from 'react-hook-form';
import lang from "@/common/lang";
import {
  ImageCropperModal, ConfirmationModal,
} from "@/common/components/organisms/modal";
import { Loader } from "@/common/components/molecules";
import { SettingsHeader } from "@/common/components/molecules/headers";
import { ActionButtons } from "@/app/(protected)/settings/general/profileImage/actionButtons";
import {
  useUserImageUpload, useUserImageData, useUserImageDelete, useUserImageUploadStatus,
} from "@/app/(protected)/settings/general/profileImage/hooks";
import { useGetUserDetails } from "@/app/(protected)/settings/general/userInformation/hooks";
import UserAvatarPlaceholder from "@/assets/images/UserAvatarPlaceholder.png";
import { UserImageDTO } from "@/app/(protected)/settings/general/profileImage/types";
import { acceptedAvatarImageFileTypes } from "@/common/constants";

const {
  settings: { general }, removeProfileImageModal,
} = lang;
export const ProfileImage = () => {
  const {
    handleSubmit,
    control,
  } = useForm<UserImageDTO>({ mode: 'onChange' });
  const {
    isCropperOpen,
    closeImageCropper,
    croppedImage,
    image,
    saveCroppedImage,
    hideImageLoader,
    isImageLoading,
    scale,
    onScaleChange,
    handleFileChange,
    setCroppedImage,
  } = useUserImageData();
  const {
    setShouldCheckUserImageUploadStatusOn,
    setShouldCheckUserImageUploadStatusOff,
    shouldCheckUserImageUploadStatus,
  } = useUserImageUploadStatus();
  const {
    onUserImageUpload,
    isUpdatingUserImage,
  } = useUserImageUpload({
    setShouldCheckUserImageUploadStatusOn,
    setShouldCheckUserImageUploadStatusOff,
    croppedImage,
  });
  const {
    isDeletingUserImage,
    onUserImageDelete,
    isDeleteConfirmationOpen,
    openDeleteConfirmationModal,
    closeDeleteConfirmationModal,
  } = useUserImageDelete({ setCroppedImage });
  const { userDetails } = useGetUserDetails();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentImage = croppedImage || userDetails?.image;
  const imageUploadDisabled = isUpdatingUserImage || shouldCheckUserImageUploadStatus;
  const uploadImageCursor = imageUploadDisabled ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <>
      {isUpdatingUserImage && <Loader />}
      <ConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onCancel={closeDeleteConfirmationModal}
        onConfirm={onUserImageDelete}
        title={removeProfileImageModal.title}
        description={removeProfileImageModal.description}
        isLoading={isDeletingUserImage}
      />
      <ImageCropperModal
        isOpen={isCropperOpen}
        onClose={closeImageCropper}
        image={image}
        saveCroppedImage={saveCroppedImage}
        scale={scale}
        onScaleChange={onScaleChange}
        isLoading={isImageLoading}
        hideImageLoader={hideImageLoader}
      />
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-4 sm:gap-y-10 md:grid-cols-3">
        <SettingsHeader headerText={general.profileImage} descriptionText={general.profileImageDescription} />
        <div className="rounded-xl shadow-sm border border-gray-200 col-span-2">
          <form onSubmit={handleSubmit(onUserImageUpload)}>
            <div className="p-8">
              <Image
                src={currentImage || UserAvatarPlaceholder}
                width={80}
                height={80}
                alt={general.userAvatar}
                onClick={() => fileInputRef.current?.click()}
                className={`${uploadImageCursor} rounded-full`}
                priority={true}
                data-cy="upload-user-image-button"
              />
              <Controller
                name="croppedImage"
                control={control}
                render={({ field }) => {
                  return (
                    <input
                      {...field}
                      id="croppedImage"
                      type="file"
                      className="hidden"
                      value=""
                      onChange={(event) => handleFileChange(event, field)}
                      ref={fileInputRef}
                      accept={acceptedAvatarImageFileTypes}
                      disabled={shouldCheckUserImageUploadStatus}
                      data-cy="upload-user-image-input"
                    />
                  )
                }}
              />
            </div>
            <ActionButtons
              userImage={userDetails?.image}
              openDeleteConfirmationModal={openDeleteConfirmationModal}
              croppedImage={croppedImage}
              imageUploadDisabled={imageUploadDisabled}
              shouldCheckUserImageUploadStatus={shouldCheckUserImageUploadStatus}
            />
          </form>
        </div>
      </div>
    </>
  )
}
