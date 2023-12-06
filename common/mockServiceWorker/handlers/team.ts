import {
  http, HttpResponse,
} from "msw";
import { testApiMatcher } from "@/common/mockServiceWorker/handlers/apiMatcher";

export const teamHandlers = [
  http.get(`${testApiMatcher}/users`, () => {
    return HttpResponse.json({
      data: [{
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'doe@example.com',
        email_verified_at: '2021-07-01T12:00:00.000000Z',
      }, {
        id: 2,
        first_name: 'Erica',
        last_name: 'Glamour',
        email: 'glamour@example.com',
        email_verified_at: '2021-07-01T12:00:00.000000Z',
      }],
    });
  }),
]
