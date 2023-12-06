import { Modal } from "@/common/components/molecules";
import { NotificationModalProps } from "@/common/components/organisms/modal/types";
import { Typography } from "@/common/components/atoms";
import { UserInitials } from "@/common/components/atoms/userInitials";

export const NotificationModal = ({
  isOpen, onClose, data,
}: NotificationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm:max-w-[468px]">
      <div className="w-full text-center sm:text-left">
        <div className="flex justify-between pb-3 mb-3 border-b border-gray-200">
          <Typography variant="h4" classes="pr-3 text-text-primary font-semibold text-2xl">
            {data.title}
          </Typography>
          <div>
            <UserInitials initials="TK" />
          </div>
        </div>
        <div className="mt-2">
          <Typography variant="p" classes="text-text-primary text-sm">
            {data.message}
          </Typography>
        </div>
      </div>
    </Modal>
  )
}
