import {
  http, HttpResponse, RequestHandler,
} from "msw";
import { RequestHandlerDefaultInfo } from "msw/lib/core/handlers/RequestHandler";
import { testApiMatcher } from "@/common/mockServiceWorker/handlers/apiMatcher";
import { httpRequestMethods } from "@/common/utils/network/constants";

const baseFetcherMockApi = '/baseFetcher';
const {
  POST, GET, PUT,
} = httpRequestMethods;

export const typesOfRequests = [
  { method: POST },
  { method: GET },
  { method: PUT },
];

export const definitionOfSuccessRequests = [
  {
    code: 201,
  },
  {
    code: 200,
    body: { test: 'test' },
  },
  {
    code: 302,
    body: { test: 'test' },
  },
];

export const definitionOfFailureRequests = [
  {
    code: 404,
    body: { error: { message: 'Not Found' } },
  },
  {
    code: 500,
    body: { error: { message: 'Internal Server Error' } },
  },
];

export const baseFetcherHandlers: Array<RequestHandler<RequestHandlerDefaultInfo>> = typesOfRequests.map(({ method }) => {
  return [...definitionOfSuccessRequests, ...definitionOfFailureRequests].map(({
    code, body,
  }) => {
    const isText = typeof body === 'string';
    const url = isText ? `${testApiMatcher}${baseFetcherMockApi}/${code}Text` : `${testApiMatcher}${baseFetcherMockApi}/${code}`;

    switch (method) {
    case POST:
      return http.post(url, () => {
        if (isText) {
          return HttpResponse.text(body)
        }

        return HttpResponse.json({
          status: code,
          data: body,
        })
      });
    case GET:
      return http.get(url, () => {
        if (isText) {
          return HttpResponse.text(body)
        }

        return HttpResponse.json({
          status: code,
          data: body,
        })
      });
    case PUT:
      return http.put(url, () => {
        if (isText) {
          return HttpResponse.text(body)
        }

        return HttpResponse.json({
          status: code,
          data: body,
        })
      });
    }
  });
}).flat() as Array<RequestHandler<RequestHandlerDefaultInfo>>;

export const networkErrorBaseFetcherHandlers: Array<RequestHandler<RequestHandlerDefaultInfo>> = typesOfRequests.map(({ method }) => {
  switch (method) {
  case POST:
    return http.post(`${testApiMatcher}${baseFetcherMockApi}/networkError`, () => {
      return HttpResponse.error();
    });
  case GET:
    return http.get(`${testApiMatcher}${baseFetcherMockApi}/networkError`, () => {
      return HttpResponse.error();
    });
  case PUT:
    return http.put(`${testApiMatcher}${baseFetcherMockApi}/networkError`, () => {
      return HttpResponse.error();
    });
  }
}).flat() as Array<RequestHandler<RequestHandlerDefaultInfo>>;
