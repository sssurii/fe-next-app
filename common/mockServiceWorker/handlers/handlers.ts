import { accountHandlers } from "@/common/mockServiceWorker/handlers/account";
import { teamHandlers } from "@/common/mockServiceWorker/handlers/team";
import {
  baseFetcherHandlers, networkErrorBaseFetcherHandlers,
} from "@/common/mockServiceWorker/handlers/baseFetcher";
import { RequestHandler } from "msw";
import { RequestHandlerDefaultInfo } from "msw/lib/core/handlers/RequestHandler";

export const handlers: Array<RequestHandler<RequestHandlerDefaultInfo>> = [
  ...accountHandlers,
  ...teamHandlers,
  ...baseFetcherHandlers,
  ...networkErrorBaseFetcherHandlers,
];
