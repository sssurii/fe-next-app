import useSWR from 'swr';
import { notificationsUrl } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import {
  RequestResponseForNotifications, NotificationStatusTypes,
} from "@/app/(protected)/settings/notifications/types";

export const useGetNotifications = (status: NotificationStatusTypes) => {
  const result = useSWR<RequestResponseForNotifications>(
    `${notificationsUrl}?status=${status}`,
    fetcher,
    { revalidateOnFocus: false },
  );

  const {
    isValidating: notificationsLoader, error,
  } = result;

  return {
    notificationsList: result?.data?.data || [],
    notificationsLoader,
    error,
  }
}
