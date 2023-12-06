export const mobileWidthLimit = 667;
export const tabletWidthLimit = 768;
export const emailRegex = /^(?!.*\.{2})([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const acceptedAvatarImageFileTypes = '.png,.jpg';
export const mbInBytesBinary = 1024000;
export const maxImageSizeInMb = 10;
export const maxImageSizeInBytes = maxImageSizeInMb * mbInBytesBinary;
export const acceptedImageMimeTypes = ['image/jpeg', 'image/png'];
export const allowedBase64ImageFileSignatures = {
  png: 'iVBORw0KGgo',
  jpeg: '/9j/',
  jpg: '/9j/',
}
export const columnOrderTypes = {
  asc: 'asc',
  desc: 'desc',
}
export const dateFormats = {
  default: 'DD MMM YYYY',
  iso: 'YYYY-MM-DD',
  monthYearShort: 'MM/YY',
}
export const authToken = 'authToken';
