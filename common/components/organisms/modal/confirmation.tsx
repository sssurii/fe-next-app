import {
  Loader, Modal,
} from "@/common/components/molecules";
import { ConfirmationModalProps } from "@/common/components/organisms/modal/types";
import {
  Button, Typography,
} from "@/common/components/atoms";
import lang from "@/common/lang";

const { confirmationModal: {
  cancel, confirm,
} } = lang;

export const ConfirmationModal = ({
  isOpen, title, description, onConfirm, onCancel, cancelBtnText =  cancel, confirmBtnText = confirm, isLoading,
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      {isLoading && <Loader width="w-full" height="h-full" />}
      <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <Typography variant="h6" classes="text-text-primary text-base">
          {title}
        </Typography>
        <div className="mt-2">
          <Typography variant="p" classes="text-text-secondary text-sm">
            {description}
          </Typography>
        </div>
      </div>
      <div className="w-full mt-6 flex justify-end">
        <div className="mr-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onCancel}
            data-cy="cancel-button"
          >
            {cancelBtnText}
          </Button>
        </div>
        <Button
          type="button"
          variant="solid"
          size="sm"
          onClick={onConfirm}
          data-cy="confirm-button"
        >
          {confirmBtnText}
        </Button>
      </div>
    </Modal>
  )
}
