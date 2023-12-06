'use client';
import { Typography } from "@/common/components/atoms";
import {
  useNotifications, useGetInfiniteNotifications,
} from "@/app/(protected)/settings/notifications/hooks";
import { Loader } from "@/common/components/molecules";
import NotificationTile from "@/common/components/molecules/tile/notificationTile";
import { NotificationItem } from "@/app/(protected)/settings/notifications/types";
import { NotificationModal } from "@/common/components/organisms/modal";
import { Filters } from "@/app/(protected)/settings/notifications/filters";
import { SettingsHeader } from "@/common/components/molecules/headers";
import lang from "@/common/lang";

const { notifications } = lang;

const Notifications = () => {
  const {
    onUpdateNotificationsStatus, isUpdatingNotificationStatus, currentNotification,
    isNotificationModalOpen, closeNotificationModal, openNotificationModal, actionButtonCallbacks,
    actionButtonTexts,
  } = useNotifications();
  const {
    allNotifications, allNotificationsLoader, lastElementRef, mutateNotificationsInfiniteList,
  } = useGetInfiniteNotifications();

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-4 sm:gap-y-10 md:grid-cols-3">
      {(allNotificationsLoader || isUpdatingNotificationStatus) && <Loader />}
      <SettingsHeader headerText={notifications.header} descriptionText={notifications.description} />
      <div className="rounded-xl shadow-sm border border-gray-200 col-span-2 px-2 py-4">
        <div className="flex gap-x-2 px-2 mb-4">
          <Filters />
        </div>
        {allNotifications.length === 0 || allNotifications[0].data.length === 0 ? (
          <Typography variant="p" classes="text-text-secondary px-5 text-sm">
            {notifications.emptyNotifications}
          </Typography>
        ) : (
          <ul role="list" className="flex flex-col max-h-[648px] px-2 scroll-smooth overflow-auto gap-y-4">
            {allNotifications.map((notification, idx: number) => {
              const isLastElement = allNotifications.length === idx + 1;
              return notification.data.map(({
                id, data, read_at, type,
              }: NotificationItem) => (
                <li key={id} ref={isLastElement ? lastElementRef : null}>
                  <NotificationTile
                    id={id}
                    data={data}
                    read_at={read_at}
                    onIndicatorClick={async (event) => {
                      event.stopPropagation();
                      await onUpdateNotificationsStatus(id, mutateNotificationsInfiniteList);
                    }}
                    actionButtonText={actionButtonTexts[type]}
                    onActionButtonClick={actionButtonCallbacks[type]}
                    onTileClickCallback={() => openNotificationModal({
                      title: data.title,
                      message: data.message,
                    })}
                  />
                </li>
              ))
            })}
          </ul>
        )}
      </div>
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={closeNotificationModal}
        data={currentNotification}
      />
    </div>
  )
}

export default Notifications;
