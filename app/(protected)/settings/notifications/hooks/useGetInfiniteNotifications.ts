import {
  useRef, useCallback,
} from "react";
import { useSearchParams } from 'next/navigation'
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { notificationsUrl } from "@/common/utils/network/endpoints";
import { getLastIntersectedListElementRef } from "@/common/utils/helpers";
import { RequestResponseForNotifications } from "@/app/(protected)/settings/notifications/types";

const sizeStep = 1;
const PAGE_SIZE = 10;

export const getNotificationsUrl = (pageIndex: number, filter: string) => {
  const status = filter ? `&status=${filter}` : '';
  return `${notificationsUrl}?perPage=${PAGE_SIZE}&page=${pageIndex + 1}${status}`
}

export const useGetInfiniteNotifications = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || '';
  const observer = useRef<IntersectionObserver>();
  const result = useSWRInfinite<RequestResponseForNotifications>((index) => (
    getNotificationsUrl(index, filter)
  ), url => fetcher(
    url,
  ), { revalidateOnFocus: false });

  const {
    isLoading,
    isValidating: allNotificationsLoader,
    size,
    setSize,
    error,
    data,
    mutate: mutateNotificationsInfiniteList,
  } = result;
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - sizeStep] === "undefined");
  const isRefreshing = allNotificationsLoader && data && data.length === size;

  const lastElementRef = useCallback(
    (node: HTMLLIElement) => {
      getLastIntersectedListElementRef({
        node,
        observer,
        shouldStopIntersection: !data || isLoadingMore || isRefreshing,
        data,
        size,
        setSize,
        sizeStep,
      })
    }, [isLoadingMore, isRefreshing, data, size, setSize],
  );

  return {
    allNotifications: data || [],
    allNotificationsLoader,
    error,
    lastElementRef,
    mutateNotificationsInfiniteList,
  }
}
