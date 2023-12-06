import { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import {
  Modal, Slider, Loader,
} from "@/common/components/molecules";
import { ImageCropperModalProps } from "@/common/components/organisms/modal/types";
import {
  Button, Typography,
} from "@/common/components/atoms";
import lang from "@/common/lang";

const { cropperModal: {
  save, cancel, crop, zoom,
} } = lang;

const cropperConfig = {
  width: 280,
  height: 280,
  border: 0,
  color: [255, 0, 0, 0],
  style: {
    borderRadius: '8px',
  },
}
const scaleMin = 1;
const scaleMax = 3;
const scaleStep = 0.1;

export const ImageCropperModal = ({
  isOpen, onClose, image, saveCroppedImage, scale, onScaleChange, isLoading, hideImageLoader,
}: ImageCropperModalProps) => {
  const cropper = useRef<AvatarEditor | null>(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading && <Loader width="w-full" height="h-full" />}
      <AvatarEditor
        ref={cropper}
        image={image}
        scale={scale}
        onImageReady={hideImageLoader}
        onLoadFailure={hideImageLoader}
        {...cropperConfig}
      />
      <Typography variant="p" classes="text-text-primary font-semibold my-4 text-base">
        {crop}
      </Typography>
      <Typography variant="p" classes="w-full text-text-primary text-left mb-3 text-sm">
        {zoom}
      </Typography>
      <Slider value={scale} onChange={onScaleChange} min={scaleMin} max={scaleMax} step={scaleStep} />
      <div className="w-full mt-5 flex justify-between">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          width="w-[48%]"
          onClick={onClose}
          data-cy="cancel-image-cropper-button"
        >
          {cancel}
        </Button>
        <Button
          type="button"
          variant="solid"
          size="sm"
          width="w-[48%]"
          onClick={() => {
            if (cropper.current) {
              saveCroppedImage(cropper.current.getImage())
            }
          }}
          data-cy="crop-image-button"
        >
          {save}
        </Button>
      </div>
    </Modal>
  )
}
