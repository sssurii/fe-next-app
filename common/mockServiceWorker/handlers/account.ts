import {
  http, HttpResponse,
} from "msw";
import { testApiMatcher } from "@/common/mockServiceWorker/handlers/apiMatcher";

export const accountHandlers = [
  http.post(`${testApiMatcher}/login`, () => {
    return HttpResponse.json({
      status: 200,
      data: {
        email: 'test@example.com',
        first_name: 'admin',
        last_name: 'test',
        token: 'some-token',
      },
      message: 'User logged in successfully.',
    });
  }),

  http.post(`${testApiMatcher}/register`, () => {
    return HttpResponse.json({
      status: 201,
      data: {
        id: 19,
      } ,
      message: 'success',
    });
  }),

  http.get(`${testApiMatcher}/profile`, () => {
    return HttpResponse.json({
      status: 200,
      data: {
        first_name: 'Obi Wan',
        last_name: 'Kenobi',
        email: 'kenobi@example.com',
      },
    });
  }),
  http.patch(`${testApiMatcher}/profile`, () => {
    return HttpResponse.json({
      status: 200,
      data: {
        first_name: 'Anakin',
        last_name: 'Skywalker',
        email: 'anakin@example.com',
      },
      message: 'Profile updated successfully.',
    });
  }),
]
