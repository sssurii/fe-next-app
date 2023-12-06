import {
  useState, ChangeEvent, useCallback,
} from "react";
import { toast } from "react-hot-toast";
import { ControllerRenderProps } from "react-hook-form";
import { validateImageFile } from "@/common/utils/helpers";
import { initialScale } from "@/app/(protected)/settings/helpers/constants";
import lang from "@/common/lang";
import { UserImageDTO } from "@/app/(protected)/settings/general/profileImage/types";

const { settings: {
  general: { userImageCroppingError },
} } = lang;

export const useUserImageData = () => {
  const [scale, setScale] = useState(initialScale);
  const [isImageLoading, setImageLoading] = useState(false);
  const [isCropperOpen, setCropperOpen] = useState(false);
  const [image, setImage] = useState<File | string>('');
  const [croppedImage, setCroppedImage] = useState('');
  const onScaleChange = (event: ChangeEvent<HTMLInputElement>) => setScale(parseFloat(event.target.value));
  const resetScale = () => setScale(initialScale);
  const showImageLoader = () => setImageLoading(true);
  const hideImageLoader = () => setImageLoading(false);

  const openImageCropper = useCallback(async (file: File) => {
    const isImageValid = await validateImageFile(file);

    if (!isImageValid) {
      return;
    }

    setImage(file);
    setCropperOpen(true);
    showImageLoader();
  }, []);

  const resetCropperState = () => {
    setImage('');
    setCropperOpen(false);
    resetScale();
  }
  const closeImageCropper = () => resetCropperState();
  const saveCroppedImage = async (file: HTMLCanvasElement) => {
    try {
      const imageDataUrl = file.toDataURL()
      setCroppedImage(imageDataUrl);
      closeImageCropper();
    } catch (error) {
      toast.error(userImageCroppingError);
    }
  }

  const handleFileChange = useCallback(async (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<UserImageDTO, 'croppedImage'>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      field.onChange(file);
      await openImageCropper(file);
    }
  }, [openImageCropper]);

  return {
    onScaleChange,
    scale,
    isImageLoading,
    showImageLoader,
    hideImageLoader,
    isCropperOpen,
    resetCropperState,
    openImageCropper,
    closeImageCropper,
    image,
    saveCroppedImage,
    setCroppedImage,
    croppedImage,
    handleFileChange,
  }
}
