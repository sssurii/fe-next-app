import {
  getSession, signOut,
} from 'next-auth/react';
import {
  FetcherError, handleResponseError, handleResponse,
} from "@/common/utils/network/responseHandler";
import {
  httpRequestMethods, httpResponseStatuses,
} from "@/common/utils/network/constants";
import {
  setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem,
} from "@/common/utils/helpers";
import { authToken } from "@/common/constants";
import lang from "@/common/lang";

const baseHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}
const { responseErrorMessages } = lang;
const { POST } = httpRequestMethods;
const {
  UNAUTHORIZED, BAD_REQUEST,
} = httpResponseStatuses;

export const isFetcherError = (error: any): error is FetcherError => {
  return error?.cause?.url !== undefined;
}

export const handleFetcherError = (error: FetcherError) => {
  if (isFetcherError(error)) {
    throw error;
  }
  throw new Error(responseErrorMessages.fetchError, { cause: error });
}

const getTokenFromSession = async () => {
  const token = getLocalStorageItem(authToken);
  if (token) {
    return token;
  }
  const session = await getSession();
  const sessionToken = session?.token || '';
  setLocalStorageItem(authToken, sessionToken);
  return sessionToken;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetcher<JSON = any> (
  key: string,
  options?: Readonly<{ arg: RequestInit }>,
): Promise<JSON> {
  try {
    const token = await getTokenFromSession();
    const authHeader = { Authorization: `Bearer ${token}` };
    const requestHeaders = {
      ...baseHeaders,
      ...authHeader,
      ...options?.arg.headers,
    };

    const response = await fetch(key, {
      ...options?.arg,
      ...(options?.arg?.body ? { body: JSON.stringify(options.arg.body) } : {}),
      headers: requestHeaders,
    });

    if (response.status === UNAUTHORIZED) {
      await signOut({ redirect: false });
      removeLocalStorageItem(authToken);
    }

    if (response.status >= BAD_REQUEST) {
      await handleResponseError(response);
    }

    const responseJson = await response.json();
    return {
      ...responseJson,
      code: response.status,
    };
  } catch (error: any) {
    return handleFetcherError(error)
  }
}

export const postImageFetcher = async (
  key: string,
  options: Readonly<{ arg: RequestInit }>,
): Promise<{ code: number; response: Response }> => {
  try {
    const token = await getTokenFromSession();
    const authHeader = { Authorization: `Bearer ${token}` };

    const response = await fetch(key, {
      method: POST,
      body: options.arg.body,
      headers: {
        ...options?.arg.headers,
        ...authHeader,
        'Accept': 'application/json',
      },
    })

    if (response.status === UNAUTHORIZED) {
      await signOut({ redirect: false });
      removeLocalStorageItem(authToken);
    }

    return await handleResponse(response);
  } catch (error: any) {
    return handleFetcherError(error)
  }
}
