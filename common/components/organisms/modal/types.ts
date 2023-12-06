import { ChangeEvent } from "react";

export type ImageCropperModalProps = {
  isOpen: boolean;
  onClose: () => void;
  saveCroppedImage: (file: HTMLCanvasElement) => void;
  image: File | string;
  scale: number;
  onScaleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  hideImageLoader: () => void;
}

export type ConfirmationModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  cancelBtnText?: string;
  confirmBtnText?: string;
}

export type NotificationModalProps = {
  data: {
    title: string;
    message: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export type NotificationItem = {
  title: string,
  message: string,
};

