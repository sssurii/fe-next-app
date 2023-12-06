import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import { useRouter } from "next/navigation";
import useSWRMutation from 'swr/mutation';
import { toast } from 'react-hot-toast';
import { notificationsUrl } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { httpRequestMethods } from "@/common/utils/network/constants";
import { NotificationItem } from "@/common/components/organisms/modal/types";
import { handleFetchError } from "@/common/utils/network/errorHandler";
import { lang } from "@/common/lang";
import {
  NotificationCallbacks, NotificationType, PatchRequestResponseForNotifications,
} from "@/app/(protected)/settings/notifications/types";
import { routes } from "@/common/routes";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";

const { notifications: {
  errorMarkingNotificationAsRead, notificationMarkedAsRead, errorMarkingAllNotificationsAsRead, allNotificationsMarkedAsRead, uploadPicture,
} } = lang;
const notificationInitialState = {
  title: '',
  message: '',
}

const updateNotificationStatusFetcher = async (key: string, { arg }: { arg: { id: string }}) => {
  return fetcher(key, {
    arg: {
      method: httpRequestMethods.PATCH,
      body: parseObjectPropertiesToSnakeCase({ id: arg.id }),
    },
  });
}

export const useNotifications = () => {
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(notificationInitialState);
  const router = useRouter();
  const { mutate } = useSWRConfig()
  const {
    trigger: triggerUpdateNotificationStatus, isMutating: isUpdatingNotificationStatus,
  } = useSWRMutation(notificationsUrl, updateNotificationStatusFetcher);
  const actionButtonCallbacks: NotificationCallbacks = {
    ProfileImageUploadNotification: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      router.push(routes.generalSettingsPath);
    },
  }
  const actionButtonTexts: NotificationType = {
    ProfileImageUploadNotification: uploadPicture,
  }

  const resetCurrentNotification = () => setCurrentNotification(notificationInitialState);
  const openNotificationModal = (data: NotificationItem) => {
    setCurrentNotification(data);
    setNotificationModalOpen(true);
  }
  const closeNotificationModal = () => {
    resetCurrentNotification();
    setNotificationModalOpen(false);
  }

  const onUpdateNotificationsStatus = async (id: string, mutateNotificationsInfiniteList: () => void) => {
    try {
      const result: PatchRequestResponseForNotifications = await triggerUpdateNotificationStatus({
        id,
      })
      const successMsg = id ? notificationMarkedAsRead : allNotificationsMarkedAsRead;
      toast.success(result?.message || successMsg);
      try {
        await mutate(`${notificationsUrl}?status=unread`);
      } catch (error) {
        handleFetchError(error, 'Error updating SWR cache');
      }
      mutateNotificationsInfiniteList();
    } catch (error) {
      const errorMessage = id ? errorMarkingNotificationAsRead : errorMarkingAllNotificationsAsRead;
      handleFetchError(error, errorMessage);
    }
  }

  return {
    isUpdatingNotificationStatus,
    onUpdateNotificationsStatus,
    isNotificationModalOpen,
    openNotificationModal,
    closeNotificationModal,
    currentNotification,
    actionButtonCallbacks,
    actionButtonTexts,
  }
}
