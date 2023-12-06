import { MutableRefObject } from 'react';
import { handleFetchError } from "@/common/utils/network/errorHandler";
import {
  acceptedImageMimeTypes,
  allowedBase64ImageFileSignatures,
  maxImageSizeInBytes,
  maxImageSizeInMb,
} from "@/common/constants";
import lang from "@/common/lang";
import { toast } from "react-hot-toast";

const { settings: {
  general: {
    userImageUpdateError, errorWhileReadingFile, imageSizeError, imageTypeError,
  },
} } = lang;

type PrepareBlobFileProps = {
  image: string;
  errorCallback: () => void;
}

type TruncateStringProps = {
  string: string;
  length: number;
  postFix?: string;
}

type IntersectionObserverProps = {
  node: HTMLElement;
  observer: MutableRefObject<IntersectionObserver | undefined>;
  shouldStopIntersection: boolean | undefined;
  size: number;
  setSize: (size: number) => void;
  sizeStep: number;
  data: any;
}

const camelToSnakeCase = (propertyName: string) => propertyName
  .replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`,
  );

const snakeToCamelCase = (propertyName: string) => propertyName
  .toLowerCase()
  .replace(/([-_][a-z])/g, (group) => group
    .toUpperCase()
    .replace('-', '')
    .replace('_', ''));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseObjectPropertiesToSnakeCase = (object: any): any => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return [camelToSnakeCase(key), value];
      }
      const parsedNestedObject = parseObjectPropertiesToSnakeCase(value);
      return [camelToSnakeCase(key), parsedNestedObject];
    }),
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseObjectPropertiesToCamelCase = (object: any): any => {
  if (!object) {
    return;
  }
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return [snakeToCamelCase(key), value];
      }
      const parsedNestedObject = parseObjectPropertiesToCamelCase(value);
      return [snakeToCamelCase(key), parsedNestedObject];
    }),
  );
};

export const prepareFontFamilyNames = (fontDetails: object) => {
  const fonts = Object.values(fontDetails);
  return fonts.map((font) => font.value.replace(/ /g, '_'));
}

export const getClassNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const prepareBlobFile = async ({
  image,
  errorCallback,
}: PrepareBlobFileProps) => {
  try {
    const blob = await fetch(image).then((res) => res.blob())
    return new File([blob], "avatar.jpeg");
  } catch (error) {
    handleFetchError(error, userImageUpdateError);
    errorCallback();
  }
}

export const truncateString = ({
  string = '', length = 0, postFix = '...',
}: TruncateStringProps) => {
  return `${string.substring(0, length)}${string.length > length ? postFix : ''}`;
}

export const getLastIntersectedListElementRef = ({
  node, shouldStopIntersection, observer, size, setSize, sizeStep, data,
}: IntersectionObserverProps) => {
  if (shouldStopIntersection) {
    return;
  }
  if (observer.current) {
    observer.current.disconnect();
  }
  observer.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && data[0].meta?.last_page > size) {
      setSize(size + sizeStep)
    }
  });
  if (node) {
    observer.current.observe(node);
  }
  return observer;
}

export const fileReader = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        resolve(event.target.result as string);
      } else {
        const error = new Error(errorWhileReadingFile);
        handleFetchError(error, errorWhileReadingFile);
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export const checkAllowedSignaturesForImage = (fileReaderResult: string) => {
  const signatures = Object.values(allowedBase64ImageFileSignatures);
  const getMatchingSignature = signatures.find((signature) => fileReaderResult.includes(signature));
  return !!getMatchingSignature;
}

export const validateImageFile = async (file: File) => {
  if (!acceptedImageMimeTypes.includes(file.type)) {
    toast.error(imageTypeError);
    return false;
  }

  if (file.size > maxImageSizeInBytes) {
    toast.error(`${imageSizeError} ${maxImageSizeInMb}MB`);
    return false;
  }

  try {
    const readerResult = await fileReader(file);
    const hasMatchingSignature = checkAllowedSignaturesForImage(readerResult);

    if (!hasMatchingSignature) {
      toast.error(imageTypeError);
      return false;
    }
  } catch (error) {
    toast.error(imageTypeError);
    return false;
  }

  return true;
}
export const setLocalStorageItem = (key: string, value: string) => localStorage.setItem(key, value);
export const getLocalStorageItem = (key: string) => localStorage.getItem(key);
export const removeLocalStorageItem = (key: string) => localStorage.removeItem(key);
