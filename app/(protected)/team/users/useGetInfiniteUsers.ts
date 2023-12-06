import {
  useCallback, useRef, useState, useMemo, ChangeEvent,
} from "react";
import dayjs from "dayjs";
import useSWRInfinite from "swr/infinite";
import { RequestResponseForUsers } from "@/app/(protected)/team/users/types";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { usersUrl } from "@/common/utils/network/endpoints";
import { getLastIntersectedListElementRef } from "@/common/utils/helpers";
import { useDebounce } from "@/common/hooks";
import { dateFormats } from "@/common/constants";
import lang from "@/common/lang";

const { team } = lang;

const sizeStep = 1;
const PAGE_SIZE = 20;
const debounceTimeInMs = 1500;

export const getUsersUrl = (pageIndex: number, search: string) => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : ``;
  return `${usersUrl}?perPage=${PAGE_SIZE}&page=${pageIndex + 1}${searchParam}`
}

export const useGetInfiniteUsers = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, debounceTimeInMs);
  const observer = useRef<IntersectionObserver>();
  const result = useSWRInfinite<RequestResponseForUsers>((index) => (
    getUsersUrl(index, debouncedSearchValue)
  ), url => fetcher(
    url,
  ), { revalidateOnFocus: false })

  const handleSearchValue = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);

  const {
    isLoading,
    isValidating: usersLoader,
    size,
    setSize,
    error,
    data,
    mutate: mutateUsersInfiniteList,
  } = result;

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - sizeStep] === "undefined");
  const isRefreshing = usersLoader && data && data.length === size;

  const lastElementRef = useCallback(
    (node: HTMLTableRowElement) => {
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

  const usersResponseConverted = useMemo(() => data?.flatMap(({ data }) =>
    data.map(user => ({
      ...user,
      name: `${user.first_name} ${user.last_name}`,
      email_verified_at: dayjs(user.email_verified_at).format(dateFormats.default),
    })),
  ), [data])

  const noResultsText = useMemo(() => {
    if (usersLoader || usersResponseConverted?.length) {
      return;
    }

    return debouncedSearchValue ? team.noMatchingResults : team.noResults;
  }, [debouncedSearchValue, usersLoader, usersResponseConverted?.length]);

  return {
    noResultsText,
    users: usersResponseConverted || [],
    usersLoader,
    error,
    lastElementRef,
    mutateUsersInfiniteList,
    searchValue,
    membersCount: data?.[0]?.meta?.total || 0,
    handleSearchValue,
  }
}
