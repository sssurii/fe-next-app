export type UserImageUploadStatusRequestResponse = {
  data: {
    status: 'uploading' | 'success' | 'error';
  }
  message: string;
}

export type UserImageDTO = {
  croppedImage: string;
}

export type UserImageDeleteRequestResponse = {
  data: [];
  message: string;
}

export type ActionButtonsProps = {
  userImage?: string;
  croppedImage: string;
  shouldCheckUserImageUploadStatus: boolean;
  imageUploadDisabled: boolean;
  openDeleteConfirmationModal: () => void;
}

export type UseUserImageUploadStatusProps = {
  setShouldCheckUserImageUploadStatusOn: () => void;
  setShouldCheckUserImageUploadStatusOff: () => void;
  croppedImage: string;
}

export type UseUserImageDeleteProps = {
  setCroppedImage: (data: string) => void;
}
