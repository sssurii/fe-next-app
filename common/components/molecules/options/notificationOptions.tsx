import {
  NotificationOption, NotificationsProps,
} from "@/common/components/organisms/flyoutMenu/types";
import BasicTile from "@/common/components/molecules/tile/basicTile";
export const NotificationOptions = ({
  options, callback, actionButtonCallbacks, actionButtonTexts,
}: NotificationsProps) => {
  return (
    <>
      {options.map((notification: NotificationOption) => (
        <div
          key={notification.id}
          className="group relative flex gap-x-3 p-4 hover:bg-gray-50 cursor-pointer"
          data-cy="trigger-list-option"
        >
          <BasicTile
            data={notification.data}
            showIndicator={!notification.read_at}
            onIndicatorClick={() => callback(notification.id)}
            onActionButtonClick={actionButtonCallbacks[notification.type]}
            actionButtonText={actionButtonTexts[notification.type]}
          />
        </div>
      ))}
    </>
  )
}
