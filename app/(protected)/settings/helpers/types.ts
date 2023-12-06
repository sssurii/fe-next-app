export type SetUserImageUploadStatusProps = {
  status: 'uploading' | 'success' | 'error';
  timeoutCount: number;
  callback: () => void;
  revalidateUserDetails: () => void;
  setShouldCheckUserImageUploadStatusOff: () => void;
}
